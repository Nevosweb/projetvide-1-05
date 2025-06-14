
import Layout from "@/components/layout/Layout";
import ContactForm from "@/components/contact/ContactForm";
import MapSection from "@/components/contact/MapSection";
import { MapPin, Phone, Mail, Clock, Train, Bus, Car } from "lucide-react";
import ScrollToTop from "@/components/ui/ScrollToTop";

const Contact = () => {
  return (
    <Layout>
      <div className="pt-16 pb-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair mb-4 text-gray-800">Contactez-nous</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Nous sommes là pour vous accompagner dans vos projets gourmands. N'hésitez pas à nous contacter !</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
                <h2 className="text-2xl font-playfair mb-6 text-gray-800 flex items-center">
                  <MapPin className="mr-3 text-orange-500" size={28} />
                  Nos coordonnées
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <MapPin className="text-orange-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Adresse</h3>
                      <p className="text-gray-600">123 Avenue de la République</p>
                      <p className="text-gray-600">75011 Paris, France</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Phone className="text-orange-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Téléphone</h3>
                      <p className="text-gray-600">+33 1 23 45 67 89</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Mail className="text-orange-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-600">contact@legrainetlefour.fr</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <Clock className="mr-3 text-orange-500" size={24} />
                  Horaires d'ouverture
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Lundi - Vendredi</span>
                    <span className="text-gray-600">6h30 - 20h00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Samedi</span>
                    <span className="text-gray-600">7h00 - 20h00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Dimanche</span>
                    <span className="text-gray-600">7h00 - 13h00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-700">Jours fériés</span>
                    <span className="text-gray-600">7h00 - 13h00</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-8 text-white">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Car className="mr-3" size={24} />
                  Comment nous rejoindre
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Train size={18} className="mr-3 mt-1 shrink-0" />
                    <span>Métro : ligne 1, station République (150 m)</span>
                  </li>
                  <li className="flex items-start">
                    <Bus size={18} className="mr-3 mt-1 shrink-0" />
                    <span>Bus : 14, 21, 30 – arrêt Boulangerie</span>
                  </li>
                  <li className="flex items-start">
                    <Car size={18} className="mr-3 mt-1 shrink-0" />
                    <span>Stationnement : parking République 2 mn à pied</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
              <h2 className="text-2xl font-playfair mb-6 text-gray-800 flex items-center">
                <Mail className="mr-3 text-orange-500" size={28} />
                Envoyez-nous un message
              </h2>
              <ContactForm />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-playfair mb-6 text-gray-800 flex items-center">
              <MapPin className="mr-3 text-orange-500" size={28} />
              Nous trouver
            </h2>
            <MapSection />
          </div>
        </div>
      </div>
      <ScrollToTop />
    </Layout>
  );
};

export default Contact;
