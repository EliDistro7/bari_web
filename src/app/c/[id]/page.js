'use client';
import React, { useState, useEffect } from 'react';
import { ExternalLink, ArrowRight, Sparkles, AlertCircle, Globe, Instagram, MessageCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function BusinessCardLanding() {
  const params = useParams();
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [autoRedirect, setAutoRedirect] = useState(true);

  useEffect(() => {
    // Get the short ID from the URL params
    const shortId = params?.id;
    
    if (shortId && shortId.length > 0) {
      // Fetch data from API route
      fetch(`/api/cards/${shortId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Card not found');
          }
          return response.json();
        })
        .then(data => {
          setBusinessData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error retrieving data:', err);
          setError(true);
          setLoading(false);
        });
    } else {
      // Demo data for preview
      setBusinessData({
        name: 'Demo Business',
        description: 'This is a demo of how your business card will look when scanned.',
        clientUrl: 'https://example.com',
        instagram: 'https://instagram.com/demo',
        whatsapp: '255712345678'
      });
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    if (!businessData || !autoRedirect || error) return;

    // Always redirect to YOUR website
    const yourWebsite = typeof window !== 'undefined' 
      ? window.location.origin 
      : 'http://localhost:3000';

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = yourWebsite;
    }
  }, [countdown, businessData, autoRedirect, error]);

  const handleVisitWebsite = () => {
    const yourWebsite = typeof window !== 'undefined' 
      ? window.location.origin 
      : 'http://localhost:3000';
    window.location.href = yourWebsite;
  };

  const cancelAutoRedirect = () => {
    setAutoRedirect(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg">Loading business card...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Card Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            This business card link is invalid or has expired. Please contact the card owner for a new link.
          </p>
          <div className="text-sm text-gray-400">
            Error: Invalid card ID
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
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
            <p className="text-gray-600 text-center text-lg leading-relaxed mb-6">
              {businessData.description}
            </p>

            {/* Contact Links */}
            {(businessData.clientUrl || businessData.instagram || businessData.whatsapp) && (
              <div className="space-y-3 mb-8">
                <p className="text-sm font-medium text-gray-500 text-center mb-3">Connect with us:</p>
                
                {/* Website */}
                {businessData.clientUrl && (
                  <a
                    href={businessData.clientUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 px-4 rounded-lg transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                    <span className="font-medium">Visit Website</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}

                {/* Instagram */}
                {businessData.instagram && (
                  <a
                    href={businessData.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-pink-700 py-3 px-4 rounded-lg transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="font-medium">Follow on Instagram</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}

                {/* WhatsApp */}
                {businessData.whatsapp && (
                  <a
                    href={`https://wa.me/${businessData.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-green-50 hover:bg-green-100 text-green-700 py-3 px-4 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">Chat on WhatsApp</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}
              </div>
            )}

            {/* CTA Message */}
            {!businessData.clientUrl && !businessData.instagram && !businessData.whatsapp && (
              <p className="text-sm text-gray-400 italic text-center mb-6">
                Want a professional online presence? See below ↓
              </p>
            )}

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Want your own card?</span>
              </div>
            </div>

            {/* Get Your Card Button */}
            <button
              onClick={handleVisitWebsite}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center group"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Get Your Smart Business Card
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Auto-redirect notice */}
            {autoRedirect && countdown > 0 && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Auto-redirecting in <span className="font-bold text-indigo-600 text-lg">{countdown}</span> seconds
                </p>
                <button
                  onClick={cancelAutoRedirect}
                  className="text-xs text-gray-400 hover:text-gray-600 underline"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-center text-gray-500">
                This card was created with Smart Business Card
              </p>
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