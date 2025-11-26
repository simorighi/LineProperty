import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { FadeInSection } from '../ui/AnimatedText';


const testimonials = [
  {
    id: 1,
    name: "Alessandro Rossi",
    role: "Imprenditore",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    text: "Un'esperienza impeccabile dall'inizio alla fine. Hanno trovato la villa dei miei sogni in Costa Smeralda con una professionalità straordinaria.",
    rating: 5
  },
  {
    id: 2,
    name: "Sophie Laurent",
    role: "Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    text: "La loro conoscenza del mercato immobiliare di lusso è ineguagliabile. Mi hanno guidato nell'acquisto del mio appartamento a Monaco con estrema discrezione.",
    rating: 5
  },
  {
    id: 3,
    name: "James Mitchell",
    role: "CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    text: "Professionalità, eleganza e risultati. Hanno venduto la mia proprietà a Londra in tempi record al prezzo desiderato.",
    rating: 5
  }
];


export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);


  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);


  return (
    <section className="py-24 bg-[#F5F1EB]">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="text-[#C5A572] text-sm tracking-[0.3em] uppercase">
              Testimonianze
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-[#2D2D2D] mt-4 mb-6">
              Cosa Dicono i Nostri Clienti
            </h2>
            <div className="w-24 h-[1px] bg-[#C5A572] mx-auto" />
          </div>
        </FadeInSection>


        <div className="max-w-4xl mx-auto relative">
          <Quote className="absolute -top-8 left-0 w-24 h-24 text-[#C9A55C]/10" />
         
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center px-8 md:px-16"
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C5A572] text-[#C5A572]" />
                ))}
              </div>
              <p className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed mb-8 italic">
                "{testimonials[current].text}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#C5A572]"
                />
                <div className="text-left">
                  <div className="font-medium text-[#2D2D2D]">
                    {testimonials[current].name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonials[current].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>


          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="p-3 rounded-full border border-gray-300 hover:border-[#C5A572] hover:bg-[#C5A572] hover:text-white transition-all"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === current ? 'bg-[#C5A572] w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="p-3 rounded-full border border-gray-300 hover:border-[#C5A572] hover:bg-[#C5A572] hover:text-white transition-all"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

