import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PropertyCard from '../properties/PropertyCard';
import { FadeInSection } from '../ui/AnimatedText';


export default function FeaturedProperties({ properties, isLoading }) {
  const featuredProperties = properties?.filter(p => p.featured)?.slice(0, 6) || [];


  if (isLoading) {
    return (
      <section className="py-24 bg-[#F5F1EB]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }


  return (
    <section className="py-24 bg-[#F5F1EB]">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="text-[#C5A572] text-sm tracking-[0.3em] uppercase">
              Collezione Esclusiva
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-[#2D2D2D] mt-4 mb-6">
              Proprietà in Evidenza
            </h2>
            <div className="w-24 h-[1px] bg-[#C5A572] mx-auto" />
          </div>
        </FadeInSection>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>


        <FadeInSection delay={0.4}>
          <div className="text-center mt-16">
            <Link to={createPageUrl("Properties")}>
              <motion.button
                whileHover={{ x: 5 }}
                className="inline-flex items-center gap-3 text-[#2D2D2D] text-sm tracking-[0.2em] uppercase font-medium group"
              >
                Scopri Tutte le Proprietà
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

