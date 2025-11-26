import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


export default function ContactForm({ properties = [], preselectedProperty = null }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property_interest: preselectedProperty || '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
   
    await base44.entities.ContactRequest.create(formData);
   
    setIsSubmitting(false);
    setIsSubmitted(true);
  };


  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>
        <h3 className="text-2xl font-light text-[#2D2D2D] mb-4">
          Richiesta Inviata con Successo
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Grazie per averci contattato. Un nostro consulente ti risponderà
          entro 24 ore.
        </p>
      </motion.div>
    );
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div className="relative">
        <motion.label
          initial={false}
          animate={{
            y: focusedField === 'name' || formData.name ? -24 : 0,
            scale: focusedField === 'name' || formData.name ? 0.85 : 1,
            color: focusedField === 'name' ? '#C5A572' : '#6b7280'
          }}
          className="absolute left-0 text-gray-500 pointer-events-none origin-left transition-all"
        >
          Nome Completo *
        </motion.label>
        <Input
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          className="border-0 border-b-2 border-gray-200 rounded-none px-0 pt-6 pb-2 focus:border-[#C5A572] focus:ring-0 bg-transparent"
        />
      </div>


      {/* Email Field */}
      <div className="relative">
        <motion.label
          initial={false}
          animate={{
            y: focusedField === 'email' || formData.email ? -24 : 0,
            scale: focusedField === 'email' || formData.email ? 0.85 : 1,
            color: focusedField === 'email' ? '#C5A572' : '#6b7280'
          }}
          className="absolute left-0 text-gray-500 pointer-events-none origin-left transition-all"
        >
          Email *
        </motion.label>
        <Input
          required
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          className="border-0 border-b-2 border-gray-200 rounded-none px-0 pt-6 pb-2 focus:border-[#C5A572] focus:ring-0 bg-transparent"
        />
      </div>


      {/* Phone Field */}
      <div className="relative">
        <motion.label
          initial={false}
          animate={{
            y: focusedField === 'phone' || formData.phone ? -24 : 0,
            scale: focusedField === 'phone' || formData.phone ? 0.85 : 1,
            color: focusedField === 'phone' ? '#C5A572' : '#6b7280'
          }}
          className="absolute left-0 text-gray-500 pointer-events-none origin-left transition-all"
        >
          Telefono
        </motion.label>
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          onFocus={() => setFocusedField('phone')}
          onBlur={() => setFocusedField(null)}
          className="border-0 border-b-2 border-gray-200 rounded-none px-0 pt-6 pb-2 focus:border-[#C5A572] focus:ring-0 bg-transparent"
        />
      </div>


      {/* Property Interest */}
      {properties.length > 0 && (
        <div>
          <label className="block text-sm text-gray-500 mb-2">
            Proprietà di Interesse
          </label>
          <Select
            value={formData.property_interest}
            onValueChange={(value) => setFormData({ ...formData, property_interest: value })}
          >
            <SelectTrigger className="border-gray-200 focus:ring-[#C5A572] focus:border-[#C5A572]">
              <SelectValue placeholder="Seleziona una proprietà" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">Richiesta Generale</SelectItem>
              {properties.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.title} - {property.location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}


      {/* Message Field */}
      <div className="relative">
        <motion.label
          initial={false}
          animate={{
            y: focusedField === 'message' || formData.message ? -24 : 0,
            scale: focusedField === 'message' || formData.message ? 0.85 : 1,
            color: focusedField === 'message' ? '#C5A572' : '#6b7280'
          }}
          className="absolute left-0 text-gray-500 pointer-events-none origin-left transition-all z-10"
        >
          Messaggio *
        </motion.label>
        <Textarea
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          rows={4}
          className="border-0 border-b-2 border-gray-200 rounded-none px-0 pt-6 pb-2 focus:border-[#C9A55C] focus:ring-0 bg-transparent resize-none"
        />
      </div>


      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-[#C5A572] hover:bg-[#B8955F] text-white text-sm tracking-[0.2em] uppercase font-medium"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Invia Richiesta
            </>
          )}
        </Button>
      </motion.div>


      <p className="text-sm text-gray-500 text-center">
        I campi contrassegnati con * sono obbligatori
      </p>
    </form>
  );
}

