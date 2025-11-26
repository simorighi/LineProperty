import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin } from 'lucide-react';


export default function TeamCard({ member, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative overflow-hidden">
        {/* Image */}
        <div className="aspect-[3/4] overflow-hidden bg-gray-100">
          <motion.img
            src={member.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"}
            alt={member.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
        </div>


        {/* Overlay with contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/90 via-[#1a1a2e]/50 to-transparent flex flex-col justify-end p-6"
        >
          <div className="space-y-3">
            {member.email && (
              <motion.a
                href={`mailto:${member.email}`}
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                className="flex items-center gap-3 text-white/90 hover:text-[#C9A55C] transition-colors"
              >
                <Mail size={16} />
                <span className="text-sm">{member.email}</span>
              </motion.a>
            )}
            {member.phone && (
              <motion.a
                href={`tel:${member.phone}`}
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 text-white/90 hover:text-[#C9A55C] transition-colors"
              >
                <Phone size={16} />
                <span className="text-sm">{member.phone}</span>
              </motion.a>
            )}
          </div>
        </motion.div>


        {/* Gold accent */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-[#C9A55C]"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4 }}
        />
      </div>


      {/* Info */}
      <div className="pt-6 text-center">
        <h3 className="text-xl font-light text-[#1a1a2e] group-hover:text-[#C9A55C] transition-colors">
          {member.name}
        </h3>
        <p className="text-[#C9A55C] text-sm tracking-[0.15em] uppercase mt-1">
          {member.role}
        </p>
        {member.bio && (
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">
            {member.bio}
          </p>
        )}
      </div>
    </motion.div>
  );
}

