import React from 'react';

const PartnersBanner = () => {
  // Template client data - replace with your actual clients
  const partners = [
    { id: 1, name: "TechCorp Solutions", logo: "TC", industry: "Technology" },
    { id: 2, name: "Green Valley Church", logo: "GV", industry: "Religious" },
    { id: 3, name: "Metro Fitness Club", logo: "MF", industry: "Fitness" },
    { id: 4, name: "Apex Manufacturing", logo: "AM", industry: "Manufacturing" },
    { id: 5, name: "Urban Design Studio", logo: "UD", industry: "Design" },
    { id: 6, name: "Coastal Accounting", logo: "CA", industry: "Finance" },
    { id: 7, name: "Bright Learning Center", logo: "BL", industry: "Education" },
    { id: 8, name: "Summit Healthcare", logo: "SH", industry: "Healthcare" },
  ];

  return (
    <>
      <style jsx>{`
        .scroll-3d {
          animation: scroll3d 25s linear infinite;
          transform-style: preserve-3d;
        }
        
        .scroll-3d:hover {
          animation-play-state: paused;
        }
        
        @keyframes scroll3d {
          0% { transform: translateX(0) rotateY(0deg); }
          100% { transform: translateX(-50%) rotateY(5deg); }
        }
        
        .partner-card-3d {
          transform-style: preserve-3d;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .partner-card-3d:hover {
          transform: translateY(-12px) rotateY(8deg) rotateX(5deg);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.3),
            0 0 30px rgba(102, 126, 234, 0.2),
            0 0 50px rgba(118, 75, 162, 0.1);
          border-color: rgba(102, 126, 234, 0.3);
        }
        
        .logo-gradient-3d {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          box-shadow: 
            0 8px 16px rgba(102, 126, 234, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        .bg-mesh-dark {
          background-image: 
            radial-gradient(circle at 25% 25%, #667eea 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, #764ba2 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, #f093fb 0%, transparent 50%);
        }
        
        .floating-3d {
          animation: float3d 8s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        
        @keyframes float3d {
          0%, 100% { 
            transform: translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg); 
          }
          25% { 
            transform: translateY(-15px) translateZ(20px) rotateX(10deg) rotateY(15deg); 
          }
          50% { 
            transform: translateY(-20px) translateZ(10px) rotateX(-5deg) rotateY(-10deg); 
          }
          75% { 
            transform: translateY(-10px) translateZ(30px) rotateX(15deg) rotateY(5deg); 
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
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .glass-stat:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
                  Trusted Partners
                </span>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 neon-text">
              POWERING
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                INNOVATION
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
              Collaborating with forward-thinking companies to 
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold"> transform their digital presence</span>
            </p>
          </div>

          {/* 3D Scrolling Partners */}
          <div className="relative perspective-1000 mb-20">
            <div className="flex space-x-8 scroll-3d">
              {/* Duplicate the array for seamless scrolling */}
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="partner-card-3d rounded-2xl p-8 min-w-[320px] shadow-2xl"
                >
                  <div className="flex items-center space-x-5">
                    {/* 3D Logo */}
                    <div className="logo-gradient-3d w-18 h-18 rounded-2xl flex items-center justify-center transform-gpu">
                      <span className="text-white font-bold text-2xl drop-shadow-lg">
                        {partner.logo}
                      </span>
                    </div>
                    
                    {/* Company Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-white mb-2 neon-text">
                        {partner.name}
                      </h3>
                      <p className="text-gray-400 text-sm uppercase tracking-wider">
                        {partner.industry}
                      </p>
                    </div>
                    
                    {/* Status Indicator */}
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mb-2 pulse-glow"></div>
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Active</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            <div className="glass-stat rounded-2xl p-6 text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">8+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Active Clients</div>
            </div>
            <div className="glass-stat rounded-2xl p-6 text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">5</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Industries</div>
            </div>
            <div className="glass-stat rounded-2xl p-6 text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-3">98%</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Retention</div>
            </div>
            <div className="glass-stat rounded-2xl p-6 text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-3">24/7</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Support</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-300 mb-8 text-lg font-light">
              Ready to join these 
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold"> innovative companies</span>?
            </p>
            <button className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 neon-glow">
              <span className="relative z-10">
                Start Your Partnership
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