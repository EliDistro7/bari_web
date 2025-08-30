import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import { useLanguage } from '@/context/language';

type Language = 'en' | 'sw';

type Translation = {
  title: string;
  location: string;
  address: string;
  viewFullscreen: string;
  openInMaps: string;
  directions: string;
  coordinates: string;
  interactive: string;
  interactiveDesc: string;
  embedded: string;
  embeddedDesc: string;
  navigation: string;
  navigationDesc: string;
};

const MapEmbed: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { language } = useLanguage();

  const translations: Record<Language, Translation> = {
    en: {
      title: "My Location",
      location: "Yombo Kwa Limboa, Dar es Salaam, Tanzania",
      address: "Yombo Kwa Limboa, Dar es Salaam, Tanzania",
      viewFullscreen: "View Fullscreen",
      openInMaps: "Open in Google Maps",
      directions: "Get Directions",
      coordinates: "Coordinates",
      interactive: "Interactive Map",
      interactiveDesc: "Zoom, pan, and explore the area with satellite and street views",
      embedded: "Embedded Experience",
      embeddedDesc: "Direct Google Maps integration with all native features",
      navigation: "Easy Navigation",
      navigationDesc: "Get directions and explore nearby landmarks and services"
    },
    sw: {
      title: "Mahali Nilipo",
      location: "Yombo Kwa Limboa, Dar es Salaam, Tanzania",
      address: "Yombo Kwa Limboa, Dar es Salaam, Tanzania",
      viewFullscreen: "Ona Skrini Kamili",
      openInMaps: "Fungua katika Ramani za Google",
      directions: "Pata Maelekezo",
      coordinates: "Kuratibu",
      interactive: "Ramani ya Mwingiliano",
      interactiveDesc: "Kuza, sukuma, na uchunguze eneo kwa satelaiti na mitazamo ya barabara",
      embedded: "Uzoefu wa Kuingizwa",
      embeddedDesc: "Muunganisho wa moja kwa moja wa Ramani za Google na vipengele vyote vya asili",
      navigation: "Urambazaji Rahisi",
      navigationDesc: "Pata maelekezo na uchunguze alama za karibu na huduma"
    }
  };

  const t = translations[language as Language];

  // Updated coordinates for the church location near Future Holders Company Limited
  const coordinates = {
    lat: -6.8708918,
    lng: 39.232508
  };

  // Updated Google Maps embed URL for the church location
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.288!2d39.232508!3d-6.8708918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c372b8ffb7b03%3A0xfa1a24c8e9653812!2sFUTURE%20HOLDERS%20COMPANY%20LIMITED!5e0!3m2!1ssw!2stz!4v1732767341144!5m2!1ssw!2stz";

  const openInGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`, '_blank');
  };

  const getDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`, '_blank');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };



  return (
    <>
      <style jsx>{`
        .glass-container {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(102, 126, 234, 0.2);
        }
        
        .glass-header {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(168, 85, 247, 0.2));
          backdrop-filter: blur(15px);
          border-bottom: 1px solid rgba(102, 126, 234, 0.3);
        }
        
        .gradient-title {
          background: linear-gradient(135deg, #67e8f9 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .pulse-dot {
          animation: pulseDot 2s ease-in-out infinite;
        }
        
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        .map-button {
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(102, 126, 234, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .map-button:hover {
          background: rgba(30, 41, 59, 0.9);
          border-color: rgba(102, 126, 234, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
        }
        
        .feature-card {
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(102, 126, 234, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .feature-card:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(102, 126, 234, 0.4);
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.15);
        }
        
        .icon-glow {
          filter: drop-shadow(0 0 8px rgba(102, 126, 234, 0.4));
        }
        
        .location-pin {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          pointer-events: none;
          animation: bounce 2s ease-in-out infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
        
        .map-container {
          position: relative;
          overflow: hidden;
          border-radius: 0 0 1rem 1rem;
        }
        
        .fullscreen-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .coordinates-display {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(168, 85, 247, 0.1));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(102, 126, 234, 0.3);
        }
        
        .map-iframe {
          transition: all 0.3s ease;
        }
        
        .map-overlay {
          background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(168, 85, 247, 0.1));
          backdrop-filter: blur(5px);
        }
        
        .language-toggle {
          background: rgba(30, 41, 59, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(102, 126, 234, 0.4);
          color: #67e8f9;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .language-toggle:hover {
          background: rgba(102, 126, 234, 0.2);
          border-color: rgba(102, 126, 234, 0.6);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
      `}</style>

      <div id='location' className="w-full mx-0 p-0">
        {/* Header Section */}
        <div className="glass-container overflow-hidden relative">
          {/* Background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full pulse-dot"></div>
            <div className="absolute top-8 right-1/3 w-0.5 h-0.5 bg-purple-400 rounded-full pulse-dot" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-6 left-2/3 w-1.5 h-1.5 bg-pink-400 rounded-full pulse-dot" style={{animationDelay: '2s'}}></div>
          </div>

          {/* Header */}
          <div className="glass-header p-6 relative z-10">
            <div className="text-center">
              <div className="flex items-center justify-between mb-4">
                <div></div>
                <h2 className="text-3xl font-black gradient-title flex items-center gap-3">
                  <MapPin className="text-pink-400 icon-glow" size={32} />
                  {t.title}
                </h2>
               
              </div>
              <p className="text-gray-300 text-xl mb-2">{t.location}</p>
              <div className="coordinates-display inline-block px-4 py-2 rounded-lg">
                <p className="text-gray-400 text-sm">
                  {t.coordinates}: {coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}
                </p>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="map-container relative">
            <div className="aspect-video relative">
              <iframe
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-iframe border-0 min-h-screen"
                title={`Map of ${t.location}`}
              ></iframe>
              
              {/* Animated Location Pin Overlay */}
              <div className="location-pin">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500 rounded-full w-6 h-6 opacity-30 animate-ping"></div>
                  <MapPin className="text-red-500 w-10 h-10 relative z-10" fill="currentColor" />
                </div>
              </div>

              {/* Map Controls Overlay */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="map-button p-2 text-white rounded-lg shadow-lg"
                  title={t.viewFullscreen}
                >
                  <Maximize2 size={18} />
                </button>
                <button
                  onClick={openInGoogleMaps}
                  className="map-button p-2 text-white rounded-lg shadow-lg"
                  title={t.openInMaps}
                >
                  <ExternalLink size={18} />
                </button>
                <button
                  onClick={getDirections}
                  className="map-button p-2 text-white rounded-lg shadow-lg"
                  title={t.directions}
                >
                  <Navigation size={18} />
                </button>
              </div>

              {/* Address Overlay */}
              <div className="absolute bottom-4 left-4 map-overlay p-3 rounded-lg max-w-xs">
                <p className="text-white text-sm font-medium">{t.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fullscreen Modal */}
        {isFullscreen && (
          <div className="fullscreen-overlay" onClick={toggleFullscreen}>
            <div className="relative w-full h-full max-w-6xl max-h-4xl">
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 z-20 map-button p-3 text-white rounded-lg shadow-lg"
              >
                <Minimize2 size={24} />
              </button>
              <iframe
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl border-0"
                title={`Fullscreen Map of ${t.location}`}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MapEmbed;