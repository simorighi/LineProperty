import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube, ChevronUp } from 'lucide-react';


const navLinks = [
  { name: "Home", page: "Home" },
  { name: "Proprietà", page: "Properties" },
  { name: "Mappa", page: "Map" },
  { name: "Chi Siamo", page: "About" },
  { name: "Contatti", page: "Contact" },
];


export default function Layout({ children, currentPageName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const isHomePage = currentPageName === 'Home';


  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
       
        :root {
          --gold: #C5A572;
          --gold-light: #D4B896;
          --dark: #2D2D2D;
          --dark-light: #3D3D3D;
          --cream: #F5F1EB;
          --white: #FFFFFF;
        }
       
        body {
          font-family: 'Montserrat', sans-serif;
        }
       
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Cormorant Garamond', serif;
          letter-spacing: 0.05em;
        }
       
        .nav-link {
          position: relative;
        }
       
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 0.3s ease;
        }
       
        .nav-link:hover::after {
          width: 100%;
        }


        /* Leaflet map fixes */
        .leaflet-container {
          z-index: 0;
        }
      `}</style>


      {/* Header */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isScrolled || !isHomePage ? 'rgba(45, 45, 45, 0.98)' : 'transparent',
          backdropFilter: isScrolled || !isHomePage ? 'blur(10px)' : 'none'
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      >
        {/* Top bar */}
        <div className={`hidden lg:block border-b border-white/10 transition-all duration-500 ${isScrolled || !isHomePage ? 'py-2' : 'py-3'}`}>
          <div className="container mx-auto px-4 flex justify-between items-center text-white/70 text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+390212345678" className="flex items-center gap-2 hover:text-[#C5A572] transition-colors">
                <Phone size={14} />
                +39 02 1234 5678
              </a>
              <a href="mailto:info@lineproperty.com" className="flex items-center gap-2 hover:text-[#C5A572] transition-colors">
                <Mail size={14} />
                info@lineproperty.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[#C5A572] transition-colors"><Instagram size={16} /></a>
              <a href="#" className="hover:text-[#C5A572] transition-colors"><Facebook size={16} /></a>
              <a href="#" className="hover:text-[#C5A572] transition-colors"><Linkedin size={16} /></a>
              <a href="#" className="hover:text-[#C5A572] transition-colors"><Youtube size={16} /></a>
            </div>
          </div>
        </div>


        {/* Main nav */}
        <nav className={`container mx-auto px-4 flex items-center justify-between transition-all duration-500 ${isScrolled || !isHomePage ? 'py-4' : 'py-6'}`}>
          <Link to={createPageUrl("Home")} className="flex items-center gap-3">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6926dd0726e218da889e192b/be163daa5_IMG_0570.jpg"
              alt="Line Property"
              className="h-12 w-auto"
            />
          </Link>


          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                to={createPageUrl(link.page)}
                className={`nav-link text-sm tracking-[0.15em] uppercase transition-colors ${
                  currentPageName === link.page
                    ? 'text-[#C5A572]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>


        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#2D2D2D] border-t border-white/10 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.page}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={createPageUrl(link.page)}
                      className={`block py-2 text-lg ${
                        currentPageName === link.page
                          ? 'text-[#C5A572]'
                          : 'text-white/90'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>


      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPageName}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={isHomePage ? '' : 'pt-32'}
        >
          {children}
        </motion.main>
      </AnimatePresence>


      {/* Footer */}
      <footer className="bg-[#2D2D2D] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6926dd0726e218da889e192b/be163daa5_IMG_0570.jpg"
                  alt="Line Property"
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Leader mondiale nel settore immobiliare di lusso dal 1999.
                Proprietà esclusive nelle location più prestigiose.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 border border-white/20 hover:border-[#C5A572] hover:bg-[#C5A572] transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="p-2 border border-white/20 hover:border-[#C5A572] hover:bg-[#C5A572] transition-all">
                  <Facebook size={18} />
                </a>
                <a href="#" className="p-2 border border-white/20 hover:border-[#C5A572] hover:bg-[#C5A572] transition-all">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>


            {/* Quick Links */}
            <div>
              <h4 className="text-lg mb-6 text-[#C5A572]">Link Rapidi</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.page}>
                    <Link
                      to={createPageUrl(link.page)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>


            {/* Locations */}
            <div>
              <h4 className="text-lg mb-6 text-[#C5A572]">Sedi</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="text-[#C5A572] mt-1 flex-shrink-0" />
                  <span>Via Monte Napoleone 8, Milano</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="text-[#C5A572] mt-1 flex-shrink-0" />
                  <span>Avenue Montaigne 45, Paris</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="text-[#C5A572] mt-1 flex-shrink-0" />
                  <span>Mayfair, London</span>
                </li>
              </ul>
            </div>


            {/* Contact */}
            <div>
              <h4 className="text-lg mb-6 text-[#C5A572]">Contatti</h4>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="tel:+390212345678" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone size={16} className="text-[#C5A572]" />
                    +39 02 1234 5678
                  </a>
                </li>
                <li>
                  <a href="mailto:info@luxuryestate.com" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail size={16} className="text-[#C5A572]" />
                    info@luxuryestate.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>


        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2024 Line Property. Tutti i diritti riservati.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Termini e Condizioni</a>
            </div>
          </div>
        </div>
      </footer>


      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-[#C5A572] text-white shadow-lg hover:bg-[#B8955F] transition-colors z-40"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

