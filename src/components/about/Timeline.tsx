
import { Clock, Award, Users, Star, Trophy, Home } from 'lucide-react';

const timelineEvents = [
  {
    year: "1952",
    title: "Création de la boulangerie",
    description: "Fondée par Marcel Dubois, la boulangerie ouvre ses portes pour la première fois au cœur de Paris.",
    icon: Home
  },
  {
    year: "1978",
    title: "Transmission à la seconde génération",
    description: "Pierre Dubois reprend l'entreprise familiale et développe les premiers pains spéciaux.",
    icon: Users
  },
  {
    year: "1995",
    title: "Prix d'excellence artisanale",
    description: "Reconnaissance du savoir-faire unique de la boulangerie par la Chambre des Métiers.",
    icon: Award
  },
  {
    year: "2010",
    title: "Troisième génération aux commandes",
    description: "Claire Dubois reprend le flambeau et modernise l'approche tout en préservant les traditions.",
    icon: Star
  },
  {
    year: "2018",
    title: "Médaille d'or pour notre pain au levain",
    description: "Notre pain signature est récompensé au Concours National de la Boulangerie Artisanale.",
    icon: Trophy
  },
  {
    year: "2023",
    title: "Ouverture du nouveau local",
    description: "Agrandissement et rénovation pour mieux vous accueillir et développer notre gamme de produits.",
    icon: Clock
  }
];

export default function Timeline() {

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f59e0b%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-playfair mb-6 text-gray-800">
              Notre <span className="text-primary">Histoire</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Depuis 1952, trois générations de boulangers passionnés perpétuent l'art du pain artisanal. 
              Découvrez les moments clés qui ont façonné notre boulangerie familiale.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber-100 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-100 rounded-full opacity-20 blur-xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="relative max-w-6xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-amber-400 to-primary rounded-full shadow-sm"></div>
            
            <div className="space-y-16">
              {timelineEvents.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div key={index} className="relative timeline-card">
                    {/* Enhanced circle indicator */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                      <div className="w-16 h-16 rounded-full bg-white border-4 border-primary shadow-lg flex items-center justify-center">
                        <IconComponent className="w-7 h-7 text-primary" />
                      </div>
                    </div>
                    
                    <div className={`flex flex-col lg:flex-row lg:items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                      {/* Year */}
                      <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:text-left lg:pl-16' : 'lg:text-right lg:pr-16'} mb-6 lg:mb-0`}>
                        <div className="inline-flex items-center">
                          <span className="bg-gradient-to-r from-primary to-amber-500 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-200">
                            {event.year}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:text-left lg:pl-16'}`}>
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <h3 className="text-2xl font-playfair mb-3 text-gray-800 leading-tight">{event.title}</h3>
                              <p className="text-gray-600 leading-relaxed text-lg">{event.description}</p>
                            </div>
                          </div>
                          
                          {/* Decorative element */}
                          <div className={`mt-6 flex ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'} justify-start`}>
                            <div className="w-12 h-1 bg-gradient-to-r from-primary to-amber-400 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
