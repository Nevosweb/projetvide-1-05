
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, Phone, Heart, ArrowUp } from "lucide-react";
import { Croissant, Cake, Cookie } from "lucide-react";
import { Wheat } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { id: "viennoiseries", name: "Viennoiseries", icon: Croissant, color: "from-amber-400 to-orange-500" },
  { id: "pains", name: "Pains", icon: Wheat, color: "from-orange-400 to-red-500" },
  { id: "patisseries", name: "Pâtisseries", icon: Cake, color: "from-pink-400 to-rose-500" },
  { id: "snacking", name: "Salé", icon: Cookie, color: "from-green-400 to-emerald-500" }
];

const products = [
  // Viennoiseries (4 produits)
  {
    id: 1,
    name: "Croissant au Beurre",
    description: "Croissant traditionnel au beurre AOP, feuilletage parfait et croustillant",
    price: 1.20,
    image:"https://lesmoulinslafayette.com/wp-content/uploads/2023/07/20827-croissants.jpg",
    category: "viennoiseries",
    rating: 4.8,
    prepTime: "15 min",
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Pain au Chocolat",
    description: "Viennoiserie feuilletée avec deux barres de chocolat noir de qualité",
    price: 1.40,
    image: "https://www.lafourneedoree.fr/wp-content/uploads/2022/05/13248-recette_pains-chocolat-amandes.jpg",
    category: "viennoiseries",
    rating: 4.7,
    prepTime: "15 min"
  },
  {
    id: 3,
    name: "Chausson aux Pommes",
    description: "Pâte feuilletée garnie de compotée de pommes à la cannelle",
    price: 1.60,
    image: "https://www.matyasy.com/storage/products/91/129--PATISSERIE_VIENNOISERIE_CHAUSSON_POMMES.jpg",
    category: "viennoiseries",
    rating: 4.6,
    prepTime: "18 min"
  },
  {
    id: 4,
    name: "Brioche Tressée",
    description: "Brioche moelleuse tressée à la main, parfumée à la fleur d'oranger",
    price: 2.80,
    image: "https://images.getrecipekit.com/20230715085934-adobestock_70173735-min.jpeg?width=650&quality=90&",
    category: "viennoiseries",
    rating: 4.9,
    prepTime: "20 min"
  },
  // Pains (4 produits)
  {
    id: 5,
    name: "Baguette Tradition",
    description: "Pain traditionnel français, croûte dorée et mie alvéolée",
    price: 1.10,
    image: "https://la-boite-a-pain.com/wp-content/uploads/2021/06/baguette-tradition.jpg",
    category: "pains",
    rating: 4.8,
    prepTime: "5 min",
    badge: "Tradition"
  },
  {
    id: 6,
    name: "Pain Complet Bio",
    description: "Pain complet aux graines, farine bio locale, riche en fibres",
    price: 2.80,
    image: "https://www.laboulangeriemathieu.com/1374-thickbox_default/pain-complet-bio-350g.jpg",
    category: "pains",
    rating: 4.7,
    prepTime: "8 min",
    badge: "Bio"
  },
  {
    id: 7,
    name: "Pain de Campagne",
    description: "Pain rustique au levain naturel, mie dense et savoureuse",
    price: 3.20,
    image: "https://img.cuisineaz.com/660x495/2013/12/20/i9204-recette-de-pain-de-campagne.webp",
    category: "pains",
    rating: 4.9,
    prepTime: "10 min"
  },
  {
    id: 8,
    name: "Pain aux Noix",
    description: "Pain artisanal aux cerneaux de noix, parfait pour le fromage",
    price: 4.50,
    image: "https://www.liberte-paris.com/cdn/shop/files/Designsanstitre-2_1512x.png?v=1704461577",
    category: "pains",
    rating: 4.6,
    prepTime: "12 min"
  },
  // Pâtisseries (4 produits)
  {
    id: 9,
    name: "Éclair au Café",
    description: "Pâte à choux garnie de crème pâtissière au café, glaçage fondant",
    price: 3.50,
    image: "https://files.meilleurduchef.com/mdc/photo/recette/eclair-cafe/eclair-cafe-640.jpg",
    category: "patisseries",
    rating: 4.9,
    prepTime: "20 min",
    badge: "Nouveau"
  },
  {
    id: 10,
    name: "Tartelette aux Fraises",
    description: "Pâte sablée, crème pâtissière vanille et fraises fraîches de saison",
    price: 4.80,
    image: "https://files.meilleurduchef.com/mdc/photo/recette/tartelette-fraise-bois/tartelette-fraise-bois-1200.jpg",
    category: "patisseries",
    rating: 4.6,
    prepTime: "25 min"
  },
  {
    id: 11,
    name: "Mille-feuille Vanille",
    description: "Feuilletage croustillant, crème pâtissière vanille et glaçage royal",
    price: 4.20,
    image: "https://www.boulangeriejeannot.com/wp-content/uploads/2016/04/Adso-J%C2%A9H.Lagarde_105-1.jpg",
    category: "patisseries",
    rating: 4.8,
    prepTime: "30 min"
  },
  {
    id: 12,
    name: "Paris-Brest",
    description: "Choux pralinés garnis de crème mousseline aux noisettes",
    price: 5.50,
    image: "https://i0.wp.com/www.lespepitesdecloe.com/wp-content/uploads/2019/03/recette-paris-brest-les-p%C3%A9pites-de-clo%C3%A9-4l.jpg?w=1920&ssl=1",
    category: "patisseries",
    rating: 4.7,
    prepTime: "35 min"
  },
  // Salé (4 produits)
  {
    id: 13,
    name: "Quiche Lorraine",
    description: "Pâte brisée garnie de lardons, œufs et crème fraîche, recette traditionnelle",
    price: 4.50,
    image: "https://www.bjorg.fr/wp-content/uploads/2016/01/quiche-lorraine-3-718x485.jpg",
    category: "snacking",
    rating: 4.7,
    prepTime: "15 min"
  },
  {
    id: 14,
    name: "Croque-Monsieur",
    description: "Pain de mie, jambon blanc et fromage gratiné, sauce béchamel",
    price: 3.80,
    image: "https://api.toutlevin.com/images/f061cef159f347e7c74f287c3baee28e004740003000.jpg?width=1920&quality=75",
    category: "snacking",
    rating: 4.5,
    prepTime: "12 min"
  },
  {
    id: 15,
    name: "Feuilleté au Saumon",
    description: "Pâte feuilletée garnie de saumon fumé, épinards et fromage frais",
    price: 5.20,
    image: "https://www.yumelise.fr/wp-content/uploads/2021/05/feuillete-saumon-poireaux-companion.jpg",
    category: "snacking",
    rating: 4.8,
    prepTime: "18 min"
  },
  {
    id: 16,
    name: "Pizza Margherita",
    description: "Pâte artisanale, sauce tomate, mozzarella et basilic frais",
    price: 6.50,
    image: "https://www.alfaforni.com/wp-content/uploads/2020/05/pizza-margherita-alfa-forni.jpg",
    category: "snacking",
    rating: 4.6,
    prepTime: "20 min"
  }
];

function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState("viennoiseries");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <div className="relative pt-8 pb-16 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Produits</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Découvrez notre sélection artisanale de viennoiseries, pâtisseries et pains frais, 
              préparés chaque jour avec passion et savoir-faire traditionnel.
            </motion.p>
          </div>
        </div>
      </div>
      
      {/* Products Section */}
      <div className="container mx-auto px-4 pb-20">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          {/* Categories Navigation */}
          <div className="mb-12">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent h-auto p-0 justify-center mx-auto max-w-4xl">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className={`
                      relative group h-auto p-6 bg-white/80 backdrop-blur-sm border-2 border-transparent
                      hover:border-amber-200 data-[state=active]:border-amber-400 
                      rounded-2xl transition-all duration-300 hover:scale-105
                      data-[state=active]:bg-gradient-to-br data-[state=active]:${category.color}
                      data-[state=active]:text-white shadow-lg hover:shadow-xl
                    `}
                  >
                    <div className={`
                      absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 
                      group-data-[state=active]:opacity-100 transition-opacity duration-300
                    `}></div>
                    
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300
                        bg-slate-100 group-data-[state=active]:bg-white/20
                      `}>
                        <IconComponent className={`
                          w-6 h-6 transition-colors duration-300
                          text-slate-600 group-data-[state=active]:text-white
                        `} />
                      </div>
                      
                      <span className={`
                        font-semibold text-lg transition-colors duration-300
                        text-slate-700 group-data-[state=active]:text-white
                      `}>
                        {category.name}
                      </span>
                      
                      <div className={`
                        text-sm transition-colors duration-300
                        text-slate-500 group-data-[state=active]:text-white/80
                      `}>
                        {products.filter(p => p.category === category.id).length} produits
                      </div>
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
          
          {/* Products Grid */}
          {categories.map((category) => {
            const categoryProducts = products.filter(product => product.category === category.id);
            return (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  {category.name}
                </h2>
                <p className="text-slate-600">
                  {categoryProducts.length} produits disponibles
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                {categoryProducts.map((product, index) => (
                  <Card 
                    key={product.id}
                    className={`
                      product-card group relative overflow-hidden bg-white border-0 shadow-lg
                      hover:shadow-2xl transition-all duration-500 hover:-translate-y-2
                      animate-fade-in-up flex flex-col h-full
                    `}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onMouseEnter={() => setHoveredCard(product.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Badge */}
                      {product.badge && (
                        <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                          {product.badge}
                        </div>
                      )}
                      
                      {/* Preparation Time */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-sm font-medium shadow-lg flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {product.prepTime}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                          {product.name}
                        </h3>
                        
                        <p className="text-slate-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating) 
                                    ? 'text-amber-400 fill-current' 
                                    : 'text-slate-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-slate-500">({product.rating})</span>
                        </div>
                      </div>
                      
                      {/* Price and Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="text-2xl font-bold text-amber-600">
                          {product.price}€
                        </div>
                        
                        <Button 
                          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                          onClick={() => {
                            window.location.href = '/click-and-collect';
                          }}
                        >
                          Commander maintenant
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            );
          })}
        </Tabs>
      </div>
      
      {/* Bottom CTA Section */}
      <div className="relative py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-200/30 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-200/20 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Prêt à découvrir nos saveurs ?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-slate-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Contactez-nous dès maintenant pour passer commande. 
            </motion.p>
            
            <motion.div 
              className="flex justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button 
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
                onClick={() => window.location.href = '/contact'}
              >
                <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Nous contacter
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}
      </style>
    </div>
  );
}

export default ProductGrid;
