import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bed, Bath, Maximize, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


const goldIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C9A55C" width="32" height="32">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});


export default function PropertyMap({ properties }) {
  const [selectedProperty, setSelectedProperty] = useState(null);


  const validProperties = properties?.filter(p =>
    p.coordinates?.lat && p.coordinates?.lng
  ) || [];


  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `€${(price / 1000000).toFixed(1)}M`;
    }
    return `€${price?.toLocaleString()}`;
  };


  const defaultCenter = [45.4642, 9.19]; // Milan


  return (
    <div className="relative h-[600px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {validProperties.map((property) => (
          <Marker
            key={property.id}
            position={[property.coordinates.lat, property.coordinates.lng]}
            icon={goldIcon}
            eventHandlers={{
              click: () => setSelectedProperty(property),
            }}
          >
            <Popup>
              <div className="font-sans">
                <strong>{property.title}</strong>
                <br />
                {formatPrice(property.price)}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>


      {/* Property Detail Card */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-80 bg-white shadow-2xl rounded-lg overflow-hidden z-[1000]"
          >
            <div className="relative">
              <img
                src={selectedProperty.images?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80"}
                alt={selectedProperty.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-2 left-2 px-3 py-1 bg-[#C9A55C] text-white text-sm font-medium">
                {formatPrice(selectedProperty.price)}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-[#1a1a2e] mb-2">
                {selectedProperty.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                {selectedProperty.location}, {selectedProperty.country}
              </p>
              <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                {selectedProperty.bedrooms && (
                  <span className="flex items-center gap-1">
                    <Bed size={14} />
                    {selectedProperty.bedrooms}
                  </span>
                )}
                {selectedProperty.bathrooms && (
                  <span className="flex items-center gap-1">
                    <Bath size={14} />
                    {selectedProperty.bathrooms}
                  </span>
                )}
                {selectedProperty.sqm && (
                  <span className="flex items-center gap-1">
                    <Maximize size={14} />
                    {selectedProperty.sqm} m²
                  </span>
                )}
              </div>
              <Link to={createPageUrl(`PropertyDetail?id=${selectedProperty.id}`)}>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-[#1a1a2e] text-white text-sm hover:bg-[#2a2a3e] transition-colors"
                >
                  Vedi Dettagli
                  <ArrowRight size={14} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

