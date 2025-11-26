import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { MapPin, Bed, Bath, Maximize, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';


export default function PropertyCard({ property, index = 0 }) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);


  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `€${(price / 1000000).toFixed(1)}M`;
    }
    return `€${price?.toLocaleString()}`;
  };


  const mainImage = property.images?.[0] ||
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";


  const styleLabels = {
    villa: "Villa",
    penthouse: "Penthouse",
    castello: "Castello",
    tenuta: "Tenuta",
    appartamento: "Appartamento",
    yacht: "Yacht"
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <Link to={createPageUrl(`PropertyDetail?id=${property.id}`)}>
        <div className="relative overflow-hidden bg-[#2D2D2D]">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <motion.img
              src={mainImage}
              alt={property.title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.7 }}
            />
           
            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-[#2D2D2D] animate-pulse" />
            )}


            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />


            {/* Status Badge */}
            {property.status && property.status !== 'disponibile' && (
              <Badge
                className={`absolute top-4 left-4 ${
                  property.status === 'riservato'
                    ? 'bg-[#C5A572] text-white'
                    : 'bg-red-600 text-white'
                } uppercase tracking-wider text-xs`}
              >
                {property.status}
              </Badge>
            )}


            {/* Featured Badge */}
            {property.featured && (
              <Badge className="absolute top-4 right-14 bg-white/90 text-[#2D2D2D] uppercase tracking-wider text-xs">
                In Evidenza
              </Badge>
            )}


            {/* Like Button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <Heart
                size={18}
                className={`transition-colors ${
                  isLiked ? 'fill-[#C5A572] text-[#C5A572]' : 'text-white'
                }`}
              />
            </motion.button>


            {/* Quick Info - appears on hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500"
            >
              <div className="flex items-center gap-4 text-white/90 text-sm">
                {property.bedrooms && (
                  <span className="flex items-center gap-1">
                    <Bed size={16} />
                    {property.bedrooms}
                  </span>
                )}
                {property.bathrooms && (
                  <span className="flex items-center gap-1">
                    <Bath size={16} />
                    {property.bathrooms}
                  </span>
                )}
                {property.sqm && (
                  <span className="flex items-center gap-1">
                    <Maximize size={16} />
                    {property.sqm} m²
                  </span>
                )}
              </div>
            </motion.div>
          </div>


          {/* Content */}
          <div className="p-6 bg-white">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[#C5A572] text-xs tracking-[0.2em] uppercase">
                {styleLabels[property.style] || property.style}
              </span>
              <span className="text-[#2D2D2D] font-semibold text-lg">
                {formatPrice(property.price)}
              </span>
            </div>


            <h3 className="text-[#2D2D2D] text-xl font-light mb-3 group-hover:text-[#C5A572] transition-colors duration-300">
              {property.title}
            </h3>


            <div className="flex items-center text-gray-500 text-sm">
              <MapPin size={14} className="mr-1 text-[#C5A572]" />
              {property.location}, {property.country}
            </div>
          </div>


          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-[#C5A572]"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

