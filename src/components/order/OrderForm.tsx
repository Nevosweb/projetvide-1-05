
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingCart, Plus, Minus, Trash2, Calendar, Clock, CreditCard, User, Phone } from "lucide-react";

// Types et données pour le formulaire
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  isAvailable: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const productList: Product[] = [
  // Pains
  { id: 1, name: "Pain au levain 72h", category: "pain", price: 5.2, isAvailable: true },
  { id: 2, name: "Baguette tradition", category: "pain", price: 1.2, isAvailable: true },
  { id: 3, name: "Boule rustique", category: "pain", price: 4.8, isAvailable: true },
  { id: 4, name: "Pain aux céréales", category: "pain", price: 4.5, isAvailable: true },
  // Viennoiseries
  { id: 5, name: "Croissant pur beurre", category: "viennoiserie", price: 1.5, isAvailable: true },
  { id: 6, name: "Kouglof alsacien", category: "viennoiserie", price: 12.5, isAvailable: true },
  { id: 7, name: "Pain au chocolat", category: "viennoiserie", price: 1.6, isAvailable: true },
  // Pâtisseries
  { id: 8, name: "Éclair praliné", category: "patisserie", price: 4.5, isAvailable: true },
  { id: 9, name: "Tarte aux pommes", category: "patisserie", price: 4.2, isAvailable: true },
];

const timeSlots = [
  "10:00 - 10:30",
  "10:30 - 11:00",
  "11:00 - 11:30",
  "11:30 - 12:00",
  "16:00 - 16:30",
  "16:30 - 17:00",
  "17:00 - 17:30",
  "17:30 - 18:00",
];

// Identifiant du restaurant (mis à jour selon la demande)
const RESTAURANT_ID = "c3a9c71f-7b0a-4cf7-9d5c-9d43f2d2b383";

