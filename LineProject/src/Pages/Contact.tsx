import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Globe } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import { FadeInSection } from '@/components/ui/AnimatedText';


const offices = [
  {
    city: "Milano",
    address: "Via Monte Napoleone 8",
    phone: "+39 02 1234 5678",
    email: "milano@luxuryestate.com",
    hours: "Lun-Ven: 9:00 - 18:00"
  },
  {
    city: "Parigi",
    address: "Avenue Montaigne 45",
    phone: "+33 1 2345 6789",
    email: "paris@luxuryestate.com",
    hours: "Lun-Ven: 9:00 - 18:00"
  },
  {
    city: "Londra",
    address: "Mayfair, Berkeley Square",
    phone: "+44 20 1234 5678",
    email: "london@luxuryestate.com",
    hours: "Lun-Ven: 9:00 - 18:00"
  },
  {
    city: "Dubai",
    address: "Dubai Marina",
    phone: "+971 4 123 4567",
    email: "dubai@luxuryestate.com",
    hours: "Dom-Gio: 9:00 - 18:00"
  }
];


export default function Contact() {
  const { data: properties } = useQuery({
    queryKey: ['properties'],
    queryFn: () => base44.entities.Property.list('-created_date', 100),
    initialData: [],
  });


  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 bg-[#2D2D2D]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=80)' }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <FadeInSection>
            <div className="text-center">
              <span className="text-[#C5A572] text-sm tracking-[0.3em] uppercase">
                Parliamo
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mt-4 mb-6">
                Contattaci
              </h1>
              <div className="w-24 h-[1px] bg-[#C5A572] mx-auto mb-6" />
              <p className="text-gray-300 max-w-2xl mx-auto">
                I nostri consulenti sono a disposizione per assisterti nella ricerca
                della proprietà perfetta o per valutare il tuo immobile.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>


      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <FadeInSection>
              <div className="bg-[#F5F1EB] p-8 md:p-12">
                <span className="text-[#C5A572] text-sm tracking-[0.3em] uppercase">
                  Inviaci un Messaggio
                </span>
                <h2 className="text-3xl font-light text-[#2D2D2D] mt-4 mb-8">
                  Richiedi Informazioni
                </h2>
                <ContactForm properties={properties} />
              </div>
            </FadeInSection>


            {/* Contact Info */}
            <FadeInSection delay={0.2}>
              <div>
                <span className="text-[#C5A572] text-sm tracking-[0.3em] uppercase">
                  Contatti Diretti
                </span>
                <h2 className="text-3xl font-light text-[#2D2D2D] mt-4 mb-8">
                  Siamo qui per Te
                </h2>


                <div className="space-y-6 mb-12">
                  <motion.a
                    href="tel:+390212345678"
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 bg-[#F5F1EB] hover:bg-[#C5A572]/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#C5A572]/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#C5A572]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Telefono</div>
                      <div className="text-lg text-[#2D2D2D]">+39 02 1234 5678</div>
                    </div>
                  </motion.a>


                  <motion.a
                    href="mailto:info@luxuryestate.com"
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 bg-[#F5F1EB] hover:bg-[#C5A572]/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#C5A572]/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#C5A572]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="text-lg text-[#2D2D2D]">info@lineproperty.com</div>
                    </div>
                  </motion.a>


                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 bg-[#f8f7f4]"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#C5A572]/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#C5A572]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Orari</div>
                      <div className="text-lg text-[#2D2D2D]">Lun - Ven: 9:00 - 18:00</div>
                    </div>
                  </motion.div>
                </div>


                <div className="p-6 bg-[#2D2D2D] text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-5 h-5 text-[#C5A572]" />
                    <span className="text-sm tracking-wider uppercase">Servizio Globale</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Offriamo consulenza e assistenza in tutto il mondo,
                    24/7 per la nostra clientela internazionale.
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>


      {/* Offices */}
      <section className="py-24 bg-[#F5F1EB]">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="text-[#C5A572] text-sm tracking-[0.3em] uppercase">
                Le Nostre Sedi
              </span>
              <h2 className="text-4xl font-light text-[#2D2D2D] mt-4 mb-6">
                Uffici nel Mondo
              </h2>
              <div className="w-24 h-[1px] bg-[#C5A572] mx-auto" />
            </div>
          </FadeInSection>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offices.map((office, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-semibold text-[#2D2D2D] mb-4">{office.city}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin size={16} className="text-[#C5A572] mt-0.5 flex-shrink-0" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={16} className="text-[#C5A572] flex-shrink-0" />
                      <a href={`tel:${office.phone}`} className="hover:text-[#C5A572] transition-colors">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={16} className="text-[#C5A572] flex-shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:text-[#C5A572] transition-colors">
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} className="text-[#C5A572] flex-shrink-0" />
                      <span>{office.hours}</span>
                    </div>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

