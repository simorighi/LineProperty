import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';


import HeroSection from '@/components/home/HeroSection';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import AboutPreview from '@/components/home/AboutPreview';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactCTA from '@/components/home/ContactCTA';


export default function Home() {
  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: () => base44.entities.Property.list('-created_date', 50),
    initialData: [],
  });


  return (
    <div className="overflow-hidden">
      <HeroSection />
      <FeaturedProperties properties={properties} isLoading={isLoading} />
      <AboutPreview />
      <ServicesSection />
      <TestimonialsSection />
      <ContactCTA />
    </div>
  );
}

