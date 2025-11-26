import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ChevronDown, Play, Pause } from 'lucide-react';
import { AnimatedText } from '../ui/AnimatedText';


const heroImages = [
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6926dd0726e218da889e192b/424277cc6_FinalOpening.png",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
];


export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);


  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);


  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };


  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImages[currentImage]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </motion.div>
      </AnimatePresence>


      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-block text-[#C5A572] text-sm tracking-[0.3em] uppercase mb-6 font-light">
            What You Dream Is Reality With Us
          </span>
        </motion.div>


        <h1 className="text-center text-white mb-8">
          <AnimatedText
            text="Line Property"
            className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-wider"
            delay={0.5}
          />
          <AnimatedText
            text="Your Future Home"
            className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mt-4 text-[#C5A572]"
            delay={0.8}
          />
        </h1>


        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-white/80 text-lg sm:text-xl max-w-2xl text-center mb-12 font-light tracking-wide"
        >
          Proprietà esclusive nelle location più prestigiose del mondo
        </motion.p>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to={createPageUrl("Properties")}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-4 bg-[#C5A572] text-white overflow-hidden"
            >
              <span className="relative z-10 text-sm tracking-[0.2em] uppercase font-medium">
                Scopri le Proprietà
              </span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[#C5A572] text-sm tracking-[0.2em] uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                Scopri le Proprietà
              </span>
            </motion.button>
          </Link>
          <Link to={createPageUrl("Contact")}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border border-white/50 text-white text-sm tracking-[0.2em] uppercase font-medium hover:bg-white/10 transition-colors duration-300"
            >
              Contattaci
            </motion.button>
          </Link>
        </motion.div>


        {/* Image indicators */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-3">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-12 h-[2px] transition-all duration-500 ${
                idx === currentImage ? 'bg-[#C5A572]' : 'bg-white/30'
              }`}
            />
          ))}
        </div>


        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-32 right-8 text-white/70 hover:text-white transition-colors"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>


      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2.5, duration: 1 },
          y: { repeat: Infinity, duration: 2 }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
}

