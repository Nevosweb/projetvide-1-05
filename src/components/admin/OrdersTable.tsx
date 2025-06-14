
import { useState } from "react";
import { Order, OrderStatus } from "@/types/order";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import OrderDetailsDrawer from "./OrderDetailsDrawer";
import { 
  formatDateTime, 
  formatTimeAgo, 
  isNewOrder, 
  formatPrice, 
  toNumber, 
  getRowClassName,
  getStatusClasses,
  prettyStatus
} from "./formatters";

interface OrdersTableProps {
  orders: Order[];
  loading: boolean;
  onUpdateStatus: (orderId: string, status: OrderStatus) => Promise<boolean>;
  onDeleteOrder: (orderId: string) => Promise<boolean>;
}

export default function OrdersTable({ 
  orders, 
  loading,
  onUpdateStatus,
  onDeleteOrder
}: OrdersTableProps) {
  const { toast } = useToast();
  const [deletingOrder, setDeletingOrder] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingStatus(orderId);
    try {
      const success = await onUpdateStatus(orderId, newStatus);
      if (success) {
        toast({
          title: "Statut mis à jour",
          description: "Le statut de la commande a bien été modifié.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de mettre à jour le statut de la commande.",
        });
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du statut.",
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDeleteClick = (orderId: string) => {
    setDeletingOrder(orderId);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!deletingOrder) return;
    
    try {
      const success = await onDeleteOrder(deletingOrder);
      if (success) {
        toast({
          title: "Commande supprimée",
          description: "La commande a été supprimée avec succès.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de supprimer la commande.",
        });
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression.",
      });
    } finally {
      setDeletingOrder(null);
      setOpenDeleteDialog(false);
    }
  };

  const cancelDelete = () => {
    setDeletingOrder(null);
    setOpenDeleteDialog(false);
  };

  const openDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Aucune commande trouvée</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom du client</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Retrait prévu</TableHead>
              <TableHead className="text-right">Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow 
                key={order.id as string} 
                className={getRowClassName(order.status as OrderStatus)}
              >
                <TableCell className="font-medium">
                  {order.customer_name}
                  {isNewOrder(order.created_at) && (
                    <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
                      Nouveau
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>
                  <div>{formatDateTime(order.pickup_time)}</div>
                  <div className="text-xs text-gray-500">
                    Commande {formatTimeAgo(order.created_at)}
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatPrice(toNumber(order.amount))}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusClasses(order.status as OrderStatus)}>
                    {prettyStatus(order.status as string)}
                  </Badge>
                  <Select 
                    defaultValue={order.status as string}
                    onValueChange={(value) => handleStatusChange(order.id as string, value as OrderStatus)}
                    disabled={updatingStatus === order.id}
                  >
                    <SelectTrigger 
                      className="w-[120px] mt-2"
                      aria-label="Changer le statut de la commande"
                    >
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="paid">Payé</SelectItem>
                      <SelectItem value="ready">Récupéré</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => openDetails(order)}
                      aria-label="Ouvrir les détails de la réservation"
                    >
                      Détails
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteClick(order.id as string)}
                      disabled={deletingOrder === order.id}
                      aria-label="Supprimer la commande"
                    >
                      {deletingOrder === order.id ? (
                        <span className="inline-block animate-spin mr-1">⟳</span>
                      ) : null}
                      Supprimer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer la réservation ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est définitive. La commande sera supprimée définitivement de la base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {selectedOrder && (
        <OrderDetailsDrawer 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </>
  );
}
