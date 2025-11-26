import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { FadeInSection } from '../ui/AnimatedText';


export default function ContactCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=80)' }}
      />
      <div className="absolute inset-0 bg-[#2D2D2D]/90" />


      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeInSection>
            <span className="text-[#C5A572] text-sm tracking-[0.3em] uppercase">
              Contattaci
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-white mt-4 mb-6 leading-tight">
              Realizziamo il Tuo<br />
              Sogno Immobiliare
            </h2>
            <div className="w-24 h-[1px] bg-[#C5A572] mb-8" />
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              I nostri consulenti sono a tua disposizione per guidarti nella
              ricerca della proprietà perfetta o nella vendita del tuo immobile
              di prestigio.
            </p>
            <Link to={createPageUrl("Contact")}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#C5A572] text-white text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#B8955F] transition-colors"
              >
                Richiedi una Consulenza
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </Link>
          </FadeInSection>


          <FadeInSection delay={0.3}>
            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#C5A572]/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-[#C5A572]/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#C5A572]" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Telefono</div>
                  <div className="text-white text-lg">+39 02 1234 5678</div>
                </div>
              </motion.div>


              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#C5A572]/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-[#C5A572]/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#C5A572]" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Email</div>
                  <div className="text-white text-lg">info@luxuryestate.com</div>
                </div>
              </motion.div>


              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#C5A572]/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-[#C5A572]/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#C5A572]" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Sede Principale</div>
                  <div className="text-white text-lg">Via Monte Napoleone, Milano</div>
                </div>
              </motion.div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

