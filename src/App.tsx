
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Histoire from "./pages/Histoire";
import Produits from "./pages/Produits";
import Commande from "./pages/Commande";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminReservations from "./pages/AdminReservations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/notre-histoire" element={<Histoire />} />
          <Route path="/nos-produits" element={<Produits />} />
          <Route path="/click-and-collect" element={<Commande />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-reservations" element={<AdminReservations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
