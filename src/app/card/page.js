'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink, Globe, ArrowRight, Sparkles } from 'lucide-react';

export default function BusinessCardLanding() {
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [autoRedirect, setAutoRedirect] = useState(true);

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');
    
    if (dataParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(dataParam));
        setBusinessData(decoded);
      } catch (error) {
        console.error('Error parsing data:', error);
        setBusinessData({
          name: 'Business Name',
          description: 'Welcome! Click below to visit our website.',
          url: 'https://example.com'
        });
      }
    } else {
      // Demo data for preview
      setBusinessData({
        name: 'Software Business',
        description: 'Its selling software solutions to business',
        url: 'https://bari-kaneno.pro'
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!businessData || !autoRedirect) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = businessData.url;
    }
  }, [countdown, businessData, autoRedirect]);

  const handleVisitWebsite = () => {
    if (businessData) {
      window.location.href = businessData.url;
    }
  };

  const cancelAutoRedirect = () => {
    setAutoRedirect(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 duration-300">
          {/* Header Decoration */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <div className="p-8 md:p-12">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Business Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4 leading-tight">
              {businessData.name}
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-center text-lg leading-relaxed mb-8">
              {businessData.description}
            </p>

            {/* Visit Button */}
            <button
              onClick={handleVisitWebsite}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center group"
            >
              <Globe className="w-6 h-6 mr-3" />
              Visit Our Website
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Auto-redirect notice */}
            {autoRedirect && countdown > 0 && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Auto-redirecting in <span className="font-bold text-indigo-600 text-lg">{countdown}</span> seconds...
                </p>
                <button
                  onClick={cancelAutoRedirect}
                  className="text-xs text-gray-400 hover:text-gray-600 underline"
                >
                  Cancel auto-redirect
                </button>
              </div>
            )}

            {/* Website URL Preview */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center text-sm text-gray-400">
                <ExternalLink className="w-4 h-4 mr-2" />
                <span className="truncate">{businessData.url}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Powered by */}
        <div className="text-center mt-6">
          <p className="text-white text-sm opacity-75">
            Powered by Smart Business Card
          </p>
        </div>
      </div>
    </div>
  );
}