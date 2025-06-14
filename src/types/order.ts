
// Define types for the Orders system that work with the Supabase database

import { Database } from "@/integrations/supabase/types";

// Order status options
export type OrderStatus = 'pending' | 'paid' | 'ready' | 'delivered';

// Order type based on the Supabase database structure
export type Order = Database['public']['Tables']['orders']['Row'];

// Order insert type for creating new orders
export type OrderInsert = Database['public']['Tables']['orders']['Insert'];

// Order update type for updating existing orders
export type OrderUpdate = Database['public']['Tables']['orders']['Update'];

// Restaurant type based on the Supabase database structure
export type Restaurant = Database['public']['Tables']['restaurants']['Row'];

// Type for filtered orders search
export interface OrderFilters {
  status?: OrderStatus | null;
  dateFilter?: 'today' | 'tomorrow' | 'week' | null;
  searchQuery?: string | null;
}
