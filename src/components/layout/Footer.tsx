
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/10"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-white/10"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-white/10"></div>
      </div>
      
      <div className="container-custom relative z-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-playfair mb-2 text-amber-200">Le Grain & le Four</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Artisan boulanger depuis 1985, nous perpétuons la tradition du pain français avec passion et savoir-faire.
              </p>
            </div>
            
            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-3 text-amber-200">Suivez-nous</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors duration-300 group">
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors duration-300 group">
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors duration-300 group">
                  <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-playfair mb-4 text-amber-200">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 text-amber-300 flex-shrink-0" />
                <div>
                  <p className="text-white/90">123 Avenue de la République</p>
                  <p className="text-white/90">75011 Paris, France</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <p className="text-white/90">+33 1 23 45 67 89</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <p className="text-white/90">contact@legrainetlefour.fr</p>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-playfair mb-4 text-amber-200 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-amber-300" />
              Horaires
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1 border-b border-white/10">
                <span className="text-white/90">Lun - Ven</span>
                <span className="text-amber-200 font-medium">6h30 - 20h00</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/10">
                <span className="text-white/90">Samedi</span>
                <span className="text-amber-200 font-medium">7h00 - 20h00</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/10">
                <span className="text-white/90">Dimanche</span>
                <span className="text-amber-200 font-medium">7h00 - 13h00</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-white/90">Jours fériés</span>
                <span className="text-amber-200 font-medium">7h00 - 13h00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-playfair mb-4 text-amber-200">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/90 hover:text-amber-200 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-amber-300 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/notre-histoire" className="text-white/90 hover:text-amber-200 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-amber-300 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  Notre Histoire
                </Link>
              </li>
              <li>
                <Link to="/nos-produits" className="text-white/90 hover:text-amber-200 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-amber-300 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  Nos Produits
                </Link>
              </li>
              <li>
                <Link to="/click-and-collect" className="text-white/90 hover:text-amber-200 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-amber-300 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  Click & Collect
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/90 hover:text-amber-200 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-amber-300 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-white/80 text-sm">
                © {currentYear} Le Grain & le Four. Tous droits réservés.
              </p>
              <p className="text-white/60 text-xs mt-1">
                Fait avec ❤️ pour l'amour du bon pain
              </p>
            </div>
            <div className="flex space-x-6 text-xs text-white/60">
              <a href="#" className="hover:text-amber-200 transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-amber-200 transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-amber-200 transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
