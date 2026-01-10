'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink, Globe, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export default function BusinessCardLanding() {
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [autoRedirect, setAutoRedirect] = useState(true);

  useEffect(() => {
    // Get the short ID from the URL path
    // Expected format: /c/abc123 or /card/abc123
    const pathParts = window.location.pathname.split('/');
    const shortId = pathParts[pathParts.length - 1];
    
    if (shortId && shortId.length > 0) {
      // Retrieve data from storage using the short ID
      window.storage.get(`card:${shortId}`)
        .then(result => {
          if (result && result.value) {
            const decoded = JSON.parse(result.value);
            setBusinessData(decoded);
            setLoading(false);
          } else {
            setError(true);
            setLoading(false);
          }
        })
        .catch(err => {
          console.error('Error retrieving data:', err);
          setError(true);
          setLoading(false);
        });
    } else {
      // Demo data for preview (when no ID is provided)
      setBusinessData({
        name: 'Demo Business',
        description: 'This is a demo of how your business card will look when scanned.',
        url: 'https://example.com'
      });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!businessData || !autoRedirect || error) return;

    // Always redirect to YOUR website (not the client's)
    const yourWebsite = 'https://bari-kaneno.pro'; // Change this to your actual domain

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = yourWebsite;
    }
  }, [countdown, businessData, autoRedirect, error]);

const handleVisitWebsite = () => {
  const whatsappNumber = '255765762688'; // Your number without the + sign
  const message = encodeURIComponent('Hello, naweza na mimi kupata Smart Business Card ?');
  window.location.href = `https://wa.me/${whatsappNumber}?text=${message}`;
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
            <p className="text-gray-600 text-center text-lg leading-relaxed mb-4">
              {businessData.description}
            </p>

            {/* Client's Website (if they have one) */}
            {businessData.clientUrl && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-8">
                <p className="text-xs text-blue-700 mb-1">Website</p>
                <a 
                  href={businessData.clientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 underline break-all"
                >
                  {businessData.clientUrl}
                </a>
              </div>
            )}

            {!businessData.clientUrl && (
              <p className="text-sm text-gray-400 italic text-center mb-8">
                Want a professional website? See below ↓
              </p>
            )}

            {/* Visit Button - Goes to YOUR website */}
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
                  Redirecting to Smart Business Card in <span className="font-bold text-indigo-600 text-lg">{countdown}</span> seconds...
                </p>
                <button
                  onClick={cancelAutoRedirect}
                  className="text-xs text-gray-400 hover:text-gray-600 underline"
                >
                  Cancel auto-redirect
                </button>
              </div>
            )}

            {/* Footer info */}
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