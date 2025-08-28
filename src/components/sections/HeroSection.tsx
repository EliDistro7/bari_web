import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, Play, CheckCircle, Sparkles, Code2, Rocket, Globe, Smartphone, Monitor, Server } from 'lucide-react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { useLanguage } from '@/context/language';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap'
});

const jetBrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap'
});

const HeroSection = () => {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const { language } = useLanguage();

  // Translation object
  const translations = {
    en: {
      role: "Full-Stack Developer",
      build: "I BUILD",
      transform: "that transform businesses",
      driveResults: "drive real results",
      concept: "From concept to deployment, crafted with precision.",
      buildEpic: "Let's Build Something Epic",
      viewWork: "View My Work",
      projects: "Projects",
      years: "Years", 
      clients: "Happy Clients",
      services: [
        {
          title: "stunning web applications",
          subtitle: "Full-stack web solutions that scale",
          icon: <Globe className="w-5 h-5" />,
          gradient: "from-cyan-400 to-blue-500",
          textGradient: "from-cyan-400 via-blue-400 to-purple-400",
          description: "React, Next.js, Node.js & more",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center&auto=format",
          imageAlt: "Modern web application dashboard"
        },
        {
          title: "powerful mobile apps", 
          subtitle: "Cross-platform mobile experiences",
          icon: <Smartphone className="w-5 h-5" />,
          gradient: "from-purple-400 to-pink-500",
          textGradient: "from-purple-400 via-pink-400 to-red-400",
          description: "React Native, Flutter & Native",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center&auto=format",
          imageAlt: "Mobile app interface design"
        },
        {
          title: "beautiful static websites",
          subtitle: "Fast, SEO-optimized landing pages", 
          icon: <Monitor className="w-5 h-5" />,
          gradient: "from-emerald-400 to-cyan-500",
          textGradient: "from-emerald-400 via-cyan-400 to-blue-400",
          description: "JAMstack, Performance-focused",
          image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop&crop=center&auto=format",
          imageAlt: "Beautiful website landing page"
        },
        {
          title: "integrated Web Systems",
          subtitle: "Custom enterprise solutions",
          icon: <Server className="w-5 h-5" />,
          gradient: "from-orange-400 to-red-500", 
          textGradient: "from-orange-400 via-red-400 to-pink-400",
          description: "APIs, Databases, Cloud Infrastructure",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=center&auto=format",
          imageAlt: "Server room with data infrastructure"
        }
      ]
    },
    sw: {
      role: "Software Developer",
      build: "NINATENGENEZA",
      transform: "zinazo badilisha biashara",
      driveResults: "kuleta matokeo halisi",
      concept: "Kutoka wazo hadi utekelezaji, kimetengenezwa kwa usahihi.",
      buildEpic: "Tuunde Kitu Cha Ajabu",
      viewWork: "Ona Kazi Zangu",
      projects: "Miradi",
      years: "Miaka",
      clients: "Wateja Wenye Furaha",
      services: [
        {
          title: "Static Websites",
          subtitle: "Suluhisho kamili la biashara na watu binafsi ",
          icon: <Globe className="w-5 h-5" />,
          gradient: "from-cyan-400 to-blue-500",
          textGradient: "from-cyan-400 via-blue-400 to-purple-400",
          description: "React, Next.js, Node.js nk",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center&auto=format",
          imageAlt: "Dashibodi ya programu ya kisasa ya mtandao"
        },
        {
          title: "Mobile Applications za kisasa", 
          subtitle: "Uzoefu wa Mobile Applications za kisasa za kila aina",
          icon: <Smartphone className="w-5 h-5" />,
          gradient: "from-purple-400 to-pink-500",
          textGradient: "from-purple-400 via-pink-400 to-red-400",
          description: "React Native, Flutter na Native",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center&auto=format",
          imageAlt: "Muundo wa kiolesura cha programu ya simu"
        },
        {
          title: "Web Applications",
          subtitle: "Web applications za kisasa kwa ajili ya biashara na taasisi, zilizoboreshwa kwa SEO", 
          icon: <Monitor className="w-5 h-5" />,
          gradient: "from-emerald-400 to-cyan-500",
          textGradient: "from-emerald-400 via-cyan-400 to-blue-400",
          description: "JAMstack, Zilizolenga Utendaji",
          image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop&crop=center&auto=format",
          imageAlt: "Ukurasa mzuri wa kufikia tovuti"
        },
        {
          title: "Web Systems",
          subtitle: "Suluhisho maalum za makampuni, taasisi, vikundi na biashara",
          icon: <Server className="w-5 h-5" />,
          gradient: "from-orange-400 to-red-500", 
          textGradient: "from-orange-400 via-red-400 to-pink-400",
          description: "API, Hifadhidata, Miundombinu ya Wingu",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=center&auto=format",
          imageAlt: "Chumba cha seva na miundombinu ya data"
        }
      ]
    }
  };

  const t = translations[language as keyof typeof translations] || translations.sw;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % t.services.length);
    }, 3500);
    
    return () => clearInterval(interval);
  }, [t.services.length]);

  const currentService = t.services[currentServiceIndex];

  return (
    <>
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .neon-glow {
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.3), 
                      0 0 40px rgba(118, 75, 162, 0.2),
                      0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .pulse-animation {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .8; }
        }
        
        .bg-mesh {
          background-image: 
            radial-gradient(circle at 25% 25%, #667eea 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, #764ba2 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, #f093fb 0%, transparent 50%);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .service-transition {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .fade-slide-up {
          animation: fadeSlideUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .service-indicator {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .service-indicator.active {
          transform: scale(1.2);
        }
        
        .service-icon-float {
          animation: serviceIconFloat 2s ease-in-out infinite;
        }
        
        @keyframes serviceIconFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(3deg); }
        }
        
        .service-image-container {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .image-fade-in {
          animation: imageFadeIn 0.8s ease-out forwards;
        }
        
        @keyframes imageFadeIn {
          from {
            opacity: 0;
            transform: translateX(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        .mobile-bg-overlay {
          background: linear-gradient(135deg, 
            rgba(15, 23, 42, 0.7) 0%, 
            rgba(30, 27, 75, 0.75) 50%, 
            rgba(15, 23, 42, 0.7) 100%
          );
        }

        .service-title-container {
          min-height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 768px) {
          .service-title-container {
            min-height: 4rem;
          }
        }

        @media (min-width: 1024px) {
          .service-title-container {
            min-height: 5rem;
            justify-content: flex-start;
          }
        }

        @media (min-width: 1280px) {
          .service-title-container {
            min-height: 6rem;
          }
        }

        .service-title {
          line-height: 1.1;
          word-wrap: break-word;
          hyphens: auto;
          text-align: center;
        }

        @media (min-width: 1024px) {
          .service-title {
            text-align: left;
          }
        }
      `}</style>
      
      <section className={`${inter.className} relative min-h-screen flex items-center justify-center px-6 overflow-hidden`}>
        {/* Mobile Background Image with Overlay - Only on small screens */}
        <div className="absolute inset-0 lg:hidden">
          <div 
            key={`mobile-bg-${currentServiceIndex}`}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
            style={{
              backgroundImage: `url(${currentService.image})`
            }}
          />
          <div className="absolute inset-0 mobile-bg-overlay" />
        </div>

        {/* Animated Background - Desktop */}
        <div className="absolute inset-0 bg-mesh opacity-10 hidden lg:block"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 hidden lg:block"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 floating-animation hidden lg:block"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-15 floating-animation hidden lg:block" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-25 floating-animation hidden lg:block" style={{animationDelay: '4s'}}></div>
        
        {/* Code Particles */}
        <div className="absolute top-1/4 left-10 text-cyan-400 opacity-30 text-sm pulse-animation font-mono hidden lg:block">&lt;/&gt;</div>
        <div className="absolute top-1/3 right-16 text-purple-400 opacity-30 text-lg pulse-animation font-mono hidden lg:block" style={{animationDelay: '1s'}}>{ }</div>
        <div className="absolute bottom-1/3 right-1/4 text-pink-400 opacity-30 text-sm pulse-animation font-mono hidden lg:block" style={{animationDelay: '3s'}}>function()</div>
        
        {/* Main Content Container - Split Layout for Large Screens */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center lg:min-h-screen">
            
            {/* Text Content - Left Side on Large Screens */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Badge with Animated Service Icon */}
              <div className="mb-8 inline-block">
                <div className="glass-effect px-6 py-3 rounded-full neon-glow">
                  <span className="flex items-center text-white font-medium">
                    <div className="service-icon-float mr-2 text-cyan-400">
                      {currentService.icon}
                    </div>
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                      {t.role}
                    </span>
                    <Code2 className="w-4 h-4 ml-2 text-purple-400" />
                  </span>
                </div>
              </div>

              {/* Main Heading with Animated Service */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-tight tracking-tight">
                <span className="block text-white mb-4">
                  {t.build}
                </span>
                <div className="service-title-container mb-4">
                  <span 
                    key={currentServiceIndex}
                    className={`service-title bg-gradient-to-r ${currentService.textGradient} bg-clip-text text-transparent fade-slide-up service-transition capitalize`}
                  >
                    {currentService.title.toUpperCase()}
                  </span>
                </div>
                <span className="block text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light">
                  {t.transform}
                </span>
              </h1>

              {/* Animated Subtitle */}
              <div className="mb-8 max-w-3xl lg:max-w-none">
                <p 
                  key={`subtitle-${currentServiceIndex}`}
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light fade-slide-up mb-4"
                >
                  {currentService.subtitle} {language === 'sw' ? 'ambazo' : 'that'} {language== 'en' ? "don't just look amazing—they" : "sio tu kwamba zina muonekano mzuri— bali pia zenye"} 
                  <span className={`text-transparent bg-gradient-to-r ${currentService.textGradient} bg-clip-text font-semibold`}>
                    {' '}{t.driveResults}
                  </span>.
                </p>
                <p 
                  key={`description-${currentServiceIndex}`}
                  className="text-base lg:text-lg text-gray-400 font-light fade-slide-up"
                >
                  {currentService.description} • {t.concept}
                </p>
              </div>

              {/* Service Indicators */}
              <div className="mb-8 lg:mb-12 flex justify-center lg:justify-start items-center space-x-4">
                {t.services.map((service, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentServiceIndex(index)}
                    className={`service-indicator w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentServiceIndex 
                        ? `bg-gradient-to-r ${service.gradient} active shadow-lg` 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    title={service.title}
                  />
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start items-center mb-12 lg:mb-16">
                <button className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 lg:px-10 py-4 lg:py-5 rounded-2xl font-semibold text-base lg:text-lg overflow-hidden transition-all duration-300 hover:scale-105 neon-glow">
                  <span className="relative z-10 flex items-center">
                    {t.buildEpic}
                    <Rocket className="w-4 lg:w-5 h-4 lg:h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button className="group glass-effect text-white px-8 lg:px-10 py-4 lg:py-5 rounded-2xl font-semibold text-base lg:text-lg transition-all duration-300 hover:scale-105 border border-gray-600 hover:border-cyan-400">
                  <span className="flex items-center">
                    <Play className="w-4 lg:w-5 h-4 lg:h-5 mr-3" />
                    {t.viewWork}
                  </span>
                </button>
              </div>

              {/* Stats Row - Only on Large Screens */}
              <div className="hidden lg:flex flex-wrap justify-start items-center gap-8 text-gray-300">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">100+</div>
                  <div className="text-sm uppercase tracking-wider">{t.projects}</div>
                </div>
                <div className="w-px h-12 bg-gray-600"></div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-purple-400 mb-1">5+</div>
                  <div className="text-sm uppercase tracking-wider">{t.years}</div>
                </div>
                <div className="w-px h-12 bg-gray-600"></div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-pink-400 mb-1">50+</div>
                  <div className="text-sm uppercase tracking-wider">{t.clients}</div>
                </div>
              </div>
            </div>

            {/* Image Section - Right Side on Large Screens */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="service-image-container">
                <div 
                  key={`desktop-image-${currentServiceIndex}`}
                  className="relative rounded-2xl overflow-hidden shadow-2xl image-fade-in"
                >
                  <img
                    src={currentService.image}
                    alt={currentService.imageAlt}
                    className="w-full h-[500px] xl:h-[600px] object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${currentService.gradient} opacity-20`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Floating Tech Stack Badge */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="glass-effect px-4 py-3 rounded-xl">

                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentService.gradient} mr-3`}></div>
                          <span className="text-white font-semibold text-sm">
                            {currentService.description}
                          </span>
                        </div>
                        <div className="text-white/70">
                          {currentService.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row - Mobile Only */}
          <div className="lg:hidden flex flex-wrap justify-center items-center gap-6 text-gray-300 mt-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">10+</div>
              <div className="text-xs uppercase tracking-wider">{t.projects}</div>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">3+</div>
              <div className="text-xs uppercase tracking-wider">{t.years}</div>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400 mb-1">7+</div>
              <div className="text-xs uppercase tracking-wider">{t.clients}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;