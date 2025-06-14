
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderFilters, OrderStatus } from "@/types/order";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminHeaderProps {
  filters: OrderFilters;
  onFilterChange: (filters: Partial<OrderFilters>) => void;
}

export default function AdminHeader({ filters, onFilterChange }: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || "");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ searchQuery });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto py-4 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">Réservations Click & Collect</h1>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Rechercher par nom ou téléphone..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          {/* Status filter */}
          <Select
            value={filters.status || "all"}
            onValueChange={(value: string) => {
              const statusValue = value === "all" ? null : value as OrderStatus;
              onFilterChange({ status: statusValue });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="ready">Prêt</SelectItem>
              <SelectItem value="delivered">Récupéré</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Date filter */}
          <Select
            value={filters.dateFilter || "all"}
            onValueChange={(value: string) => {
              const dateFilterValue = value === "all" ? null : (value as "today" | "tomorrow" | "week");
              onFilterChange({ dateFilter: dateFilterValue });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les dates</SelectItem>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="tomorrow">Demain</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