export default function OrderForm() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("pain");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Informations client
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Filtrer les produits par catégorie
  const filteredProducts = productList.filter(
    (p) => p.category === selectedCategory && p.isAvailable
  );

  // Ajouter un produit au panier
  const addToCart = () => {
    if (!selectedProduct) return;

    // Vérifier si le produit est déjà dans le panier
    const existingItemIndex = cart.findIndex(
      (item) => item.product.id === selectedProduct.id
    );

    if (existingItemIndex >= 0) {
      // Mettre à jour la quantité
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // Ajouter un nouveau produit
      setCart([...cart, { product: selectedProduct, quantity }]);
    }

    toast.success(`${selectedProduct.name} ajouté au panier`);
    setSelectedProduct(null);
    setQuantity(1);
  };

  // Supprimer un produit du panier
  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.product.id !== id));
  };

  // Calculer le total du panier
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Passer à l'étape suivante
  const nextStep = () => {
    if (step === 1 && cart.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }
    if (step === 2 && (!pickupDate || !pickupTime)) {
      toast.error("Veuillez choisir une date et un créneau horaire");
      return;
    }
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  // Retourner à l'étape précédente
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  // Convertir le panier en format JSON compatible avec Supabase
  const getCartItemsForApi = () => {
    return cart.map(item => ({
      product_id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity
    }));
  };

  // Soumettre la commande
  const submitOrder = async () => {
    // Validation des champs
    if (!customerName || !customerPhone) {
      toast.error("Veuillez indiquer vos coordonnées pour la commande");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Construire la date et l'heure de retrait
      const [startTime] = pickupTime.split(" - ");
      const [hours, minutes] = startTime.split(":");
      const pickupDateTime = new Date(pickupDate);
      pickupDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      // Format des données pour l'API
      const orderData = {
        restaurant_id: RESTAURANT_ID,
        customer_name: customerName,
        phone: customerPhone,
        pickup_slot: pickupDateTime.toISOString(),
        items: getCartItemsForApi(),
        total: cartTotal,
        status: "pending"
      };
      
      // Envoyer les données à Supabase via la fonction edge
      const response = await fetch(
        "https://sqfplzjkbetpzauiwleq.supabase.co/functions/v1/new-order", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi de la commande");
      }
      
      // Réinitialisation du formulaire
      toast.success("Votre commande a été enregistrée avec succès !");
      setCart([]);
      setPickupDate("");
      setPickupTime("");
      setPaymentMethod("card");
      setCustomerName("");
      setCustomerPhone("");
      setStep(1);
      window.scrollTo(0, 0);
      
    } catch (error) {
      console.error("Erreur lors de la soumission de la commande:", error);
      toast.error("Une erreur est survenue lors de l'enregistrement de votre commande. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Formatter une date pour l'affichage
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  // Obtenir la date minimale pour le sélecteur de date (lendemain)
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Étapes de progression améliorées */}
      <div className="mb-16">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                    step >= 1 ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <ShoppingCart size={20} />
                </div>
                <span className={`text-sm mt-2 font-medium ${
                  step >= 1 ? "text-orange-600" : "text-gray-500"
                }`}>Produits</span>
              </div>
              <div
                className={`h-1 w-16 sm:w-32 mx-4 transition-all duration-300 ${
                  step >= 2 ? "bg-gradient-to-r from-orange-500 to-orange-600" : "bg-gray-200"
                }`}
              ></div>
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                    step >= 2 ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <Calendar size={20} />
                </div>
                <span className={`text-sm mt-2 font-medium ${
                  step >= 2 ? "text-orange-600" : "text-gray-500"
                }`}>Retrait</span>
              </div>
              <div
                className={`h-1 w-16 sm:w-32 mx-4 transition-all duration-300 ${
                  step >= 3 ? "bg-gradient-to-r from-orange-500 to-orange-600" : "bg-gray-200"
                }`}
              ></div>
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                    step >= 3 ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <CreditCard size={20} />
                </div>
                <span className={`text-sm mt-2 font-medium ${
                  step >= 3 ? "text-orange-600" : "text-gray-500"
                }`}>Paiement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Étape 1: Sélection des produits */}
      {step === 1 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Sélecteur de catégorie et produit */}
            <div className="md:col-span-2">
              <Card className="border-orange-100 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-8">
                    <ShoppingCart className="text-orange-600 mr-3" size={28} />
                    <h2 className="text-3xl font-bold text-gray-800">Sélectionnez vos produits</h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6">
                    <div className="mb-6">
                      <Label htmlFor="category" className="text-gray-700 font-semibold">Catégorie</Label>
                      <Select
                        value={selectedCategory}
                        onValueChange={(value) => {
                          setSelectedCategory(value);
                          setSelectedProduct(null);
                        }}
                      >
                        <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pain">Pains</SelectItem>
                          <SelectItem value="viennoiserie">Viennoiseries</SelectItem>
                          <SelectItem value="patisserie">Pâtisseries</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="mb-6">
                      <Label htmlFor="product" className="text-gray-700 font-semibold">Produit</Label>
                      <Select
                        value={selectedProduct?.id.toString() || ""}
                        onValueChange={(value) => {
                          const product = productList.find(
                            (p) => p.id === parseInt(value)
                          );
                          setSelectedProduct(product || null);
                        }}
                        disabled={filteredProducts.length === 0}
                      >
                        <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                          <SelectValue placeholder="Sélectionner un produit" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredProducts.map((product) => (
                            <SelectItem
                              key={product.id}
                              value={product.id.toString()}
                            >
                              <div className="flex justify-between items-center w-full">
                                <span>{product.name}</span>
                                <span className="font-semibold text-orange-600">{product.price.toFixed(2).replace(".", ",")} €</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="mb-6">
                      <Label htmlFor="quantity" className="text-gray-700 font-semibold">Quantité</Label>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={!selectedProduct || quantity <= 1}
                          className="border-orange-200 text-orange-600 hover:bg-orange-50"
                        >
                          <Minus size={16} />
                        </Button>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                          className="mx-2 w-20 text-center border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                          disabled={!selectedProduct}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setQuantity(quantity + 1)}
                          disabled={!selectedProduct}
                          className="border-orange-200 text-orange-600 hover:bg-orange-50"
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        type="button"
                        onClick={addToCart}
                        disabled={!selectedProduct}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        <Plus className="mr-2" size={20} />
                        Ajouter au panier
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Panier amélioré */}
            <div className="md:col-span-1">
              <Card className="border-orange-100 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <ShoppingCart className="text-orange-600 mr-3" size={24} />
                    <h3 className="text-2xl font-bold text-gray-800">Votre panier</h3>
                    {cart.length > 0 && (
                      <span className="ml-auto bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {cart.length} article{cart.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="mx-auto text-gray-300 mb-4" size={48} />
                      <p className="text-gray-500">Votre panier est vide</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 mb-6">
                        {cart.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200"
                          >
                            <div className="flex items-center">
                              <div className="bg-white rounded-lg p-2 mr-3 shadow-sm">
                                <ShoppingCart className="text-orange-600" size={16} />
                              </div>
                              <div>
                                <span className="font-semibold text-gray-800">{item.product.name}</span>
                                <div className="text-sm text-gray-600">Quantité: {item.quantity}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="font-bold text-orange-600 text-lg">
                                {(item.product.price * item.quantity)
                                  .toFixed(2)
                                  .replace(".", ",")} €
                              </span>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-red-600 hover:text-red-800 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white shadow-lg">
                        <div className="flex justify-between items-center text-xl font-bold">
                          <span>Total:</span>
                          <span>{cartTotal.toFixed(2).replace(".", ",")} €</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end mt-12 p-6 bg-white rounded-xl border border-orange-100 shadow-lg">
            <Button
              type="button"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
              onClick={nextStep}
            >
              Continuer →
            </Button>
          </div>
        </>
      )}

      {/* Étape 2: Choix du créneau de retrait et informations client */}
      {step === 2 && (
        <>
          <Card className="mb-8 border-orange-100 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-8">
                <Calendar className="text-orange-600 mr-3" size={28} />
                <h2 className="text-3xl font-bold text-gray-800">Choisir votre créneau de retrait</h2>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="pickup-date" className="text-gray-700 font-semibold flex items-center">
                      <Calendar className="mr-2 text-orange-600" size={18} />
                      Date de retrait
                    </Label>
                    <Input
                      id="pickup-date"
                      type="date"
                      min={getTomorrowDate()}
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="mb-4 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                      required
                    />
                    
                    <Label htmlFor="pickup-time" className="text-gray-700 font-semibold flex items-center">
                      <Clock className="mr-2 text-orange-600" size={18} />
                      Créneau horaire
                    </Label>
                    <Select value={pickupTime} onValueChange={setPickupTime}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                        <SelectValue placeholder="Sélectionner un créneau" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Card className="border-orange-100">
                      <CardContent className="pt-6">
                        <h4 className="font-bold mb-4 text-gray-800">Rappel de votre commande</h4>
                        <ul className="space-y-1 mb-4">
                          {cart.map((item) => (
                            <li key={item.product.id} className="text-gray-700">
                              {item.product.name} x {item.quantity}
                            </li>
                          ))}
                        </ul>
                        <div className="border-t pt-2">
                          <p className="font-bold text-orange-600">
                            Total: {cartTotal.toFixed(2).replace(".", ",")} €
                          </p>
                        </div>
                        {pickupDate && pickupTime && (
                          <div className="mt-4 bg-orange-50 p-3 rounded-md border border-orange-200">
                            <h4 className="font-bold mb-2 text-orange-800">Informations de retrait:</h4>
                            <p className="text-orange-700">Date: {formatDate(pickupDate)}</p>
                            <p className="text-orange-700">Heure: {pickupTime}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm">
                <div className="flex items-center mb-6">
                  <User className="text-orange-600 mr-3" size={24} />
                  <h3 className="text-xl font-bold text-gray-800">Vos coordonnées</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="customer-name" className="text-gray-700 font-semibold flex items-center">
                      <User className="mr-2 text-orange-600" size={16} />
                      Nom et prénom *
                    </Label>
                    <Input
                      id="customer-name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="ex. Jean Dupont"
                      className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer-phone" className="text-gray-700 font-semibold flex items-center">
                      <Phone className="mr-2 text-orange-600" size={16} />
                      Téléphone *
                    </Label>
                    <Input
                      id="customer-phone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="ex. 06 12 34 56 78"
                      className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 italic">* Champs obligatoires</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mt-12 p-6 bg-white rounded-xl border border-orange-100 shadow-lg">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="border-orange-200 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg transition-all duration-300"
            >
              ← Retour
            </Button>
            <Button
              type="button"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
              onClick={nextStep}
            >
              Continuer vers le paiement →
            </Button>
          </div>
        </>
      )}

      {/* Étape 3: Paiement */}
      {step === 3 && (
        <>
          <Card className="mb-8 border-orange-100 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-8">
                <CreditCard className="text-orange-600 mr-3" size={28} />
                <h2 className="text-3xl font-bold text-gray-800">Mode de paiement</h2>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 mb-8">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-orange-200 hover:border-orange-400 transition-colors">
                    <RadioGroupItem value="card" id="card" className="text-orange-600" />
                    <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                      <CreditCard className="mr-3 text-orange-600" size={20} />
                      <div>
                        <div className="font-semibold text-gray-800">Paiement par carte (en ligne)</div>
                        <div className="text-sm text-gray-600">Paiement sécurisé immédiat</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-orange-200 hover:border-orange-400 transition-colors">
                    <RadioGroupItem value="onsite" id="onsite" className="text-orange-600" />
                    <Label htmlFor="onsite" className="flex items-center cursor-pointer flex-1">
                      <ShoppingCart className="mr-3 text-orange-600" size={20} />
                      <div>
                        <div className="font-semibold text-gray-800">Paiement sur place</div>
                        <div className="text-sm text-gray-600">Payez lors du retrait (carte ou espèces)</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === "card" && (
                <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm mb-8">
                  <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                    <CreditCard className="mr-3 text-orange-600" size={24} />
                    Informations de paiement
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="card-name" className="text-gray-700 font-semibold">Nom sur la carte</Label>
                      <Input
                        id="card-name"
                        placeholder="ex. Jean Dupont"
                        className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="card-number" className="text-gray-700 font-semibold">Numéro de carte</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-gray-700 font-semibold">Date d'expiration</Label>
                        <Input id="expiry" placeholder="MM/AA" className="border-orange-200 focus:border-orange-500 focus:ring-orange-500" required />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-gray-700 font-semibold">CVV</Label>
                        <Input id="cvv" placeholder="123" className="border-orange-200 focus:border-orange-500 focus:ring-orange-500" required />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                  <ShoppingCart className="mr-3 text-orange-600" size={24} />
                  Récapitulatif de votre commande
                </h3>
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                      <span className="font-medium text-gray-800">{item.product.name} x {item.quantity}</span>
                      <span className="font-bold text-orange-600">{(item.product.price * item.quantity).toFixed(2).replace(".", ",")} €</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-orange-200 pt-6">
                  <div className="flex justify-between items-center mb-4 p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white">
                    <span className="text-xl font-bold">Total:</span>
                    <span className="text-2xl font-bold">{cartTotal.toFixed(2).replace(".", ",")} €</span>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <h4 className="font-bold mb-3 text-orange-800 flex items-center">
                      <Calendar className="mr-2" size={18} />
                      Informations de retrait
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-orange-700">
                      <p className="flex items-center">
                        <Calendar className="mr-2" size={16} />
                        <strong>Date:</strong> {formatDate(pickupDate)}
                      </p>
                      <p className="flex items-center">
                        <Clock className="mr-2" size={16} />
                        <strong>Heure:</strong> {pickupTime}
                      </p>
                      <p className="flex items-center">
                        <User className="mr-2" size={16} />
                        <strong>Client:</strong> {customerName}
                      </p>
                      <p className="flex items-center">
                        <Phone className="mr-2" size={16} />
                        <strong>Téléphone:</strong> {customerPhone}
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-orange-200">
                      <p className="flex items-center text-orange-700">
                        <CreditCard className="mr-2" size={16} />
                        <strong>Mode de paiement:</strong> {paymentMethod === "card" ? "Carte bancaire" : "Sur place"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mt-12 p-6 bg-white rounded-xl border border-orange-100 shadow-lg">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="border-orange-200 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg transition-all duration-300"
            >
              ← Retour
            </Button>
            <Button
              type="button"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={submitOrder}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Traitement en cours...
                </div>
              ) : (
                "✓ Confirmer la commande"
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
