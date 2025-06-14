
import { useEffect, useRef } from 'react';
import { Heart, Wheat, Users, Award, Leaf, MapPin, Clock, Lightbulb } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: "Authenticité",
    description: "Des recettes transmises depuis trois générations",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: MapPin,
    title: "Local",
    description: "Des farines issues de producteurs régionaux",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Clock,
    title: "Tradition",
    description: "Utilisation d'un levain naturel cultivé depuis plus de 50 ans",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Recherche constante de nouvelles saveurs tout en respectant les méthodes artisanales",
    color: "from-blue-500 to-indigo-500"
  }
];

export default function BakerProfile() {
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          
          if (target === valuesRef.current) {
            // Animate values cards
            const valueCards = target.querySelectorAll('.value-card');
            valueCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.remove('opacity-0', 'translate-y-8', 'scale-95');
                card.classList.add('opacity-100', 'translate-y-0', 'scale-100');
              }, index * 150);
            });
          }
        }
      });
    }, observerOptions);

    if (valuesRef.current) observer.observe(valuesRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="section-padding bg-white relative" ref={valuesRef}>
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Nos engagements</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-playfair mb-6 text-gray-800">
              Nos <span className="text-primary">Valeurs</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Quatre piliers fondamentaux guident notre travail quotidien et notre engagement envers l'excellence artisanale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="value-card opacity-0 translate-y-8 scale-95 transition-all duration-500 ease-out h-full">
                  <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h4 className="text-2xl font-playfair mb-4 text-gray-800 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h4>
                    
                    <p className="text-gray-600 leading-relaxed flex-grow">
                      {value.description}
                    </p>
                    
                    {/* Decorative element */}
                    <div className={`mt-6 w-12 h-1 bg-gradient-to-r ${value.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    </section>
  );
}
