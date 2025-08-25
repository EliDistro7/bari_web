import React from 'react';
import { useLanguage } from '@/context/language';

const PartnersBanner = () => {
  const { language } = useLanguage();

  // Define supported language types
  type SupportedLanguage = 'en' | 'sw';

  // Translation object
  const translations: Record<SupportedLanguage, {
    trustedPartners: string;
    powering: string;
    innovation: string;
    subtitle: string;
    transform: string;
    activeClients: string;
    industries: string;
    retention: string;
    support: string;
    readyToJoin: string;
    innovativeCompanies: string;
    startPartnership: string;
  }> = {
    en: {
      trustedPartners: "Trusted Partners",
      powering: "POWERING",
      innovation: "INNOVATION",
      subtitle: "Collaborating with forward-thinking companies to",
      transform: "transform their digital presence",
      activeClients: "Active Clients",
      industries: "Industries",
      retention: "Retention",
      support: "Support",
      readyToJoin: "Ready to join these",
      innovativeCompanies: "innovative companies",
      startPartnership: "Start Your Partnership"
    },
    sw: {
      trustedPartners: "Washirika Wetu wa Kuaminiwa",
      powering: "TUNAONGOZA",
      innovation: "UBUNIFU",
      subtitle: "Kushirikiana na makampuni yenye maono ya mbele ili",
      transform: "kubadilisha uwepo wao wa kidijitali",
      activeClients: "Wateja Hai",
      industries: "Sekta",
      retention: "Uhifadhi",
      support: "Msaada",
      readyToJoin: "Je, uko tayari kujiunga na",
      innovativeCompanies: "makampuni haya ya ubunifu",
      startPartnership: "Anza Ushirikiano"
    }
  };

  const t = translations[(language as SupportedLanguage)] || translations.sw;

  // Real partners data
  const partners = [
    { 
      id: 1, 
      name: "Amka Kijana Foundation", 
      logo: "AK", 
      industry: language === 'en' ? "Healthcare" : "Afya",
      description: language === 'en' ? "Reproductive health and mental health education for youth" : "Elimu ya afya ya uzazi na akili kwa vijana"
    },
    { 
      id: 2, 
      name: "KKKT Church Yombo", 
      logo: "KY", 
      industry: language === 'en' ? "Religious" : "Kidini",
      description: language === 'en' ? "Lutheran Church in Dar es Salaam" : "Kanisa la Kilutheri Dar es Salaam"
    },
    { 
      id: 3, 
      name: "Ubuntu O House", 
      logo: "UO", 
      industry: language === 'en' ? "Technology" : "Teknolojia",
      description: language === 'en' ? "Technology company in Dar es Salaam" : "Kampuni ya teknolojia Dar es Salaam"
    },
    { 
      id: 4, 
      name: "LubeJunction", 
      logo: "LJ", 
      industry: language === 'en' ? "Automotive" : "Magari",
      description: language === 'en' ? "Lubricants for machines and automobiles" : "Mafuta ya mitambo na magari"
    },
    { 
      id: 5, 
      name: "Raha Energise", 
      logo: "RE", 
      industry: language === 'en' ? "Industrial" : "Viwandani",
      description: language === 'en' ? "Lubricants for machines" : "Mafuta ya mitambo"
    },
    { 
      id: 6, 
      name: "Future Holders Company", 
      logo: "FH", 
      industry: language === 'en' ? "Marketing" : "Masoko",
      description: language === 'en' ? "Marketing company in Dar es Salaam" : "Kampuni ya uuzaji Dar es Salaam"
    },
    { 
      id: 7, 
      name: "Fourfreyn Company", 
      logo: "FF", 
      industry: language === 'en' ? "Agriculture" : "Kilimo",
      description: language === 'en' ? "Agriculture implements in Dar es Salaam" : "Vifaa vya kilimo Dar es Salaam"
    },
  ];

  return (
    <>
      <style jsx>{`
        .marquee-row {
          animation: marqueeLeft 30s linear infinite;
        }
        
        .marquee-row-reverse {
          animation: marqueeRight 35s linear infinite;
        }
        
        .marquee-row:hover,
        .marquee-row-reverse:hover {
          animation-play-state: paused;
        }
        
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        @media (max-width: 768px) {
          .marquee-row {
            animation: marqueeLeft 40s linear infinite;
          }
          
          .marquee-row-reverse {
            animation: marqueeRight 45s linear infinite;
          }
        }
        
        .partner-card-3d {
          transform-style: preserve-3d;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }
        
        .partner-card-3d:hover {
          transform: translateY(-8px) rotateY(6deg) rotateX(3deg);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.25),
            0 0 25px rgba(102, 126, 234, 0.3),
            0 0 40px rgba(118, 75, 162, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          border-color: rgba(102, 126, 234, 0.4);
          background: rgba(255, 255, 255, 0.12);
        }
        
        @media (max-width: 768px) {
          .partner-card-3d:hover {
            transform: translateY(-4px) rotateY(3deg) rotateX(2deg);
            box-shadow: 
              0 12px 24px rgba(0, 0, 0, 0.2),
              0 0 20px rgba(102, 126, 234, 0.25),
              inset 0 1px 0 rgba(255, 255, 255, 0.15);
          }
        }
        
        .logo-gradient-3d {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          box-shadow: 
            0 6px 12px rgba(102, 126, 234, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.25),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
        }
        
        .bg-mesh-dark {
          background-image: 
            radial-gradient(circle at 25% 25%, #667eea 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, #764ba2 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, #f093fb 0%, transparent 50%);
        }
        
        .floating-3d {
          animation: float3d 6s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        
        @keyframes float3d {
          0%, 100% { 
            transform: translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg); 
          }
          25% { 
            transform: translateY(-10px) translateZ(15px) rotateX(6deg) rotateY(8deg); 
          }
          50% { 
            transform: translateY(-15px) translateZ(8px) rotateX(-3deg) rotateY(-6deg); 
          }
          75% { 
            transform: translateY(-8px) translateZ(20px) rotateX(8deg) rotateY(4deg); 
          }
        }
        
        @media (max-width: 768px) {
          .floating-3d {
            animation: float3d-mobile 4s ease-in-out infinite;
          }
          
          @keyframes float3d-mobile {
            0%, 100% { 
              transform: translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg); 
            }
            25% { 
              transform: translateY(-6px) translateZ(8px) rotateX(3deg) rotateY(4deg); 
            }
            50% { 
              transform: translateY(-8px) translateZ(5px) rotateX(-2deg) rotateY(-3deg); 
            }
            75% { 
              transform: translateY(-4px) translateZ(10px) rotateX(4deg) rotateY(2deg); 
            }
          }
        }
        
        .pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
            opacity: 1;
          }
          50% { 
            box-shadow: 0 0 40px rgba(118, 75, 162, 0.5);
            opacity: 0.8;
          }
        }
        
        .neon-text {
          text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
        }
        
        .glass-stat {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .glass-stat:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-4px);
          box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .scrolling-container {
          overflow: hidden;
          mask-image: linear-gradient(
            to right, 
            transparent 0%, 
            black 5%, 
            black 95%, 
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right, 
            transparent 0%, 
            black 5%, 
            black 95%, 
            transparent 100%
          );
        }
        
        @media (max-width: 768px) {
          .scrolling-container {
            mask-image: linear-gradient(
              to right, 
              transparent 0%, 
              black 3%, 
              black 97%, 
              transparent 100%
            );
            -webkit-mask-image: linear-gradient(
              to right, 
              transparent 0%, 
              black 3%, 
              black 97%, 
              transparent 100%
            );
          }
        }
      `}</style>

      <section className="relative py-24 overflow-hidden">
        {/* 3D Background Grid */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid3d" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="url(#gridGradient)" strokeWidth="1" opacity="0.3"/>
              </pattern>
              <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
                <stop offset="50%" style={{stopColor: '#764ba2', stopOpacity: 0.8}} />
                <stop offset="100%" style={{stopColor: '#f093fb', stopOpacity: 0.6}} />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid3d)" transform="perspective(1000px) rotateX(60deg)" />
          </svg>
        </div>
        
        {/* 3D Geometric Shapes */}
        <div className="absolute inset-0">
          {/* Large 3D Cubes */}
          <div className="absolute top-20 left-10 w-32 h-32 opacity-10 floating-3d" style={{animationDelay: '0s'}}>
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 transform rotate-45 rounded-lg shadow-2xl" 
                 style={{transform: 'rotateX(45deg) rotateY(45deg) rotateZ(15deg)'}}></div>
          </div>
          
          <div className="absolute top-1/3 right-20 w-24 h-24 opacity-15 floating-3d" style={{animationDelay: '2s'}}>
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 transform rounded-xl shadow-2xl" 
                 style={{transform: 'rotateX(30deg) rotateY(60deg) rotateZ(-20deg)'}}></div>
          </div>
          
          <div className="absolute bottom-32 left-1/4 w-20 h-20 opacity-20 floating-3d" style={{animationDelay: '4s'}}>
            <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-cyan-400 transform rounded-lg shadow-2xl" 
                 style={{transform: 'rotateX(60deg) rotateY(30deg) rotateZ(45deg)'}}></div>
          </div>
          
          {/* 3D Wireframe Elements */}
          <div className="absolute top-1/2 left-1/2 w-40 h-40 opacity-5 floating-3d" style={{animationDelay: '1s', transform: 'translate(-50%, -50%)'}}>
            <div className="w-full h-full border-2 border-cyan-400 transform rounded-full" 
                 style={{transform: 'rotateX(45deg) rotateY(45deg)'}}></div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-cyan-400 rounded-full opacity-40 floating-3d pulse-glow"></div>
          <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full opacity-30 floating-3d pulse-glow" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-50 floating-3d pulse-glow" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-3/4 left-1/4 w-2.5 h-2.5 bg-emerald-400 rounded-full opacity-35 floating-3d pulse-glow" style={{animationDelay: '2.5s'}}></div>
          
          {/* 3D Lines/Connections */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <defs>
              <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#667eea'}} />
                <stop offset="100%" style={{stopColor: '#764ba2'}} />
              </linearGradient>
              <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#764ba2'}} />
                <stop offset="100%" style={{stopColor: '#f093fb'}} />
              </linearGradient>
            </defs>
            <line x1="10%" y1="20%" x2="40%" y2="80%" stroke="url(#lineGrad1)" strokeWidth="2" className="floating-3d" />
            <line x1="60%" y1="30%" x2="90%" y2="70%" stroke="url(#lineGrad2)" strokeWidth="1.5" className="floating-3d" />
            <line x1="20%" y1="60%" x2="80%" y2="40%" stroke="url(#lineGrad1)" strokeWidth="1" className="floating-3d" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="glass-stat px-6 py-3 rounded-full">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold text-sm uppercase tracking-wider">
                  {t.trustedPartners}
                </span>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 neon-text">
              {t.powering}
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.innovation}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
              {t.subtitle}
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold"> {t.transform}</span>
            </p>
          </div>

          {/* Scrolling Partners - Two Rows */}
          <div className="space-y-8 mb-20">
            {/* First row - left to right */}
            <div className="scrolling-container">
              <div className="flex space-x-4 md:space-x-6 marquee-row">
                {[...partners, ...partners].map((partner, index) => (
                  <div
                    key={`row1-${partner.id}-${index}`}
                    className="partner-card-3d rounded-2xl p-3 sm:p-4 md:p-6 w-[220px] sm:w-[250px] md:w-[300px] shadow-2xl"
                  >
                    <div className="flex items-start space-x-4">
                      {/* 3D Logo */}
                      <div className="logo-gradient-3d w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transform-gpu flex-shrink-0">
                        <span className="text-white font-bold text-sm sm:text-lg md:text-xl drop-shadow-lg">
                          {partner.logo}
                        </span>
                      </div>
                      
                      {/* Company Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm sm:text-base md:text-lg text-white mb-1 neon-text leading-tight">
                          {partner.name}
                        </h3>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                          {partner.industry}
                        </p>
                        <p className="text-gray-500 text-xs leading-tight line-clamp-2">
                          {partner.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Status Indicator */}
                    <div className="flex items-center justify-center mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-700">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mr-2 pulse-glow"></div>
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                        {language === 'en' ? 'Active Partner' : 'Mshirika Hai'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Second row - right to left */}
            <div className="scrolling-container">
              <div className="flex space-x-4 md:space-x-6 marquee-row-reverse">
                {[...partners, ...partners].reverse().map((partner, index) => (
                  <div
                    key={`row2-${partner.id}-${index}`}
                    className="partner-card-3d rounded-2xl p-3 sm:p-4 md:p-6 w-[220px] sm:w-[250px] md:w-[300px] shadow-2xl"
                  >
                    <div className="flex items-start space-x-4">
                      {/* 3D Logo */}
                      <div className="logo-gradient-3d w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transform-gpu flex-shrink-0">
                        <span className="text-white font-bold text-sm sm:text-lg md:text-xl drop-shadow-lg">
                          {partner.logo}
                        </span>
                      </div>
                      
                      {/* Company Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm sm:text-base md:text-lg text-white mb-1 neon-text leading-tight">
                          {partner.name}
                        </h3>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                          {partner.industry}
                        </p>
                        <p className="text-gray-500 text-xs leading-tight line-clamp-2">
                          {partner.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Status Indicator */}
                    <div className="flex items-center justify-center mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-700">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mr-2 pulse-glow"></div>
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                        {language === 'en' ? 'Active Partner' : 'Mshirika Hai'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            <div className="glass-stat rounded-2xl p-6 text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">7+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">{t.activeClients}</div>
            </div>
            <div className="glass-stat rounded-2xl p-6 text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">6</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">{t.industries}</div>
            </div>
            <div className="glass-stat rounded-2xl p-6 text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-3">98%</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">{t.retention}</div>
            </div>
            <div className="glass-stat rounded-2xl p-6 text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-3">24/7</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">{t.support}</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-300 mb-8 text-lg font-light">
              {t.readyToJoin}
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold"> {t.innovativeCompanies}</span>?
            </p>
            <button className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 neon-glow">
              <span className="relative z-10">
                {t.startPartnership}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnersBanner;