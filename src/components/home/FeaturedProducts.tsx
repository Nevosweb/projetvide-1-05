
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const featuredProducts = [
  {
    id: 1,
    name: "Pain au levain 72h",
    image: "https://plus.unsplash.com/premium_photo-1700767181915-8a1bc379cae7?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Fermentation lente pour un goût incomparable",
    price: "5,20 €",
    isSpecial: true,
  },
  {
    id: 2,
    name: "Kouglof alsacien",
    image: "https://assets.afcdn.com/recipe/20210203/117789_w1024h768c1cx1060cy707cxt0cyt0cxb2121cyb1414.jpg",
    description: "Recette traditionnelle aux amandes et raisins",
    price: "12,50 €",
    isSpecial: true,
  },
  {
    id: 3,
    name: "Baguette tradition au sarrasin",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=1470&auto=format&fit=crop",
    description: "Mélange unique de farines pour une saveur rustique",
    price: "2,40 €",
    isSpecial: true,
  },
  {
    id: 4,
    name: "Éclair praliné",
    image: "https://d2y8lrt1ygofia.cloudfront.net/e18dh5azlr95862nzdn1rohn3hsd",
    description: "Garniture crémeuse et croquante à la noisette",
    price: "4,50 €",
    isSpecial: true,
  },
];

export default function FeaturedProducts() {
  return (
    <section id="nos-produits" className="section-padding bg-gradient-to-b from-white to-amber-50/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          {/* Decorative element */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-px bg-amber-600"></div>
            <div className="w-3 h-3 bg-amber-600 rounded-full mx-4"></div>
            <div className="w-12 h-px bg-amber-600"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-playfair mb-6 text-gray-800">
            Nos produits <span className="text-amber-600">phares</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos spécialités maison élaborées avec passion et savoir-faire artisanal, 
            dans le respect des traditions françaises
          </p>
          
          {/* Decorative element */}
          <div className="flex items-center justify-center mt-6">
            <div className="w-12 h-px bg-amber-600"></div>
            <div className="w-3 h-3 bg-amber-600 rounded-full mx-4"></div>
            <div className="w-12 h-px bg-amber-600"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group bg-white border-0 shadow-lg"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {product.isSpecial && (
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 shadow-lg">
                    Spécialité maison
                  </Badge>
                )}
                
                {/* Price overlay on hover */}
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="bg-white/90 backdrop-blur-sm text-amber-700 font-bold px-3 py-1 rounded-full text-lg shadow-lg">
                    {product.price}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6 relative">
                {/* Decorative corner */}
                <div className="absolute top-0 left-0 w-8 h-8">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-transparent"></div>
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-transparent"></div>
                </div>
                
                <h3 className="text-xl font-playfair mb-3 text-gray-800 group-hover:text-amber-700 transition-colors duration-300">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  {product.description}
                </p>
                
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="font-bold text-amber-600 text-lg">{product.price}</span>
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-px bg-amber-600"></div>
            <div className="w-3 h-3 bg-amber-600 rounded-full mx-4"></div>
            <div className="w-16 h-px bg-amber-600"></div>
          </div>
          
          <Link 
            to="/nos-produits" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            Voir tous nos produits
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </Link>
          
          <p className="text-gray-500 mt-4 text-sm">
            Plus de 50 spécialités vous attendent
          </p>
        </div>
      </div>
    </section>
  );
}
