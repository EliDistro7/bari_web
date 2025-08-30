import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, Play, CheckCircle, Sparkles, Code2, Rocket, Globe, Smartphone, Monitor, Server, Star } from 'lucide-react';
import { useLanguage } from '@/context/language';
const HeroSection = () => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const {language} = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  // Enhanced translation object
  const content = {
    en: {
      role: "Full-Stack Developer",
      tagline: "I CREATE",
      subtitle: "Digital Experiences",
      transform: "that transform businesses",
      impact: "drive measurable impact",
      concept: "From concept to deployment, engineered for excellence.",
      cta: "Start Your Project",
      portfolio: "View Portfolio",
      projects: "Projects",
      years: "Years", 
      clients: "Happy Clients",
      services: [
        {
          title: "Web Applications",
          subtitle: "Modern, scalable web solutions",
          icon: <Globe className="w-6 h-6" />,
          theme: "cyan",
          description: "React • Next.js • TypeScript",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center&auto=format",
          alt: "Modern web application interface"
        },
        {
          title: "Mobile Applications", 
          subtitle: "Cross-platform mobile experiences",
          icon: <Smartphone className="w-6 h-6" />,
          theme: "purple",
          description: "React Native • Flutter • Swift",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center&auto=format",
          alt: "Mobile app development workspace"
        },
        {
          title: "Static Websites",
          subtitle: "Lightning-fast, SEO-optimized sites", 
          icon: <Monitor className="w-6 h-6" />,
          theme: "emerald",
          description: "JAMstack • Gatsby • Hugo",
          image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop&crop=center&auto=format",
          alt: "Beautiful website design mockup"
        },
        {
          title: "Backend Systems",
          subtitle: "Robust server-side architecture",
          icon: <Server className="w-6 h-6" />,
          theme: "orange",
          description: "Node.js • Python • PostgreSQL",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=center&auto=format",
          alt: "Server infrastructure and data center"
        }
      ]
    },
    sw: {
      role: "Mtaalamu wa Programu",
      tagline: "NATENGENEZA",
      subtitle: "Uzoefu wa Kidijitali",
      transform: "unaohamasisha biashara",
      impact: "kuleta athari halisi",
      concept: "Kutoka wazo hadi utekelezaji, kimeundwa kwa ubora.",
      cta: "Anza Mradi Wako",
      portfolio: "Ona Kazi Zangu",
      projects: "Miradi",
      years: "Miaka",
      clients: "Wateja Wenye Furaha",
      services: [
        {
          title: "Web Apps",
          subtitle: "Suluhisho la kisasa la mtandao",
          icon: <Globe className="w-6 h-6" />,
          theme: "cyan",
          description: "React • Next.js • TypeScript",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center&auto=format",
          alt: "Kiolesura cha programu ya kisasa ya mtandao"
        },
        {
          title: "Mobile Apps", 
          subtitle: "Uzoefu wa programu za simu za kisasa",
          icon: <Smartphone className="w-6 h-6" />,
          theme: "purple",
          description: "React Native • Flutter • Swift",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center&auto=format",
          alt: "Mazingira ya kutengeneza programu za simu"
        },
        {
          title: "Websites",
          subtitle: "Tovuti za haraka, zilizoboreshwa kwa SEO", 
          icon: <Monitor className="w-6 h-6" />,
          theme: "emerald",
          description: "NextJs • ReactJs • WordPress",
          image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop&crop=center&auto=format",
          alt: "Muundo mzuri wa tovuti"
        },
        {
          title: "Backend Systems",
          subtitle: "Miundo imara ya upande wa seva",
          icon: <Server className="w-6 h-6" />,
          theme: "orange",
          description: "Node.js • Python • PostgreSQL",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=center&auto=format",
          alt: "Miundombinu ya seva na kituo cha data"
        }
      ]
    }
  };

  const t = content[language as keyof typeof content] || content.en;
  const currentService = t.services[activeServiceIndex];

  // Theme configurations
  const themes = {
    cyan: {
      primary: "from-cyan-400 via-cyan-500 to-blue-500",
      secondary: "from-cyan-300 via-blue-400 to-purple-500",
      accent: "cyan-400",
      glow: "0 0 40px rgba(6, 182, 212, 0.5)",
      shadow: "shadow-cyan-500/30"
    },
    purple: {
      primary: "from-purple-400 via-purple-500 to-pink-500",
      secondary: "from-purple-300 via-pink-400 to-red-500",
      accent: "purple-400",
      glow: "0 0 40px rgba(147, 51, 234, 0.5)",
      shadow: "shadow-purple-500/30"
    },
    emerald: {
      primary: "from-emerald-400 via-emerald-500 to-teal-500",
      secondary: "from-emerald-300 via-teal-400 to-cyan-500",
      accent: "emerald-400",
      glow: "0 0 40px rgba(16, 185, 129, 0.5)",
      shadow: "shadow-emerald-500/30"
    },
    orange: {
      primary: "from-orange-400 via-red-500 to-pink-500",
      secondary: "from-orange-300 via-red-400 to-pink-500",
      accent: "orange-400",
      glow: "0 0 40px rgba(251, 146, 60, 0.5)",
      shadow: "shadow-orange-500/30"
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
          background: 
            radial-gradient(circle at 15% 85%, rgba(6, 182, 212, 0.2) 0%, transparent 60%),
            radial-gradient(circle at 85% 15%, rgba(147, 51, 234, 0.2) 0%, transparent 60%),
            radial-gradient(circle at 45% 45%, rgba(16, 185, 129, 0.15) 0%, transparent 55%),
            radial-gradient(circle at 75% 75%, rgba(251, 146, 60, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #020617 0%, #0c0a2e 25%, #1e1b4b 50%, #0c0a2e 75%, #020617 100%);
          min-height: 100vh;
          position: relative;
        }
        
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(2px);
          animation: float-orb 12s ease-in-out infinite;
        }
        
        .orb-1 {
          top: 15%;
          left: 8%;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 80%);
          animation-delay: 0s;
        }
        
        .orb-2 {
          top: 65%;
          right: 12%;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.35) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 80%);
          animation-delay: 3s;
        }
        
        .orb-3 {
          bottom: 25%;
          left: 15%;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 80%);
          animation-delay: 6s;
        }
        
        .orb-4 {
          top: 40%;
          right: 35%;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, transparent 70%);
          animation-delay: 9s;
        }
        
        @keyframes float-orb {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-30px) translateX(15px) rotate(90deg); }
          50% { transform: translateY(-15px) translateX(-20px) rotate(180deg); }
          75% { transform: translateY(-40px) translateX(10px) rotate(270deg); }
        }
        
        .premium-glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        
        .hero-badge {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 6px 30px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        
        .dynamic-glow {
          box-shadow: ${currentTheme.glow};
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .reveal-animation {
          animation: revealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(80px);
        }
        
        .reveal-delay-1 { animation-delay: 0.15s; }
        .reveal-delay-2 { animation-delay: 0.3s; }
        .reveal-delay-3 { animation-delay: 0.45s; }
        .reveal-delay-4 { animation-delay: 0.6s; }
        
        @keyframes revealUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .service-morph {
          animation: serviceMorphIn 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        
        @keyframes serviceMorphIn {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.92);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        
        .icon-orbit {
          animation: iconOrbit 4s ease-in-out infinite;
        }
        
        @keyframes iconOrbit {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-12px) rotate(8deg); }
          50% { transform: translateY(-8px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
        
        .gradient-border {
          position: relative;
          background: linear-gradient(135deg, #1e293b, #0f172a);
        }
        
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 2px;
          background: linear-gradient(135deg, ${currentTheme.primary});
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask-composite: xor;
        }
        
        .stats-glow {
          text-shadow: 0 0 25px currentColor;
        }
        
        .interactive-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .interactive-hover:hover {
          transform: translateY(-4px);
        }
        
        .magnetic-button {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .magnetic-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .magnetic-button:hover::before {
          left: 100%;
        }
        
        .magnetic-button:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4);
        }
        
        .text-shimmer {
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #e5e7eb 25%,
            #ffffff 50%,
            #e5e7eb 75%,
            #ffffff 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0%, 100% { background-position: 200% 0; }
          50% { background-position: -200% 0; }
        }
        
        .pulse-ring {
          animation: pulseRing 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
        
        @keyframes pulseRing {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }
        
        .holographic {
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 70%
          );
          background-size: 200% 200%;
          animation: holographic 3s ease-in-out infinite;
        }
        
        @keyframes holographic {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }
      `}</style>
      
      <section className="hero-container relative overflow-hidden py-16">
        {/* Enhanced Animated Background Orbs */}
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="floating-orb orb-4"></div>
        
        {/* Ambient Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Mobile Background Image Overlay */}
        <div className="lg:hidden absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${currentService.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.primary} opacity-40`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
          </div>
        </div>
        
        {/* Content Wrapper */}
        <div className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-screen">
          <div className="max-w-7xl mx-auto w-full">
            
            {/* Main Grid Layout */}
            <div className="lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center">
              
              {/* Left Column - Content */}
              <div className="text-center lg:text-left space-y-8 lg:space-y-12">
                
                {/* Enhanced Professional Badge */}
          

                {/* Enhanced Hero Title */}
                <div className={`space-y-6 ${isLoaded ? 'reveal-animation reveal-delay-1' : ''}`}>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-9xl font-black tracking-tight">
                    <span className="block text-shimmer mb-3 leading-none">
                      {t.tagline}
                    </span>
                    <div className="relative overflow-hidden">
                      <span 
                        key={`title-${activeServiceIndex}`}
                        className="block service-morph leading-none font-black text-6xl lg:text-8xl"
                        style={{ 
                          background: activeServiceIndex === 0 ? 'linear-gradient(135deg, #22d3ee, #06b6d4, #3b82f6)' :
                                     activeServiceIndex === 1 ? 'linear-gradient(135deg, #a855f7, #8b5cf6, #ec4899)' :
                                     activeServiceIndex === 2 ? 'linear-gradient(135deg, #10b981, #059669, #06b6d4)' :
                                     'linear-gradient(135deg, #fb923c, #ef4444, #ec4899)',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        {currentService.title.toUpperCase()}
                      </span>
                    </div>
                    <span className="block text-white/95 text-3xl sm:text-4xl lg:text-6xl font-light mt-6 leading-tight">
                      {t.transform}
                    </span>
                  </h1>
                </div>

                {/* Enhanced Description */}
                <div className={`space-y-8 max-w-2xl mx-auto lg:mx-0 ${isLoaded ? 'reveal-animation reveal-delay-2' : ''}`}>
                  <p 
                    key={`desc-${activeServiceIndex}`}
                    className="text-xl lg:text-2xl text-gray-200 leading-relaxed service-morph font-medium"
                  >
                    {currentService.subtitle} {language === 'sw' ? 'ambazo' : 'that'} {language === 'en' ? "don't just impress—they" : "si tu kuonyesha—bali pia"} 
                    <span className={`bg-gradient-to-r ${currentTheme.secondary} bg-clip-text text-transparent font-bold ml-2`}>
                      {t.impact}
                    </span>.
                  </p>
                  
                  <div className="flex items-center justify-center lg:justify-start space-x-6 p-6 premium-glass rounded-2xl">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentTheme.primary} animate-pulse`}></div>
                    <p className="text-lg text-gray-200 font-semibold">
                      {currentService.description}
                    </p>
                    <Sparkles className={`w-5 h-5 text-${currentTheme.accent} animate-pulse`} />
                  </div>
                  
                  <p className="text-lg text-gray-300 italic font-medium border-l-4 border-gradient-to-b from-transparent via-gray-500 to-transparent pl-6">
                    {t.concept}
                  </p>
                </div>

                {/* Enhanced Service Navigation */}
                <div className={`flex justify-center lg:justify-start items-center space-x-8 ${isLoaded ? 'reveal-animation reveal-delay-3' : ''}`}>
                  {t.services.map((service, index) => {
                    const serviceTheme = themes[service.theme as keyof typeof themes];
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveServiceIndex(index)}
                        className={`interactive-hover relative group ${
                          index === activeServiceIndex 
                            ? 'scale-150' 
                            : 'opacity-50 hover:opacity-100 hover:scale-125'
                        }`}
                        title={service.title}
                      >
                        <div className={`w-5 h-5 rounded-full transition-all duration-700 ${
                          index === activeServiceIndex 
                            ? `bg-gradient-to-r ${serviceTheme.primary} ${serviceTheme.shadow} shadow-xl` 
                            : 'bg-gray-600 group-hover:bg-gray-400'
                        }`}>
                          {index === activeServiceIndex && (
                            <>
                              <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${serviceTheme.primary} animate-ping opacity-75`}></div>
                              <div className={`absolute -inset-2 rounded-full bg-gradient-to-r ${serviceTheme.primary} opacity-20 animate-pulse`}></div>
                            </>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Enhanced Call-to-Action Buttons */}
                <div className={`flex flex-col sm:flex-row gap-6 justify-center lg:justify-start ${isLoaded ? 'reveal-animation reveal-delay-4' : ''}`}>
                  <button 
                    className={`magnetic-button group relative overflow-hidden bg-gradient-to-r ${currentTheme.primary} text-white px-10 py-5 lg:px-12 lg:py-6 rounded-2xl font-bold text-xl dynamic-glow`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {t.cta}
                      <Rocket className="w-6 h-6 ml-4 group-hover:translate-x-3 group-hover:rotate-12 transition-transform duration-400" />
                    </span>
                    <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.secondary} opacity-0 group-hover:opacity-100 transition-opacity duration-400`}></div>
                  </button>
                  
                  <button className="magnetic-button group premium-glass text-white px-10 py-5 lg:px-12 lg:py-6 rounded-2xl font-bold text-xl border border-white/30 hover:border-white/50 relative overflow-hidden">
                    <div className="holographic absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                    <span className="relative flex items-center justify-center">
                      <Play className="w-6 h-6 mr-4 group-hover:scale-125 transition-transform duration-300" />
                      {t.portfolio}
                    </span>
                  </button>
                </div>

                {/* Enhanced Stats Display */}
                <div className={`flex flex-wrap justify-center lg:justify-start items-center gap-12 pt-12 ${isLoaded ? 'reveal-animation reveal-delay-4' : ''}`}>
                  <div className="text-center lg:text-left group interactive-hover premium-glass px-6 py-4 rounded-2xl">
                    <div className={`text-4xl lg:text-5xl font-black text-${currentTheme.accent} stats-glow mb-2`}>
                      10+
                    </div>
                    <div className="text-sm text-gray-300 uppercase tracking-widest font-bold">
                      {t.projects}
                    </div>
                  </div>
                  
                  <div className="w-px h-20 bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
                  
                  <div className="text-center lg:text-left group interactive-hover premium-glass px-6 py-4 rounded-2xl">
                    <div className="text-4xl lg:text-5xl font-black text-purple-400 stats-glow mb-2">
                      5+
                    </div>
                    <div className="text-sm text-gray-300 uppercase tracking-widest font-bold">
                      {t.years}
                    </div>
                  </div>
                  
                  <div className="w-px h-20 bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
                  
                  <div className="text-center lg:text-left group interactive-hover premium-glass px-6 py-4 rounded-2xl">
                    <div className="text-4xl lg:text-5xl font-black text-pink-400 stats-glow mb-2">
                      7+
                    </div>
                    <div className="text-sm text-gray-300 uppercase tracking-widest font-bold">
                      {t.clients}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Enhanced Visual Showcase */}
              <div className="hidden lg:block mt-16 lg:mt-0">
                <div className="relative">
                  {/* Main Service Card */}
                  <div 
                    key={`showcase-${activeServiceIndex}`}
                    className={`gradient-border premium-glass rounded-3xl p-8 service-morph ${currentTheme.shadow} relative overflow-hidden`}
                  >
                    {/* Holographic overlay */}
                    <div className="holographic absolute inset-0 opacity-30"></div>
                    
                    <div className="relative space-y-8">
                      {/* Enhanced Card Header */}
                      <div className="flex items-center justify-between">
                        <div className={`p-4 rounded-2xl bg-gradient-to-r ${currentTheme.primary} relative overflow-hidden`}>
                          <div className="text-white icon-orbit relative z-10">
                            {currentService.icon}
                          </div>
                          <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className={`px-6 py-3 premium-glass rounded-full border border-${currentTheme.accent}/40 relative overflow-hidden`}>
                          <div className="holographic absolute inset-0"></div>
                          <span className={`relative text-${currentTheme.accent} text-sm font-bold tracking-wider`}>
                            FEATURED
                          </span>
                        </div>
                      </div>
                      
                      {/* Enhanced Service Image */}
                      <div className="relative rounded-3xl overflow-hidden group">
                        <div 
                          className="h-80 transition-transform duration-1000 group-hover:scale-110"
                          style={{
                            backgroundImage: `url(${currentService.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.primary} opacity-20 transition-opacity duration-700 group-hover:opacity-30`}></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                        
                        {/* Floating Tech Indicators */}
                        <div className="absolute top-6 left-6">
                          <div className="premium-glass px-4 py-2 rounded-xl border border-white/20">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full bg-${currentTheme.accent} animate-pulse`}></div>
                              <span className="text-white text-xs font-bold">LIVE</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="absolute bottom-6 right-6">
                          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity dynamic-glow`}>
                            <ArrowRight className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced Service Details */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-3xl font-black text-white mb-3 leading-tight">
                            {currentService.title}
                          </h3>
                          <p className="text-gray-300 text-lg leading-relaxed">
                            {currentService.subtitle}
                          </p>
                        </div>
                        
                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-3">
                          {currentService.description.split(' • ').map((tech, index) => (
                            <div key={index} className="premium-glass px-4 py-2 rounded-xl border border-white/20 relative overflow-hidden">
                              <div className="holographic absolute inset-0 opacity-30"></div>
                              <span className="relative text-white text-sm font-semibold">{tech}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Progress Indicator */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm font-medium">Development Progress</span>
                            <span className={`text-${currentTheme.accent} text-sm font-bold`}>Ready</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${currentTheme.primary} rounded-full transition-all duration-1000 dynamic-glow`} style={{ width: '100%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Floating Elements */}
                  <div className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r ${currentTheme.primary} rounded-full opacity-20 animate-pulse`}></div>
                  <div className={`absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-r ${currentTheme.secondary} rounded-full opacity-10 floating-orb`}></div>
                  
                  {/* Accent Particles */}
                  <div className="absolute top-1/4 -right-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                  <div className="absolute bottom-1/3 -left-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

       

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="premium-glass w-8 h-12 rounded-full flex items-end justify-center pb-3 border border-white/20 relative overflow-hidden">
            <div className="holographic absolute inset-0 opacity-30"></div>
            <div className={`relative w-2 h-4 bg-gradient-to-t ${currentTheme.primary} rounded-full animate-pulse`}></div>
          </div>
        </div>

        {/* Ambient Light Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${currentTheme.accent} to-transparent opacity-30`}></div>
          <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${currentTheme.accent} to-transparent opacity-30`}></div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;