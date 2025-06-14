
import { Link } from "react-router-dom";

export default function AboutPreview() {
  return (
    <section className="section-padding bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-200/20 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-200/20 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            {/* Image container with enhanced effects */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1587241321921-91a834d6d191?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Boulanger artisan travaillant la pâte" 
                className="w-full h-[400px] lg:h-[500px] object-cover transition-all duration-500 group-hover:brightness-110"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent"></div>
              
              {/* Decorative corner elements */}
              <div className="absolute top-4 left-4 w-12 h-12">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/60"></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-white/60"></div>
              </div>
              <div className="absolute bottom-4 right-4 w-12 h-12">
                <div className="absolute bottom-0 right-0 w-full h-1 bg-white/60"></div>
                <div className="absolute bottom-0 right-0 w-1 h-full bg-white/60"></div>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-full shadow-xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
              <span className="font-bold text-sm">Depuis 1952</span>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Header section */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-px bg-amber-600"></div>
                <div className="w-3 h-3 bg-amber-600 rounded-full mx-4"></div>
                <div className="w-12 h-px bg-amber-600"></div>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-playfair mb-6 text-gray-800">
                Notre <span className="text-amber-600">histoire</span>
              </h2>
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                Depuis trois générations, la famille Dubois perpétue la tradition boulangère française 
                avec <span className="text-amber-600 font-semibold">passion</span> et <span className="text-amber-600 font-semibold">exigence</span>.
              </p>
              
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                Nos farines locales et notre levain centenaire sont la base de créations qui allient 
                <span className="text-amber-600 font-semibold">authenticité</span> et <span className="text-amber-600 font-semibold">innovation</span>.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 py-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">70+</div>
                  <div className="text-sm text-gray-600">Années d'expérience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">3</div>
                  <div className="text-sm text-gray-600">Générations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">100%</div>
                  <div className="text-sm text-gray-600">Artisanal</div>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="pt-4">
              <Link 
                to="/notre-histoire" 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                En savoir plus
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
