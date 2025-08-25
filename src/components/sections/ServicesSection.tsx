import React, { useState } from 'react';
import { Globe, Smartphone, Database, BarChart3, Zap, Shield, Clock, TrendingUp, X, ExternalLink, MessageCircle, FileText, Play } from 'lucide-react';
import { services } from './services';
import PromoVideo from './Promo2';

type Service = typeof services[number];

const benefits = [
  { icon: Zap, title: "Fast Delivery", desc: "MVP in 4-6 weeks" },
  { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security" },
  { icon: Clock, title: "24/7 Support", desc: "Ongoing maintenance" },
  { icon: TrendingUp, title: "Scalable Solutions", desc: "Growth-ready architecture" }
];

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showPromoVideo, setShowPromoVideo] = useState(false);

  const openWhatsApp = () => {
    const message = "Hi! I'm interested in learning more about your development services. Could you please provide more information?";
    const url = `https://wa.me/255765762688?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const closeModal = () => setSelectedService(null);

  return (
    <>
      <style jsx>{`
        .floating-3d-service {
          animation: floatService 10s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        
        @keyframes floatService {
          0%, 100% { 
            transform: translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg); 
          }
          25% { 
            transform: translateY(-12px) translateZ(15px) rotateX(5deg) rotateY(8deg); 
          }
          50% { 
            transform: translateY(-18px) translateZ(8px) rotateX(-3deg) rotateY(-5deg); 
          }
          75% { 
            transform: translateY(-8px) translateZ(20px) rotateX(8deg) rotateY(3deg); 
          }
        }
        
        .service-card-3d {
          transform-style: preserve-3d;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .service-card-3d:hover {
          transform: translateY(-25px) rotateY(12deg) rotateX(8deg) scale(1.03);
          box-shadow: 
            0 35px 70px rgba(0, 0, 0, 0.4),
            0 0 50px rgba(102, 126, 234, 0.3),
            0 0 100px rgba(118, 75, 162, 0.2);
          border-color: rgba(102, 126, 234, 0.4);
        }
        
        .service-icon-3d {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        
        .service-card-3d:hover .service-icon-3d {
          transform: scale(1.15) rotateY(15deg);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }
        
        .feature-badge {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .feature-badge:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }
        
        .benefit-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .benefit-card:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }
        
        .pulse-glow-service {
          animation: pulseGlowService 5s ease-in-out infinite;
        }
        
        @keyframes pulseGlowService {
          0%, 100% { 
            box-shadow: 0 0 15px rgba(102, 126, 234, 0.3);
            opacity: 1;
          }
          50% { 
            box-shadow: 0 0 30px rgba(118, 75, 162, 0.5);
            opacity: 0.9;
          }
        }
        
        .neon-text-service {
          text-shadow: 0 0 10px rgba(102, 126, 234, 0.4);
        }

        .modal-overlay {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
        }

        .modal-content {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-content::-webkit-scrollbar {
          width: 8px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background: rgba(102, 126, 234, 0.5);
          border-radius: 4px;
        }

        .whatsapp-float {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .promo-showcase {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .promo-showcase:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .video-play-button {
          transition: all 0.3s ease;
        }

        .video-play-button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 30px rgba(102, 126, 234, 0.5);
        }
      `}</style>

      <section id="services" className="relative py-24 overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* 3D Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="serviceGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="url(#serviceGridGradient)" strokeWidth="0.5" opacity="0.6"/>
              </pattern>
              <linearGradient id="serviceGridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
                <stop offset="50%" style={{stopColor: '#764ba2', stopOpacity: 0.8}} />
                <stop offset="100%" style={{stopColor: '#f093fb', stopOpacity: 0.6}} />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#serviceGrid)" />
          </svg>
        </div>
        
        {/* Floating 3D Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-24 h-24 opacity-8 floating-3d-service">
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 transform rounded-2xl shadow-2xl" 
                 style={{transform: 'rotateX(40deg) rotateY(30deg) rotateZ(15deg)'}}></div>
          </div>
          
          <div className="absolute top-1/3 right-24 w-20 h-20 opacity-10 floating-3d-service" style={{animationDelay: '2s'}}>
            <div className="w-full h-20 bg-gradient-to-br from-purple-400 to-pink-400 transform rounded-xl shadow-2xl" 
                 style={{transform: 'rotateX(25deg) rotateY(-45deg) rotateZ(30deg)'}}></div>
          </div>
          
          <div className="absolute bottom-32 left-1/4 w-16 h-16 opacity-12 floating-3d-service" style={{animationDelay: '4s'}}>
            <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-cyan-400 transform rounded-lg shadow-2xl" 
                 style={{transform: 'rotateX(-15deg) rotateY(50deg) rotateZ(-20deg)'}}></div>
          </div>
          
          {/* Code Elements */}
          <div className="absolute top-1/4 left-16 text-cyan-400 opacity-20 text-3xl floating-3d-service pulse-glow-service">&lt;/&gt;</div>
          <div className="absolute top-2/3 right-20 text-purple-400 opacity-20 text-2xl floating-3d-service pulse-glow-service" style={{animationDelay: '1s'}}>{ '{ }' }</div>
          <div className="absolute bottom-1/4 right-1/3 text-pink-400 opacity-20 text-xl floating-3d-service pulse-glow-service" style={{animationDelay: '3s'}}>[ ]</div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="benefit-card px-6 py-3 rounded-full">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold text-sm uppercase tracking-wider">
                  Premium Services
                </span>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 neon-text-service">
              SOLUTIONS THAT
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                SCALE WITH YOU
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              From concept to deployment, I provide 
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold"> end-to-end development services</span> that transform your business
            </p>
          </div>

          {/* Promo Video Showcase */}
     

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-20">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card-3d rounded-3xl p-8 shadow-2xl cursor-pointer"
                style={{animationDelay: `${index * 0.15}s`}}
                onClick={() => setSelectedService(service)}
              >
                {/* Service Icon */}
                <div className={`service-icon-3d w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-8 shadow-xl`}>
                  <service.icon className="w-10 h-10 text-white drop-shadow-lg" />
                </div>

                {/* Service Title & Description */}
                <h3 className="text-2xl font-bold text-white mb-4 neon-text-service">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  {service.shortDesc}
                </p>
                <p className="text-gray-500 mb-6 leading-relaxed text-xs">
                  {service.desc}
                </p>

                {/* Feature Tags */}
                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 2).map((feature, featureIndex) => (
                    <div key={featureIndex} className="feature-badge px-3 py-2 rounded-lg">
                      <span className="text-white text-xs font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                  {service.features.length > 2 && (
                    <div className="text-cyan-400 text-xs">
                      +{service.features.length - 2} more
                    </div>
                  )}
                </div>

                {/* Learn More Button */}
                <button className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-400 px-4 py-2 rounded-lg font-medium text-sm border border-cyan-400/30 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-purple-600/30 transition-all flex items-center justify-center">
                  Learn More
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card rounded-2xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-xl flex items-center justify-center`}>
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-gray-400 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-300 mb-8 text-lg font-light">
              Ready to transform your business with 
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold"> cutting-edge technology</span>?
            </p>
            <button 
              onClick={openWhatsApp}
              className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 pulse-glow-service"
            >
              <span className="relative z-10 flex items-center">
                Discuss Your Project
                <MessageCircle className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* WhatsApp Float Button */}
        <div className="whatsapp-float">
          <button
            onClick={openWhatsApp}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
            title="Chat with us on WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Promo Video Modal */}

                <PromoVideo />
            
   
  

        {/* Service Detail Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 modal-overlay flex items-center justify-center p-4">
            <div className="modal-content rounded-3xl p-8 max-w-4xl w-full shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${selectedService.gradient} rounded-2xl flex items-center justify-center mr-6 shadow-xl`}>
                    <selectedService.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white neon-text-service">
                      {selectedService.title}
                    </h2>
                    <p className="text-cyan-400 text-lg">
                      {selectedService.shortDesc}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              {/* Who Needs It Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Zap className="w-6 h-6 mr-3 text-cyan-400" />
                  Who Needs This Service?
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedService.whoNeedsIt.map((item, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mr-3"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Challenges Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-purple-400" />
                  Business Challenges We Solve
                </h3>
                <div className="space-y-3">
                  {selectedService.businessChallenges.map((challenge, index) => (
                    <div key={index} className="flex items-start text-gray-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-emerald-400" />
                  Key Features & Technologies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedService.features.map((feature, index) => (
                    <div key={index} className="feature-badge px-4 py-2 rounded-lg">
                      <span className="text-white font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-pink-400" />
                  Complete Guide & Benefits
                </h3>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  {selectedService.detailedDescription.split('\n').map((paragraph, index) => {
                    if (paragraph.trim() === '') return null;
                    
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h4 key={index} className="text-xl font-bold text-white mt-6 mb-3">
                          {paragraph.replace(/\*\*/g, '')}
                        </h4>
                      );
                    }
                    
                    if (paragraph.startsWith('•')) {
                      return (
                        <div key={index} className="flex items-start ml-4">
                          <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span>{paragraph.substring(2)}</span>
                        </div>
                      );
                    }
                    
                    return (
                      <p key={index} className="leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700">
                <button
                  onClick={openWhatsApp}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Discuss This Service
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  View Other Services
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ServicesSection;