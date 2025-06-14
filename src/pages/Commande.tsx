
import React from "react";
import Layout from "@/components/layout/Layout";
import OrderForm from "@/components/order/OrderForm";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { ShoppingBag, Clock, MapPin } from "lucide-react";

const Commande = () => {
  return (
    <Layout>
      <div className="pt-16 pb-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="container-custom">
          {/* En-tête avec design amélioré */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6">
              <ShoppingBag className="text-white" size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-playfair mb-6 text-gray-800">Click & Collect</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Commandez en ligne et récupérez vos produits frais en boutique à l'heure qui vous convient ! 
              <br className="hidden md:block" />
              Commande à passer au minimum 24h à l'avance.
            </p>
            
            {/* Avantages du Click & Collect */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-orange-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Gain de temps</h3>
                <p className="text-gray-600 text-sm">Évitez l'attente, votre commande vous attend</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="text-orange-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Produits garantis</h3>
                <p className="text-gray-600 text-sm">Vos produits préférés réservés pour vous</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-orange-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Retrait facile</h3>
                <p className="text-gray-600 text-sm">Récupération rapide en boutique</p>
              </div>
            </div>
          </div>
          
          <OrderForm />
        </div>
      </div>
      <ScrollToTop />
    </Layout>
  );
};

export default Commande;
