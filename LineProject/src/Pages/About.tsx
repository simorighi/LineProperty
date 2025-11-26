import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import PropertyMap from '@/components/map/PropertyMap';
import { FadeInSection } from '@/components/ui/AnimatedText';


export default function Map() {
  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: () => base44.entities.Property.list('-created_date', 100),
    initialData: [],
  });


  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      {/* Hero */}
      <section className="relative py-20 bg-[#2D2D2D]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80)' }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <FadeInSection>
            <div className="text-center">
              <span className="text-[#C5A572] text-sm tracking-[0.3em] uppercase">
                Presenza Globale
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mt-4 mb-6">
                Mappa Interattiva
              </h1>
              <div className="w-24 h-[1px] bg-[#C5A572] mx-auto mb-6" />
              <p className="text-gray-300 max-w-2xl mx-auto">
                Esplora le nostre proprietà esclusive in tutto il mondo.
                Clicca sui marker per scoprire i dettagli di ogni immobile.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>


      {/* Map */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeInSection>
            {isLoading ? (
              <div className="h-[600px] bg-gray-200 animate-pulse rounded-lg" />
            ) : (
              <PropertyMap properties={properties} />
            )}
          </FadeInSection>


          {/* Legend */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#C5A572] rounded-full" />
              <span>Proprietà Disponibile</span>
            </div>
            <span className="text-gray-300">|</span>
            <span>{properties.filter(p => p.coordinates?.lat).length} proprietà sulla mappa</span>
          </div>
        </div>
      </section>
    </div>
  );
}

