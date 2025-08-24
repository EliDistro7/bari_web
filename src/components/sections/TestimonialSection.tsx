// Testimonials Section Component
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Code, 
  Users, 
  Zap, 
  ExternalLink, 
  Github, 
  CheckCircle, 
  Clock, 
  DollarSign,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Star,
  Briefcase,
  Award,
  Target
} from 'lucide-react';



function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Club Manager',
      company: 'Riverside Sports Club',
      content: 'The management system transformed our operations. We save 15 hours weekly on admin tasks.',
      rating: 5,
      image: '👩‍💼'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Pastor',
      company: 'Grace Community Church',
      content: 'Excellent communication platform. Our member engagement increased by 40%.',
      rating: 5,
      image: '👨‍💼'
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      role: 'Business Owner',
      company: 'Rodriguez Consulting',
      content: 'The accounting app automated 90% of our bookkeeping. Highly recommended!',
      rating: 5,
      image: '👩‍💻'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            What my clients say about working with me
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="text-3xl">{testimonial.image}</div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                  <div className="text-sm text-blue-600">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}