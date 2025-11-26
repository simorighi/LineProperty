import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, MapPin, Bed, Bath, Maximize,
  Home, Heart, Share2, Calendar, X, Check, ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ContactForm from '@/components/contact/ContactForm';
import { FadeInSection } from '@/components/ui/AnimatedText';


export default function PropertyDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get('id');
 
  const [currentImage, setCurrentImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);


  const { data: property, isLoading } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: async () => {
      const properties = await base44.entities.Property.filter({ id: propertyId });
      return properties[0];
    },
    enabled: !!propertyId,
  });


  const { data: allProperties } = useQuery({
    queryKey: ['properties'],
    queryFn: () => base44.entities.Property.list('-created_date', 50),
    initialData: [],
  });


  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F1EB] pt-32">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-[60vh] bg-gray-200 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 bg-gray-200 w-1/4" />
                <div className="h-12 bg-gray-200 w-3/4" />
                <div className="h-4 bg-gray-200 w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  if (!property) {
    return (
      <div className="min-h-screen bg-[#f8f7f4] pt-32 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-700 mb-4">Proprietà non trovata</h2>
          <Link to={createPageUrl("Properties")}>
            <Button>Torna alle Proprietà</Button>
          </Link>
        </div>
      </div>
    );
  }


  const images = property.images?.length > 0
    ? property.images
    : [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
      ];


  const formatPrice = (price) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };


  const styleLabels = {
    villa: "Villa",
    penthouse: "Penthouse",
    castello: "Castello",
    tenuta: "Tenuta",
    appartamento: "Appartamento",
    yacht: "Yacht"
  };


  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);


  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link to={createPageUrl("Properties")}>
          <Button variant="ghost" className="gap-2">
            <ArrowLeft size={18} />
            Torna alle Proprietà
          </Button>
        </Link>
      </div>


      {/* Image Gallery */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 h-[60vh]">
          {/* Main Image */}
          <motion.div
            className="lg:col-span-3 relative cursor-pointer overflow-hidden"
            onClick={() => setIsGalleryOpen(true)}
          >
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt={property.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
           
            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>


            {/* Image count */}
            <div className="absolute bottom-4 left-4 px-4 py-2 bg-black/50 text-white text-sm">
              {currentImage + 1} / {images.length}
            </div>
          </motion.div>


          {/* Thumbnails */}
          <div className="hidden lg:grid grid-rows-3 gap-2">
            {images.slice(0, 3).map((img, idx) => (
              <motion.div
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`relative cursor-pointer overflow-hidden ${
                  currentImage === idx ? 'ring-2 ring-[#C9A55C]' : ''
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
                {idx === 2 && images.length > 3 && (
                  <div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); setIsGalleryOpen(true); }}
                  >
                    +{images.length - 3} foto
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <FadeInSection>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-[#C5A572] text-sm tracking-[0.2em] uppercase">
                      {styleLabels[property.style] || property.style}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-light text-[#2D2D2D] mt-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-gray-500 mt-3">
                      <MapPin size={16} className="text-[#C5A572] mr-2" />
                      {property.location}, {property.country}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={isLiked ? 'fill-red-500 text-red-500' : ''} size={18} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 size={18} />
                    </Button>
                  </div>
                </div>
              </FadeInSection>


              {/* Price */}
              <FadeInSection delay={0.1}>
                <div className="bg-[#F5F1EB] p-6 mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-500 text-sm">Prezzo</span>
                      <div className="text-3xl font-semibold text-[#2D2D2D]">
                        {formatPrice(property.price)}
                      </div>
                    </div>
                    {property.status && (
                      <Badge className={`text-sm px-4 py-2 ${
                        property.status === 'disponibile'
                          ? 'bg-green-100 text-green-800'
                          : property.status === 'riservato'
                            ? 'bg-[#C5A572] text-white'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </Badge>
                    )}
                  </div>
                </div>
              </FadeInSection>


              {/* Key Features */}
              <FadeInSection delay={0.2}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {property.bedrooms && (
                    <div className="text-center p-4 border border-gray-200">
                      <Bed className="w-6 h-6 text-[#C5A572] mx-auto mb-2" />
                      <div className="text-xl font-semibold text-[#2D2D2D]">{property.bedrooms}</div>
                      <div className="text-sm text-gray-500">Camere</div>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="text-center p-4 border border-gray-200">
                      <Bath className="w-6 h-6 text-[#C5A572] mx-auto mb-2" />
                      <div className="text-xl font-semibold text-[#2D2D2D]">{property.bathrooms}</div>
                      <div className="text-sm text-gray-500">Bagni</div>
                    </div>
                  )}
                  {property.sqm && (
                    <div className="text-center p-4 border border-gray-200">
                      <Maximize className="w-6 h-6 text-[#C5A572] mx-auto mb-2" />
                      <div className="text-xl font-semibold text-[#2D2D2D]">{property.sqm}</div>
                      <div className="text-sm text-gray-500">m²</div>
                    </div>
                  )}
                  <div className="text-center p-4 border border-gray-200">
                    <Home className="w-6 h-6 text-[#C5A572] mx-auto mb-2" />
                    <div className="text-xl font-semibold text-[#2D2D2D] capitalize">
                      {styleLabels[property.style] || property.style}
                    </div>
                    <div className="text-sm text-gray-500">Tipologia</div>
                  </div>
                </div>
              </FadeInSection>


              {/* Description */}
              {property.description && (
                <FadeInSection delay={0.3}>
                  <div className="mb-8">
                    <h2 className="text-2xl font-light text-[#2D2D2D] mb-4">Descrizione</h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {property.description}
                    </p>
                  </div>
                </FadeInSection>
              )}


              {/* Features */}
              {property.features?.length > 0 && (
                <FadeInSection delay={0.4}>
                  <div className="mb-8">
                    <h2 className="text-2xl font-light text-[#2D2D2D] mb-4">Caratteristiche</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-600">
                          <Check className="w-5 h-5 text-[#C5A572]" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInSection>
              )}
            </div>


            {/* Sidebar */}
            <div>
              <FadeInSection delay={0.2}>
                <div className="sticky top-32 bg-[#F5F1EB] p-8">
                  <h3 className="text-xl font-light text-[#2D2D2D] mb-6">
                    Richiedi Informazioni
                  </h3>
                  <ContactForm
                    properties={allProperties}
                    preselectedProperty={propertyId}
                  />
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>


      {/* Full Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-6 right-6 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={32} />
            </button>


            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft size={40} />
            </button>


            <img
              src={images[currentImage]}
              alt=""
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />


            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronRight size={40} />
            </button>


            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentImage ? 'bg-[#C5A572] w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

