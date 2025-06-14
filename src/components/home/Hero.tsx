import { useState, useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { UseEmblaCarouselType } from "embla-carousel-react";
const heroImages = [{
  src: "https://www.boulangeriemarionromain.fr/wp-content/uploads/2022/04/pains-francais-2128535.jpg",
  alt: "Pain artisanal fraîchement sorti du four"
}, {
  src: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=1470&auto=format&fit=crop",
  alt: "Des baguettes de tradition croustillantes"
}, {
  src: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1374&auto=format&fit=crop",
  alt: "Pain au levain à la croûte dorée"
}, {
  src: "https://images.unsplash.com/photo-1623334044303-241021148842?q=80&w=1470&auto=format&fit=crop",
  alt: "Viennoiseries fraîchement sorties du four"
}];
const AUTOPLAY_INTERVAL = 3000; // 3 secondes
const INACTIVITY_TIMEOUT = 8000; // 8 secondes avant reprise de l'autoplay

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const [api, setApi] = useState<UseEmblaCarouselType[1] | null>(null);
  const autoplayTimerRef = useRef<number | null>(null);
  const inactivityTimerRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Image fixe pour mobile (image spécifique)
  const mobileHeroImage = {
    src: "https://www.tables-auberges.com/storage/images/front/medias_p/P02160/p02160-rolland-pere-fils-3.jpg",
    alt: "Pain au levain artisanal à la croûte dorée"
  };
  
  const startAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    if (!isPaused && !isMobile) {
      autoplayTimerRef.current = window.setTimeout(() => {
        if (api) {
          setIsTransitioning(true);
          api.scrollNext();
          // Reset transitioning state after animation completes
          setTimeout(() => setIsTransitioning(false), 500);
        }
      }, AUTOPLAY_INTERVAL);
    }
  };
  const handleUserInteraction = () => {
    setIsPaused(true);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, INACTIVITY_TIMEOUT);
  };
  const handleManualNavigation = (direction: 'prev' | 'next') => {
    if (api && !isTransitioning && !isMobile) {
      setIsTransitioning(true);
      if (direction === 'prev') {
        api.scrollPrev();
      } else {
        api.scrollNext();
      }
      handleUserInteraction();

      // Reset transitioning state after animation completes
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Gérer l'autoplay seulement sur desktop
  useEffect(() => {
    if (!isMobile) {
      startAutoplay();
    }
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [api, activeIndex, isPaused, isMobile]);
  return <section id="hero" className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Version mobile : image fixe */}
      {isMobile ? (
        <div className="w-full h-full absolute inset-0 z-0">
          <div className="relative h-full w-full">
            <img
              src={mobileHeroImage.src}
              alt={mobileHeroImage.alt}
              className="absolute inset-0 h-full w-full object-cover filter brightness-[70%] blur-[2px] z-0"
            />
            {/* Overlay pour mobile (optionnel, pour un léger contraste si besoin) */}
            {/* <div className="absolute inset-0 bg-black/20"></div> */}
          </div>
        </div>
      ) : (
        /* Version desktop : carrousel */
        <Carousel className="w-full h-full absolute inset-0" opts={{
          loop: true,
          align: "center"
        }} setApi={carouselApi => {
          setApi(carouselApi);
          if (carouselApi) {
            carouselApi.on("select", () => {
              setActiveIndex(carouselApi.selectedScrollSnap());
              startAutoplay();
            });
          }
        }} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocus={() => setIsPaused(true)} onBlur={() => setIsPaused(false)}>
          <CarouselContent className="h-full">
            {heroImages.map((image, index) => <CarouselItem key={index} className="h-full">
                <div className="relative h-full w-full">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover" 
                  />
                  {/* Overlay pour desktop */}
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
              </CarouselItem>)}
          </CarouselContent>
          
          {/* Custom Navigation Arrows - desktop only */}
          <button className={`absolute left-[10%] top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full 
                      bg-white/80 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary 
                      transition-all duration-300 cursor-pointer ${isTransitioning ? 'pointer-events-none opacity-70' : ''}`} aria-label="Diapositive précédente" onClick={() => handleManualNavigation('prev')} onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleManualNavigation('prev');
        }
      }}>
            <ArrowLeft className="w-6 h-6 text-primary" />
          </button>
          
          <button className={`absolute right-[10%] top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full 
                      bg-white/80 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary 
                      transition-all duration-300 cursor-pointer ${isTransitioning ? 'pointer-events-none opacity-70' : ''}`} aria-label="Diapositive suivante" onClick={() => handleManualNavigation('next')} onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleManualNavigation('next');
        }
      }}>
            <ArrowRight className="w-6 h-6 text-primary" />
          </button>
        </Carousel>
      )}
      
      {/* Hero caption - enhanced with modern design */}
      <div className="hero-caption absolute inset-0 z-10 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6 px-4 text-center text-white w-full max-w-4xl">
          {/* Decorative element */}
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white to-transparent mb-2"></div>
          
          <h1 className="text-4xl md:text-6xl font-playfair font-bold tracking-wide drop-shadow-2xl">
            Le Grain <span className="text-amber-300">&</span> le Four
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-white/60"></div>
            <p className="text-lg md:text-xl font-light tracking-widest uppercase">
              Artisan boulanger-pâtissier
            </p>
            <div className="w-8 h-px bg-white/60"></div>
          </div>
          
          <p className="text-base md:text-lg text-white/90 max-w-2xl leading-relaxed">
            Depuis 1952, nous perpétuons la tradition française du pain artisanal avec passion et savoir-faire
          </p>
          
          {!isMobile && (
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a 
                href="#nos-produits" 
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Découvrir nos spécialités
              </a>
              <a 
                href="/notre-histoire" 
                className="border-2 border-white text-white hover:bg-white hover:text-amber-800 px-8 py-4 rounded-full font-medium transition-all duration-300 backdrop-blur-sm"
              >
                Notre histoire
              </a>
            </div>
          )}
          
          {/* Decorative element */}
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white to-transparent mt-4"></div>
        </div>
      </div>
      
      {/* Mobile only content - simplified for better readability */}
      {isMobile && (
        <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center justify-center gap-6 px-4">
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <a 
              href="#nos-produits" 
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-xl text-center transform hover:scale-105 border border-amber-400/20"
            >
              Découvrir nos spécialités
            </a>
            <a 
              href="/notre-histoire" 
              className="bg-white/90 text-amber-800 hover:bg-white px-8 py-4 rounded-full font-semibold transition-all duration-300 text-center shadow-lg"
            >
              Notre histoire
            </a>
          </div>
        </div>
      )}
    </section>;
}