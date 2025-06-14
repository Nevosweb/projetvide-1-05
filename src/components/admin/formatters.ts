
// Utility functions for formatting and calculations in admin components

import { format, formatDistance, isWithinInterval, subMinutes } from "date-fns";
import { fr } from "date-fns/locale";
import { OrderStatus } from "@/types/order";

// Convert any value to a safe number or return 0
export const toNumber = (v: any): number => {
  const n = Number(v);
  return isFinite(n) && !isNaN(n) ? n : 0;
};

// Get quantity from different possible field names
export const getQty = (item: any): number => 
  toNumber(item.qty ?? item.quantity ?? 1);

// Get unit price from different possible field names
export const getUnit = (item: any): number => 
  toNumber(item.price ?? item.unit_price ?? item.unitPrice ?? 0);

// Format a number as currency
export const formatPrice = (price: number): string => {
  return price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
};

// Get status badge classes based on order status
export const getStatusClasses = (status: OrderStatus): string => {
  switch (status) {
    case "pending":
      return "bg-destructive text-destructive-foreground capitalize";
    case "paid":
      return "bg-yellow-100 text-yellow-800 capitalize";
    case "ready":
      return "bg-green-100 text-green-800 capitalize";
    case "delivered":
      return "bg-secondary text-secondary-foreground capitalize";
    default:
      return "bg-outline text-foreground capitalize";
  }
};

// Format a date as "d MMMM à HH:mm"
export const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, "d MMMM à HH:mm", { locale: fr });
  } catch (error) {
    return "Date invalide";
  }
};

// Format a date as relative time
export const formatTimeAgo = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return formatDistance(date, new Date(), { 
      addSuffix: true,
      locale: fr 
    });
  } catch (error) {
    return "";
  }
};

// Check if order was created in the last 2 minutes
export const isNewOrder = (dateString: string): boolean => {
  try {
    const date = new Date(dateString);
    const twoMinutesAgo = subMinutes(new Date(), 2);
    return isWithinInterval(date, { 
      start: twoMinutesAgo, 
      end: new Date() 
    });
  } catch (error) {
    return false;
  }
};

// Get CSS class based on order status
export const getRowClassName = (status: OrderStatus): string => {
  switch (status) {
    case "pending":
      return "";
    case "paid":
      return "bg-yellow-50";
    case "ready":
      return "bg-green-50";
    case "delivered":
      return "bg-gray-50";
    default:
      return "";
  }
};

// Convert status code to display text
export const prettyStatus = (status: string): string => {
  switch (status) {
    case "pending": return "En attente";
    case "paid": return "Payé";
    case "ready": return "Récupéré";
    case "delivered": return "Récupéré";
    default: return status;
  }
};
