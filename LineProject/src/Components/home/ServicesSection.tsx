import React from 'react';
import { motion } from 'framer-motion';
import { Home, Key, FileSearch, Briefcase, Landmark, Ship } from 'lucide-react';
import { FadeInSection } from '../ui/AnimatedText';


const services = [
  {
    icon: Home,
    title: "Vendita & Acquisto",
    description: "Assistenza completa nella compravendita di proprietà esclusive in tutto il mondo."
  },
  {
    icon: Key,
    title: "Property Management",
    description: "Gestione professionale delle vostre proprietà con servizi su misura."
  },
  {
    icon: FileSearch,
    title: "Ricerca Personalizzata",
    description: "Identificazione della proprietà ideale secondo le vostre esigenze specifiche."
  },
  {
    icon: Briefcase,
    title: "Consulenza Investimenti",
    description: "Analisi strategica e supporto per investimenti immobiliari di prestigio."
  },
  {
    icon: Landmark,
    title: "Beni Storici",
    description: "Specializzazione in castelli, dimore storiche e proprietà d'epoca."
  },
  {
    icon: Ship,
    title: "Yacht & Lifestyle",
    description: "Selezione esclusiva di yacht e proprietà waterfront."
  }
];


export default function ServicesSection() {
  return (
    <section className="py-24 bg-[#2D2D2D] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 border border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 border border-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>


      <div className="container mx-auto px-4 relative z-10">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="text-[#C5A572] text-sm tracking-[0.3em] uppercase">
              I Nostri Servizi
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-white mt-4 mb-6">
              Eccellenza a 360°
            </h2>
            <div className="w-24 h-[1px] bg-[#C5A572] mx-auto" />
          </div>
        </FadeInSection>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group p-8 border border-white/10 hover:border-[#C5A572]/50 bg-white/5 backdrop-blur-sm transition-all duration-500"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-full bg-[#C5A572]/10 flex items-center justify-center mb-6 group-hover:bg-[#C5A572]/20 transition-colors"
                >
                  <service.icon className="w-7 h-7 text-[#C5A572]" />
                </motion.div>
                <h3 className="text-xl font-light text-white mb-4 group-hover:text-[#C5A572] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

