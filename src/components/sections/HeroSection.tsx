import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Sparkles, Rocket } from 'lucide-react';
import { useLanguage } from '@/context/language';
import { content } from './content';

const HeroSection = () => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const {language} = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  const openWhatsApp = () => {
    const message = "Hi! I'm interested in learning more about your development services. Could you please provide more information?";
    const url = `https://wa.me/255765762688?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const t = content[language as keyof typeof content] || content.en;
  const currentService = t.services[activeServiceIndex];

  // Minimalist theme configurations
  const themes = {
    cyan: {
      primary: "from-cyan-500 to-blue-600",
      accent: "cyan-400",
      glow: "0 0 20px rgba(6, 182, 212, 0.3)"
    },
    purple: {
      primary: "from-purple-500 to-pink-600",
      accent: "purple-400",
      glow: "0 0 20px rgba(147, 51, 234, 0.3)"
    },
    emerald: {
      primary: "from-emerald-500 to-teal-600",
      accent: "emerald-400",
      glow: "0 0 20px rgba(16, 185, 129, 0.3)"
    },
    orange: {
      primary: "from-orange-500 to-pink-600",
      accent: "orange-400",
      glow: "0 0 20px rgba(251, 146, 60, 0.3)"
    }
  };

  const currentTheme = themes[currentService.theme as keyof typeof themes];

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setActiveServiceIndex((prev) => (prev + 1) % t.services.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [t.services.length]);

  return (
    <>
      <style jsx>{`
        .hero-container {
          background: linear-gradient(135deg, #020617 0%, #0a0a1a 50%, #020617 100%);
          min-height: 90vh;
          position: relative;
        }
        
        .minimal-glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .dynamic-glow {
          box-shadow: ${currentTheme.glow};
          transition: all 0.6s ease;
        }
        
        .reveal-animation {
          animation: revealUp 0.8s ease forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        
        .reveal-delay-1 { animation-delay: 0.1s; }
        .reveal-delay-2 { animation-delay: 0.2s; }
        .reveal-delay-3 { animation-delay: 0.3s; }
        .reveal-delay-4 { animation-delay: 0.4s; }
        
        @keyframes revealUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .service-morph {
          animation: serviceMorphIn 0.6s ease forwards;
        }
        
        @keyframes serviceMorphIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #ffffff, #e5e7eb);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
        
        .hover-lift {
          transition: transform 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
        }
      `}</style>
      
      <section className="hero-container relative overflow-hidden py-20 sm:py-20">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl"></div>
        </div>
        
        {/* Content Wrapper */}
        <div className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-[85vh]">
          <div className="max-w-6xl mx-auto w-full">
            
            {/* Main Grid Layout */}
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
              
              {/* Left Column - Content */}
              <div className="text-center lg:text-left space-y-6 lg:space-y-8">
                
                {/* Hero Title */}
                <div className={`space-y-4 ${isLoaded ? 'reveal-animation reveal-delay-1' : ''}`}>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
                    <span className="block text-gradient mb-2 leading-tight">
                      {t.tagline}
                    </span>
                    <div className="relative overflow-hidden">
                      <span 
                        key={`title-${activeServiceIndex}`}
                        className="block service-morph leading-tight font-bold text-4xl sm:text-5xl lg:text-6xl"
                        style={{ 
                          background: activeServiceIndex === 0 ? 'linear-gradient(135deg, #22d3ee, #3b82f6)' :
                                     activeServiceIndex === 1 ? 'linear-gradient(135deg, #a855f7, #ec4899)' :
                                     activeServiceIndex === 2 ? 'linear-gradient(135deg, #10b981, #06b6d4)' :
                                     'linear-gradient(135deg, #fb923c, #ec4899)',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent'
                        }}
                      >
                        {currentService.title}
                      </span>
                    </div>
                  </h1>
                </div>

                {/* Description */}
                <div className={`space-y-4 max-w-xl mx-auto lg:mx-0 ${isLoaded ? 'reveal-animation reveal-delay-2' : ''}`}>
                  <p 
                    key={`desc-${activeServiceIndex}`}
                    className="text-lg lg:text-xl text-gray-300 leading-relaxed service-morph"
                  >
                    {currentService.subtitle}
                  </p>
                  
                  <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-400 text-sm">
                    <Sparkles className={`w-4 h-4 text-${currentTheme.accent}`} />
                    <p>{currentService.description}</p>
                  </div>
                </div>

                {/* Service Navigation Dots */}
                <div className={`flex justify-center lg:justify-start items-center space-x-4 ${isLoaded ? 'reveal-animation reveal-delay-3' : ''}`}>
                  {t.services.map((service, index) => {
                    const serviceTheme = themes[service.theme as keyof typeof themes];
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveServiceIndex(index)}
                        className={`transition-all duration-500 ${
                          index === activeServiceIndex 
                            ? 'scale-100' 
                            : 'opacity-40 hover:opacity-70 scale-75'
                        }`}
                        title={service.title}
                      >
                        <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                          index === activeServiceIndex 
                            ? `bg-gradient-to-r ${serviceTheme.primary}` 
                            : 'bg-gray-600'
                        }`}></div>
                      </button>
                    );
                  })}
                </div>

                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ${isLoaded ? 'reveal-animation reveal-delay-4' : ''}`}>
                  <button 
                    className={`hover-lift group bg-gradient-to-r ${currentTheme.primary} text-white px-8 py-3 rounded-lg font-semibold dynamic-glow`}
                    onClick={openWhatsApp}
                  >
                    <span className="flex items-center justify-center">
                      {t.cta}
                      <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  
                  <button className="hover-lift group minimal-glass text-white px-8 py-3 rounded-lg font-semibold">
                    <a href='#projects' className="flex items-center justify-center">
                      <Play className="w-5 h-5 mr-2" />
                      {t.portfolio}
                    </a>
                  </button>
                </div>

                {/* Minimalist Stats */}
                <div className={`flex flex-wrap justify-center lg:justify-start items-center gap-8 pt-8 ${isLoaded ? 'reveal-animation reveal-delay-4' : ''}`}>
                  <div className="text-center lg:text-left">
                    <div className={`text-3xl font-bold text-${currentTheme.accent} mb-1`}>
                      10+
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">
                      {t.projects}
                    </div>
                  </div>
                  
                  <div className="w-px h-12 bg-gray-700"></div>
                  
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      1.5+
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">
                      {t.years}
                    </div>
                  </div>
                  
                  <div className="w-px h-12 bg-gray-700"></div>
                  
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-pink-400 mb-1">
                      7+
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">
                      {t.clients}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Minimalist Visual Showcase */}
              <div className="hidden lg:block mt-12 lg:mt-0">
                <div className="relative">
                  <div 
                    key={`showcase-${activeServiceIndex}`}
                    className="minimal-glass rounded-2xl p-6 service-morph relative overflow-hidden"
                  >
                    <div className="space-y-6">
                      {/* Card Header */}
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${currentTheme.primary}`}>
                          <div className="text-white">
                            {currentService.icon}
                          </div>
                        </div>
                        <div className={`text-${currentTheme.accent} text-xs font-semibold tracking-wider`}>
                          FEATURED
                        </div>
                      </div>
                      
                      {/* Service Image */}
                      <div className="relative rounded-xl overflow-hidden group">
                        <div 
                          className="h-64 transition-transform duration-700 group-hover:scale-105"
                          style={{
                            backgroundImage: `url(${currentService.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.primary} opacity-20`}></div>
                        </div>
                        
                        <div className="absolute bottom-4 right-4">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center dynamic-glow`}>
                            <ArrowRight className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Service Details */}
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-white">
                          {currentService.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {currentService.subtitle}
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="space-y-2 pt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-xs">Status</span>
                            <span className={`text-${currentTheme.accent} text-xs font-semibold`}>Ready</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${currentTheme.primary} rounded-full transition-all duration-1000`} style={{ width: '100%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="minimal-glass w-6 h-10 rounded-full flex items-end justify-center pb-2">
            <div className={`w-1.5 h-3 bg-gradient-to-t ${currentTheme.primary} rounded-full`}></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;