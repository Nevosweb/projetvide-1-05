import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Order, OrderStatus, OrderFilters } from "@/types/order";
import OrdersTable from "@/components/admin/OrdersTable";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminHeader from "@/components/admin/AdminHeader";
import { Toaster } from "@/components/ui/toaster";

export default function AdminReservations() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filters, setFilters] = useState<OrderFilters>({
    status: null,
    dateFilter: null,
    searchQuery: null
  });
  
  const navigate = useNavigate();

  // Check for active session on component mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      
      if (session) {
        // Subscribe to realtime updates when logged in
        subscribeToOrders();
        fetchOrders();
      }
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
      
      if (session) {
        fetchOrders();
      }
    });

    // Clean up subscription when component unmounts
    return () => subscription.unsubscribe();
  }, []);

  // Subscribe to realtime updates for orders
  const subscribeToOrders = () => {
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'orders' 
        }, 
        (payload) => {
          console.log('Realtime update:', payload);
          
          // Handle different types of database events
          if (payload.eventType === 'INSERT') {
            const newOrder = payload.new as Order;
            // Check if the order already exists in the list to avoid duplicates
            if (!orders.some(order => order.id === newOrder.id)) {
              setOrders(prev => [...prev, newOrder].sort((a, b) => 
                new Date(a.pickup_time).getTime() - new Date(b.pickup_time).getTime()
              ));
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedOrder = payload.new as Order;
            setOrders(prev => prev.map(order => 
              order.id === updatedOrder.id ? updatedOrder : order
            ));
          } else if (payload.eventType === 'DELETE') {
            const deletedOrder = payload.old as Order;
            setOrders(prev => prev.filter(order => order.id !== deletedOrder.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  // Fetch orders with applied filters
  const fetchOrders = async () => {
    setLoading(true);
    
    let query = supabase
      .from('orders')
      .select('*');
    
    // Apply status filter
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    // Apply date filter
    if (filters.dateFilter) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString();
      const nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7).toISOString();
      
      if (filters.dateFilter === 'today') {
        query = query.gte('pickup_time', today).lt('pickup_time', tomorrow);
      } else if (filters.dateFilter === 'tomorrow') {
        query = query.gte('pickup_time', tomorrow).lt('pickup_time', nextWeek);
      } else if (filters.dateFilter === 'week') {
        query = query.gte('pickup_time', today).lt('pickup_time', nextWeek);
      }
    }
    
    // Execute query and handle response
    try {
      const { data, error } = await query.order('pickup_time', { ascending: true });
      
      if (error) throw error;
      
      // Apply search filter on client side since it may span multiple fields
      let filteredOrders = data as Order[];
      if (filters.searchQuery) {
        const search = filters.searchQuery.toLowerCase();
        filteredOrders = filteredOrders.filter(
          order => 
            order.customer_name.toLowerCase().includes(search) || 
            order.phone.toLowerCase().includes(search)
        );
      }
      
      setOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);
        
      if (error) {
        console.error("Error updating order status:", error);
        return false;
      }
      
      // Update local state if realtime doesn't catch it
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      ));
      
      return true;
    } catch (error) {
      console.error("Error updating order status:", error);
      return false;
    }
  };

  // Delete an order
  const deleteOrder = async (orderId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);
        
      if (error) {
        console.error("Error deleting order:", error);
        return false;
      }
      
      // Update local state if realtime doesn't catch it
      setOrders(prev => prev.filter(order => order.id !== orderId));
      
      return true;
    } catch (error) {
      console.error("Error deleting order:", error);
      return false;
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<OrderFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  useEffect(() => {
    if (session) {
      fetchOrders();
    }
  }, [filters, session]);

  // If loading, show loading state
  if (loading && !session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, show login screen
  if (!session) {
    return <AdminLogin />;
  }

  // If authenticated, show dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <main className="container mx-auto py-6 px-4">
        <OrdersTable 
          orders={orders} 
          loading={loading} 
          onUpdateStatus={updateOrderStatus}
          onDeleteOrder={deleteOrder}
        />
      </main>
      
      <Toaster />
    </div>
  );
}
