// components/sections/ConsultationCTA.jsx
'use client';

import React from 'react';
import { Calendar, MessageSquare } from 'lucide-react';

const ConsultationCTA = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl mb-8 text-blue-100">
          Book a free 30-minute consultation to discuss your project and get a custom solution roadmap
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Free Consultation
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Start Live Chat
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConsultationCTA;