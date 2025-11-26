import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Grid, List } from 'lucide-react';


import PropertyCard from '@/components/properties/PropertyCard';
import PropertyFilters from '@/components/properties/PropertyFilters';
import { FadeInSection } from '@/components/ui/AnimatedText';
import { Button } from '@/components/ui/button';


export default function Properties() {
  const [filters, setFilters] = useState({
    search: '',
    country: '',
    style: '',
    minPrice: 500000,
    maxPrice: 50000000,
    bedrooms: '',
    status: ''
  });
  const [viewMode, setViewMode] = useState('grid');


  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: () => base44.entities.Property.list('-created_date', 100),
    initialData: [],
  });


  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          property.title?.toLowerCase().includes(searchLower) ||
          property.location?.toLowerCase().includes(searchLower) ||
          property.country?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }


      // Country
      if (filters.country && property.country !== filters.country) return false;


      // Style
      if (filters.style && property.style !== filters.style) return false;


      // Price
      if (property.price < filters.minPrice || property.price > filters.maxPrice) return false;


      // Bedrooms
      if (filters.bedrooms) {
        if (filters.bedrooms === '6+' && property.bedrooms < 6) return false;
        if (filters.bedrooms !== '6+' && property.bedrooms !== filters.bedrooms) return false;
      }


      // Status
      if (filters.status && property.status !== filters.status) return false;


      return true;
    });
  }, [properties, filters]);


  const resetFilters = () => {
    setFilters({
      search: '',
      country: '',
      style: '',
      minPrice: 500000,
      maxPrice: 50000000,
      bedrooms: '',
      status: ''
    });
  };


  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      {/* Hero */}
      <section className="relative py-20 bg-[#2D2D2D]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80)' }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <FadeInSection>
            <div className="text-center">
              <span className="text-[#C5A572] text-sm tracking-[0.3em] uppercase">
                Portfolio Esclusivo
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mt-4 mb-6">
                Le Nostre Proprietà
              </h1>
              <div className="w-24 h-[1px] bg-[#C5A572] mx-auto" />
            </div>
          </FadeInSection>
        </div>
      </section>


      {/* Filters */}
      <PropertyFilters
        filters={filters}
        onFilterChange={setFilters}
        onReset={resetFilters}
      />


      {/* Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              <span className="font-semibold text-[#2D2D2D]">{filteredProperties.length}</span> proprietà trovate
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-[#2D2D2D]' : ''}
              >
                <Grid size={18} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-[#2D2D2D]' : ''}
              >
                <List size={18} />
              </Button>
            </div>
          </div>


          {/* Properties Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200 mb-4" />
                  <div className="h-4 bg-gray-200 w-1/4 mb-2" />
                  <div className="h-6 bg-gray-200 w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }>
              {filteredProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Grid className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl text-gray-700 mb-2">Nessuna proprietà trovata</h3>
              <p className="text-gray-500 mb-6">Prova a modificare i filtri di ricerca</p>
              <Button onClick={resetFilters} variant="outline">
                Reset Filtri
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

