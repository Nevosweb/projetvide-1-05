
import { Order } from "@/types/order";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime, formatPrice, prettyStatus, toNumber, getQty, getUnit } from "./formatters";

interface OrderDetailsDrawerProps {
  order: Order | null;
  onClose: () => void;
}

// Define a type for item structure inside the JSON
interface OrderItem {
  id: string | number;
  name: string;
  qty?: number | string;
  quantity?: number | string;
  price?: number | string;
  unit_price?: number | string;
  unitPrice?: number | string;
  [key: string]: any; // Allow for other properties
}

/**
 * OrderDetailsDrawer - Displays detailed information about an order
 * 
 * Note: The items array in the order is expected to have the following structure:
 * {
 *   id: string | number,
 *   name: string,
 *   qty?: number | string,        // or quantity
 *   quantity?: number | string,
 *   price?: number | string,      // or unit_price / unitPrice
 *   unit_price?: number | string
 * }
 * 
 * If your schema uses different field names, adjust the getQty and getUnit 
 * functions in formatters.ts accordingly.
 */
export default function OrderDetailsDrawer({ order, onClose }: OrderDetailsDrawerProps) {
  if (!order) return null;

  // Safely convert the items JSON to typed array
  const items: OrderItem[] = Array.isArray(order.items) 
    ? order.items.map(item => {
        // Convert each item to the expected structure
        if (typeof item === 'object' && item !== null) {
          return item as OrderItem;
        }
        // If item is not an object, return a default structure
        return { id: 'unknown', name: String(item) };
      })
    : [];
  
  // Calculate total from items
  const totalCalc = items.reduce(
    (sum, item) => sum + getQty(item) * getUnit(item), 
    0
  );

  // Use order.amount or order.total if available, otherwise use calculated total
  const total = toNumber(order.amount ?? order.total ?? totalCalc);

  return (
    <Drawer open onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-w-[460px] mx-auto">
        <DrawerHeader>
          <DrawerTitle>
            Détails de la réservation – {order.customer_name} ({formatDateTime(order.pickup_time)})
          </DrawerTitle>
          <DrawerDescription>
            Informations sur la commande et le client
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4 py-2">
          <h3 className="font-semibold mb-2">Informations client</h3>
          <div className="space-y-1 text-sm mb-6">
            <p><strong>Client :</strong> {order.customer_name}</p>
            <p><strong>Téléphone :</strong> {order.phone}</p>
            <p><strong>Créneau de retrait :</strong> {formatDateTime(order.pickup_time)}</p>
            <p><strong>Statut actuel :</strong> {prettyStatus(order.status as string)}</p>
          </div>

          <h3 className="font-semibold mb-2">Contenu du panier</h3>
          {items.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead className="text-center">Qté</TableHead>
                  <TableHead className="text-right">Prix</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, idx) => {
                  const qty = getQty(item);
                  const unitPrice = getUnit(item);
                  const lineTotal = qty * unitPrice;
                  
                  return (
                    <TableRow key={String(item.id || `item-${idx}`)}>
                      <TableCell>{item.name || `Produit ${idx + 1}`}</TableCell>
                      <TableCell className="text-center">{qty}</TableCell>
                      <TableCell className="text-right">{formatPrice(lineTotal)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} className="font-semibold">Total</TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatPrice(total)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          ) : (
            <p className="text-sm text-gray-500">Aucune information sur les produits disponible</p>
          )}
        </div>
        
        <DrawerFooter className="flex-row space-x-2 justify-end">
          <Button 
            variant="outline" 
            onClick={() => window.print()}
          >
            Imprimer le ticket
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Fermer</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
