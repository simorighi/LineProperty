import React from 'react';
import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/AnimatedText';


const timelineEvents = [
  {
    year: "1999",
    title: "Fondazione",
    description: "Nasce LuxuryEstate a Milano, con una visione chiara: ridefinire il concetto di immobiliare di lusso."
  },
  {
    year: "2005",
    title: "Espansione Europea",
    description: "Apertura degli uffici di Londra e Monaco, consolidando la presenza nei mercati più prestigiosi d'Europa."
  },
  {
    year: "2010",
    title: "100 Proprietà Vendute",
    description: "Raggiunto il traguardo delle prime 100 proprietà di prestigio vendute, per un valore complessivo di oltre €500M."
  },
  {
    year: "2015",
    title: "Network Globale",
    description: "Espansione in Medio Oriente e Asia, con nuovi uffici a Dubai e Singapore."
  },
  {
    year: "2020",
    title: "Digital Excellence",
    description: "Lancio della piattaforma digitale con tour virtuali e AI per la ricerca personalizzata."
  },
  {
    year: "2024",
    title: "Leader Mondiale",
    description: "Riconosciuti come leader globale nel settore immobiliare di ultra-lusso con presenza in 30+ paesi."
  }
];


export default function Timeline() {
  return (
    <div className="relative py-16">
      {/* Vertical Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-[#C9A55C]/0 via-[#C9A55C] to-[#C9A55C]/0" />


      <div className="space-y-16">
        {timelineEvents.map((event, index) => (
          <FadeInSection key={index} delay={index * 0.1}>
            <div className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16 text-left'}`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <span className="text-[#C9A55C] text-sm tracking-[0.2em] uppercase">
                    {event.year}
                  </span>
                  <h3 className="text-xl font-semibold text-[#1a1a2e] mt-2 mb-3">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                </motion.div>
              </div>


              {/* Center Point */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#C9A55C] rounded-full border-4 border-white shadow-lg z-10"
              />


              {/* Empty space for the other side */}
              <div className="w-5/12" />
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
}

