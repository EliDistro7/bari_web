import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Sparkles, Rocket } from 'lucide-react';
import { useLanguage } from '@/context/language';
import { content } from './content';


const HeroSection = () => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const {language} = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false);

  const openWhatsApp = () => {
    const message = "Hi! I'm interested in learning more about your development services. Could you please provide more information?";
    const url = `https://wa.me/255765762688?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const t = content[language as keyof typeof content] || content.en;
  const currentService = t.services[activeServiceIndex];

  // Calm, sophisticated theme configurations
  const themes = {
    cyan: {
      primary: "from-cyan-500/90 to-blue-600/90",
      text: "text-cyan-600",
      bg: "bg-cyan-50",
      glow: "0 8px 32px rgba(6, 182, 212, 0.15)"
    },
    purple: {
      primary: "from-purple-500/90 to-pink-600/90",
      text: "text-purple-600",
      bg: "bg-purple-50",
      glow: "0 8px 32px rgba(147, 51, 234, 0.15)"
    },
    emerald: {
      primary: "from-emerald-500/90 to-teal-600/90",
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      glow: "0 8px 32px rgba(16, 185, 129, 0.15)"
    },
    orange: {
      primary: "from-orange-500/90 to-pink-600/90",
      text: "text-orange-600",
      bg: "bg-orange-50",
      glow: "0 8px 32px rgba(251, 146, 60, 0.15)"
    }
  };

  const currentTheme = themes[currentService.theme as keyof typeof themes];

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setActiveServiceIndex((prev) => (prev + 1) % t.services.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [t.services.length, language]); // ADD language HERE

  return (
    <>
      <style jsx>{`
        .hero-container {
          background: linear-gradient(to bottom, #fafafa 0%, #f5f5f5 100%);
          min-height: 90vh;
          position: relative;
        }
        
        .mobile-hero-bg {
          background-image: url(${currentService.image});
          background-size: cover;
          background-position: center;
          transition: background-image 0.8s ease-in-out;
        }
        
        .mobile-overlay {
          background: linear-gradient(to bottom, 
            rgba(250, 250, 250, 0.77) 0%,
            rgba(250, 250, 250, 0.75) 50%,
            rgba(250, 250, 250, 0.72) 100%
          );
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
        }
        
        .image-card {
          box-shadow: ${currentTheme.glow};
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .reveal-animation {
          animation: revealUp 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        
        .reveal-delay-1 { animation-delay: 0.1s; }
        .reveal-delay-2 { animation-delay: 0.25s; }
        .reveal-delay-3 { animation-delay: 0.4s; }
        .reveal-delay-4 { animation-delay: 0.55s; }
        
        @keyframes revealUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .service-transition {
          animation: serviceSlide 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes serviceSlide {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .image-transition {
          animation: imageFade 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes imageFade {
          from {
            opacity: 0;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
        
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
        }
        
        .smooth-shadow {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.4s ease;
        }
        
        .smooth-shadow:hover {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }
      `}</style>
      
      <section className="hero-container relative overflow-hidden py-20 sm:py-24 pt-28">
        {/* Mobile Background Image with Overlay */}
        <div className="lg:hidden absolute inset-0 mobile-hero-bg">
          <div className="mobile-overlay absolute inset-0"></div>
        </div>
        
        {/* Subtle ambient background for desktop */}
        <div className="hidden lg:block absolute inset-0 opacity-[0.03]">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-400 rounded-full filter blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-400 rounded-full filter blur-[120px]"></div>
        </div>
        
        {/* Content Wrapper */}
        <div className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-[85vh]">
          <div className="max-w-7xl mx-auto w-full">
            
            {/* Main Grid Layout */}
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
              
              {/* Left Column - Content */}
              <div className="lg:col-span-5 text-center lg:text-left space-y-8 relative z-10">
                
                {/* Hero Title */}
                <div className={`space-y-5 ${isLoaded ? 'reveal-animation reveal-delay-1' : ''}`}>
                  <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200/80 shadow-sm">
                    <Sparkles className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 font-medium">Professional Development</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                    <span className="block text-gradient mb-3">
                      {t.tagline}
                    </span>
                    <div className="relative overflow-hidden">
                      <span 
                        key={`title-${activeServiceIndex}`}
                        className="block service-transition font-bold"
                        style={{ 
                          background: activeServiceIndex === 0 ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' :
                                     activeServiceIndex === 1 ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' :
                                     activeServiceIndex === 2 ? 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' :
                                     'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
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
                <div className={`space-y-4 max-w-lg mx-auto lg:mx-0 ${isLoaded ? 'reveal-animation reveal-delay-2' : ''}`}>
                  <p 
                    key={`desc-${activeServiceIndex}`}
                    className="text-xl text-gray-700 leading-relaxed service-transition"
                  >
                    {currentService.subtitle}
                  </p>
                  
                  <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-600 text-sm">
                    <div className={`w-2 h-2 rounded-full ${currentTheme.bg}`}></div>
                    <p>{currentService.description}</p>
                  </div>
                </div>

                {/* Service Navigation Dots */}
                <div className={`flex justify-center lg:justify-start items-center space-x-3 ${isLoaded ? 'reveal-animation reveal-delay-3' : ''}`}>
                  {t.services.map((service, index) => {
                    const serviceTheme = themes[service.theme as keyof typeof themes];
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveServiceIndex(index)}
                        className={`transition-all duration-700 hover:scale-110 ${
                          index === activeServiceIndex 
                            ? 'scale-100 opacity-100' 
                            : 'opacity-30 hover:opacity-60 scale-90'
                        }`}
                        title={service.title}
                      >
                        <div className={`transition-all duration-700 rounded-full ${
                          index === activeServiceIndex 
                            ? `w-10 h-3 bg-gradient-to-r ${serviceTheme.primary}` 
                            : 'w-3 h-3 bg-gray-300'
                        }`}></div>
                      </button>
                    );
                  })}
                </div>

                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ${isLoaded ? 'reveal-animation reveal-delay-4' : ''}`}>
                  <button 
                    className={`hover-lift smooth-shadow group bg-gradient-to-r ${currentTheme.primary} text-white px-8 py-4 rounded-xl font-semibold`}
                    onClick={openWhatsApp}
                  >
                    <span className="flex items-center justify-center">
                      {t.cta}
                      <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                  
                  <button className="hover-lift smooth-shadow group bg-white/90 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-xl font-semibold border border-gray-200">
                    <a href='#projects' className="flex items-center justify-center">
                      <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      {t.portfolio}
                    </a>
                  </button>
                </div>

                {/* Refined Stats */}
                <div className={`flex flex-wrap justify-center lg:justify-start items-center gap-10 pt-6 ${isLoaded ? 'reveal-animation reveal-delay-4' : ''}`}>
                  <div className="text-center lg:text-left">
                    <div className={`text-3xl font-bold ${currentTheme.text} mb-1`}>
                      10+
                    </div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider font-medium">
                      {t.projects}
                    </div>
                  </div>
                  
                  <div className="w-px h-10 bg-gray-300"></div>
                  
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      1.5+
                    </div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider font-medium">
                      {t.years}
                    </div>
                  </div>
                  
                  <div className="w-px h-10 bg-gray-300"></div>
                  
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-teal-600 mb-1">
                      10+
                    </div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider font-medium">
                      {t.clients}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Prominent Image Showcase (Desktop Only) */}
              <div className="hidden lg:block lg:col-span-7 mt-12 lg:mt-0">
                <div className="relative">
                  <div 
                    key={`showcase-${activeServiceIndex}`}
                    className="glass-card rounded-3xl p-8 image-transition relative overflow-hidden"
                  >
                    {/* Main Image - Made Prominent */}
                    <div className="relative rounded-2xl overflow-hidden group image-card">
                      <div 
                        className="h-[500px] transition-all duration-1000 group-hover:scale-105"
                        style={{
                          backgroundImage: `url(${currentService.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        {/* Subtle overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.primary} opacity-10`}></div>
                        
                        {/* Image Info Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-2xl mb-2">{currentService.icon}</div>
                                <h3 className="text-white text-2xl font-bold mb-2">
                                  {currentService.title}
                                </h3>
                                <p className="text-white/90 text-sm">
                                  {currentService.subtitle}
                                </p>
                              </div>
                              <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center shadow-xl`}>
                                <ArrowRight className="w-7 h-7 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Service Details Card */}
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${currentTheme.primary}`}>
                            <div className="text-white text-xl">
                              {currentService.icon}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">
                              {currentService.title}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              {currentService.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className={`px-4 py-2 rounded-full ${currentTheme.bg} ${currentTheme.text} text-xs font-bold uppercase tracking-wider`}>
                          Available
                        </div>
                      </div>
                      
                      {/* Smooth Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-xs font-medium">Expertise Level</span>
                          <span className={`${currentTheme.text} text-xs font-bold`}>Expert</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${currentTheme.primary} rounded-full transition-all duration-[1500ms] ease-out`} style={{ width: '95%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Refined Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="glass-card w-7 h-11 rounded-full flex items-end justify-center pb-2 shadow-lg">
            <div className={`w-1.5 h-3 bg-gradient-to-t ${currentTheme.primary} rounded-full`}></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;