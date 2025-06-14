
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Send } from "lucide-react";

const navItems = [
  { name: "Accueil", path: "/" },
  { name: "Notre Histoire", path: "/notre-histoire" },
  {
    name: "Nos Produits",
    path: "/nos-produits",
    dropdown: [
      { name: "Pains", path: "/nos-produits#pains" },
      { name: "Viennoiseries", path: "/nos-produits#viennoiseries" },
      { name: "Pâtisseries", path: "/nos-produits#patisseries" },
      { name: "Snacking", path: "/nos-produits#snacking" }
    ]
  },
  { name: "Click & Collect", path: "/click-and-collect" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Détection du scroll pour le header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermeture du menu lors du changement de route
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  // Navigation mobile avec scroll to top
  const handleMobileNavigation = (path: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    setIsDropdownOpen(false);
    navigate(path);

    setTimeout(() => {
      setIsOpen(false);
      // Triple scroll to top pour compatibilité
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 150);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const isActive = (path: string) => pathname === path;

  // Styles dynamiques du header
  const headerStyle = scrolled
    ? 'bg-gradient-to-r from-amber-50 via-white to-amber-50 backdrop-blur-xl shadow-2xl border-b border-amber-200/30'
    : 'bg-gradient-to-r from-amber-50/95 via-white/95 to-amber-50/95 backdrop-blur-xl shadow-lg border-b border-amber-200/20';

  return (
    <header className={`py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${headerStyle}`}>
      <div className="container-custom flex items-center justify-between">

        {/* Logo */}
        <Link to="/" onClick={scrollToTop} className="flex items-center group">
          <span className="text-2xl font-playfair font-bold bg-gradient-to-r from-primary via-amber-700 to-primary bg-clip-text text-transparent group-hover:from-amber-600 group-hover:to-amber-800 transition-all duration-300">
            Le Grain & le Four
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "font-lato text-primary hover:text-primary/90 transition-all duration-300 relative py-2 px-3 rounded-md",
                pathname === item.path 
                  ? "nav-link-active bg-secondary/50 font-medium" 
                  : "nav-link hover:bg-secondary/30"
              )}
              aria-current={pathname === item.path ? "page" : undefined}
            >
              {item.name}
              <span className={cn(
                "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-left",
                pathname === item.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )} />
            </Link>
          ))}
        </div>

        {/* Bouton Burger */}
        <button
          className={`md:hidden text-primary p-3 min-h-[48px] min-w-[48px] flex items-center justify-center transition-all duration-500 ease-out hover:scale-110 rounded-2xl hover:shadow-xl active:scale-95 border backdrop-blur-sm group relative overflow-hidden ${
            isOpen
              ? 'bg-gradient-to-r from-red-600/30 to-pink-600/30 border-red-400/30 shadow-lg'
              : 'hover:bg-gradient-to-r hover:from-amber-600/30 hover:to-amber-700/30 border-amber-200/40'
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            {isOpen ? (
              <X size={24} className="transform rotate-0 group-hover:rotate-90 transition-transform duration-300" />
            ) : (
              <Menu size={24} className="transform group-hover:scale-110 transition-transform duration-300" />
            )}
          </div>
        </button>
      </div>

      {/* Menu Mobile */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-gradient-to-br from-amber-50/98 to-white/98 backdrop-blur-xl shadow-2xl border-b border-amber-200/30 transition-all duration-500 ease-out transform ${
        isOpen
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
      }`}>
        <div className="container-custom py-6 px-4 flex flex-col space-y-3">

          {navItems.map((item, index) =>
            item.dropdown ? (
              // Item avec dropdown
              <div key={item.name} className={`flex flex-col transform transition-all duration-300 ease-out ${
                isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`} style={{ transitionDelay: `${index * 100}ms` }}>

                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`font-medium px-5 py-4 min-h-[52px] flex items-center justify-between rounded-2xl transition-all duration-300 w-full text-left border backdrop-blur-sm group relative overflow-hidden ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-amber-600/40 to-amber-700/40 text-primary border-amber-400/30 shadow-lg'
                      : 'hover:bg-gradient-to-r hover:from-amber-600/25 hover:to-amber-700/25 text-primary hover:text-primary/90 border-amber-200/30 hover:border-amber-400/30'
                  }`}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  <ChevronDown size={20} className={`relative z-10 transition-all duration-300 ${
                    isDropdownOpen ? 'rotate-180 text-amber-600' : 'rotate-0'
                  }`} />
                </button>

                {/* Sous-menu */}
                <div className={`overflow-hidden transition-all duration-500 ease-out ${
                  isDropdownOpen
                    ? 'max-h-96 opacity-100 pointer-events-auto'
                    : 'max-h-0 opacity-0 pointer-events-none'
                }`}>
                  <div className="flex flex-col pl-6 space-y-2 py-3">
                    {item.dropdown.map((subItem, subIndex) => (
                      <button
                        key={subItem.name}
                        onClick={(e) => handleMobileNavigation(subItem.path, e)}
                        className={`flex items-center font-medium px-4 py-3 min-h-[48px] rounded-xl transition-all duration-200 text-sm border backdrop-blur-sm group relative overflow-hidden ${
                          isActive(subItem.path)
                            ? 'bg-gradient-to-r from-amber-600/40 to-amber-700/40 text-primary border-amber-400/30 shadow-md'
                            : 'hover:bg-gradient-to-r hover:from-amber-600/25 hover:to-amber-700/25 text-primary/80 hover:text-primary border-amber-200/20 hover:border-amber-400/20'
                        }`}
                        style={{
                          transitionDelay: isDropdownOpen ? `${subIndex * 50}ms` : '0ms',
                          WebkitTapHighlightColor: 'transparent'
                        }}
                      >
                        <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">{subItem.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Item simple
              <button
                key={item.name}
                onClick={(e) => handleMobileNavigation(item.path, e)}
                className={`font-medium px-5 py-4 min-h-[52px] text-left flex items-center rounded-2xl transition-all duration-300 border backdrop-blur-sm group relative overflow-hidden transform ${
                  isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                } ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-amber-600/40 to-amber-700/40 text-primary border-amber-400/30 shadow-lg'
                    : 'hover:bg-gradient-to-r hover:from-amber-600/25 hover:to-amber-700/25 text-primary hover:text-primary/90 border-amber-200/30 hover:border-amber-400/30'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
              </button>
            )
          )}

          {/* Bouton CTA */}
          <button
            onClick={(e) => handleMobileNavigation("/contact", e)}
            className={`bg-gradient-to-r from-primary to-amber-700 hover:from-amber-700 hover:to-primary transition-all duration-300 w-full rounded-2xl py-4 min-h-[52px] mt-6 flex items-center justify-center text-white shadow-lg hover:shadow-2xl border border-amber-500/30 group relative overflow-hidden transform ${
              isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
            }`}
            style={{
              transitionDelay: `${navItems.length * 100 + 200}ms`,
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">Contactez-nous</span>
            <Send className="w-4 h-4 ml-2 relative z-10 group-hover:translate-x-1 group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </header>
  );
}
