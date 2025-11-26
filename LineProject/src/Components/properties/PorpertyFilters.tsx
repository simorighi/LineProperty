import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, MapPin, Home, Euro } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';


const countries = [
  "Italia", "Francia", "Spagna", "Svizzera", "Monaco",
  "Grecia", "Portogallo", "UK", "USA", "Dubai"
];


const styles = [
  { value: "villa", label: "Villa" },
  { value: "penthouse", label: "Penthouse" },
  { value: "castello", label: "Castello" },
  { value: "tenuta", label: "Tenuta" },
  { value: "appartamento", label: "Appartamento" },
  { value: "yacht", label: "Yacht" },
];


export default function PropertyFilters({ filters, onFilterChange, onReset }) {
  const [isExpanded, setIsExpanded] = useState(false);


  const formatPrice = (value) => {
    if (value >= 1000000) {
      return `€${(value / 1000000).toFixed(1)}M`;
    }
    return `€${(value / 1000).toFixed(0)}K`;
  };


  return (
    <div className="bg-white shadow-lg">
      {/* Main Filter Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Cerca per nome, località..."
              className="pl-12 h-14 border-gray-200 focus:border-[#C9A55C] text-base"
              value={filters.search || ''}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            />
          </div>


          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <Select
              value={filters.country || 'all'}
              onValueChange={(value) => onFilterChange({ ...filters, country: value === 'all' ? '' : value })}
            >
              <SelectTrigger className="w-[160px] h-14 border-gray-200">
                <MapPin size={16} className="mr-2 text-[#C9A55C]" />
                <SelectValue placeholder="Paese" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i Paesi</SelectItem>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>


            <Select
              value={filters.style || 'all'}
              onValueChange={(value) => onFilterChange({ ...filters, style: value === 'all' ? '' : value })}
            >
              <SelectTrigger className="w-[160px] h-14 border-gray-200">
                <Home size={16} className="mr-2 text-[#C9A55C]" />
                <SelectValue placeholder="Tipologia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte le Tipologie</SelectItem>
                {styles.map(style => (
                  <SelectItem key={style.value} value={style.value}>{style.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>


            <Button
              variant="outline"
              className={`h-14 px-6 border-gray-200 ${isExpanded ? 'bg-[#1a1a2e] text-white' : ''}`}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <SlidersHorizontal size={18} className="mr-2" />
              Filtri Avanzati
            </Button>


            {(filters.search || filters.country || filters.style || filters.minPrice || filters.maxPrice) && (
              <Button
                variant="ghost"
                className="h-14 text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={onReset}
              >
                <X size={18} className="mr-2" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>


      {/* Expanded Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gray-100"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Price Range */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    <Euro size={16} className="inline mr-2 text-[#C9A55C]" />
                    Range di Prezzo
                  </label>
                  <div className="px-2">
                    <Slider
                      defaultValue={[filters.minPrice || 500000, filters.maxPrice || 50000000]}
                      max={50000000}
                      min={500000}
                      step={500000}
                      onValueChange={(value) => onFilterChange({
                        ...filters,
                        minPrice: value[0],
                        maxPrice: value[1]
                      })}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatPrice(filters.minPrice || 500000)}</span>
                      <span>{formatPrice(filters.maxPrice || 50000000)}</span>
                    </div>
                  </div>
                </div>


                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Camere da letto
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, '6+'].map((num) => (
                      <button
                        key={num}
                        onClick={() => onFilterChange({
                          ...filters,
                          bedrooms: filters.bedrooms === num ? '' : num
                        })}
                        className={`w-10 h-10 rounded-full border transition-all ${
                          filters.bedrooms === num
                            ? 'bg-[#C9A55C] border-[#C9A55C] text-white'
                            : 'border-gray-200 hover:border-[#C9A55C]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>


                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Stato
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['disponibile', 'riservato'].map((status) => (
                      <button
                        key={status}
                        onClick={() => onFilterChange({
                          ...filters,
                          status: filters.status === status ? '' : status
                        })}
                        className={`px-4 py-2 rounded-full border text-sm transition-all capitalize ${
                          filters.status === status
                            ? 'bg-[#1a1a2e] border-[#1a1a2e] text-white'
                            : 'border-gray-200 hover:border-[#1a1a2e]'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

