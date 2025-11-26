import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Globe, Users, Building } from 'lucide-react';
import { FadeInSection } from '../ui/AnimatedText';


const stats = [
  { icon: Building, value: "500+", label: "Proprietà Vendute" },
  { icon: Globe, value: "30+", label: "Paesi nel Mondo" },
  { icon: Users, value: "1000+", label: "Clienti Soddisfatti" },
  { icon: Award, value: "25", label: "Anni di Esperienza" },
];


export default function AboutPreview() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <FadeInSection>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Luxury Interior"
                  className="w-full max-w-md ml-auto rounded-lg shadow-2xl"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-12 -left-8 z-20 hidden md:block"
              >
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
                  alt="Luxury Exterior"
                  className="w-64 rounded-lg shadow-2xl border-4 border-white"
                />
              </motion.div>
              {/* Decorative element */}
              <div className="absolute -top-8 -right-8 w-64 h-64 border border-[#C5A572]/30 rounded-lg -z-10" />
            </div>
          </FadeInSection>


          {/* Content */}
          <div className="lg:pl-8">
            <FadeInSection delay={0.2}>
              <span className="text-[#C5A572] text-sm tracking-[0.3em] uppercase">
                Chi Siamo
              </span>
              <h2 className="text-4xl md:text-5xl font-light text-[#2D2D2D] mt-4 mb-6 leading-tight">
                Pionieri nel Lusso<br />
                Immobiliare dal 1999
              </h2>
              <div className="w-24 h-[1px] bg-[#C5A572] mb-8" />
            </FadeInSection>


            <FadeInSection delay={0.4}>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Da oltre due decenni, rappresentiamo l'eccellenza nel settore immobiliare
                di lusso internazionale. La nostra expertise si fonda su un'approfondita
                conoscenza del mercato e su relazioni esclusive con proprietari e acquirenti
                delle proprietà più prestigiose al mondo.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Ogni transazione è curata nei minimi dettagli, garantendo un servizio
                discreto, personalizzato e all'altezza delle aspettative della nostra
                clientela più esigente.
              </p>
            </FadeInSection>


            <FadeInSection delay={0.6}>
              <div className="grid grid-cols-2 gap-6 mb-10">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    viewport={{ once: true }}
                    className="text-center p-4 bg-[#F5F1EB] rounded-lg"
                  >
                    <stat.icon className="w-8 h-8 text-[#C5A572] mx-auto mb-2" />
                    <div className="text-3xl font-light text-[#2D2D2D]">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </FadeInSection>


            <FadeInSection delay={0.8}>
              <Link to={createPageUrl("About")}>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-3 text-[#2D2D2D] text-sm tracking-[0.2em] uppercase font-medium group"
                >
                  Scopri la Nostra Storia
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </Link>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

