import React from 'react';
import { Globe, QrCode, Phone, Calendar } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#EBF5FB] via-[#F8F9FA] to-white px-4 sm:px-6 lg:px-8 py-24">
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col items-center text-center space-y-12">
          
          {/* Visual Mockup - Business Card + Phone */}
          <div className="relative w-full max-w-md mb-8">
            <div className="relative">
              {/* Business Card with soft shadow */}
              <div className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-500">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2C3E50] to-[#5D6D7E] rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">BK</span>
                    </div>
                    <div className="text-left">
                      <h3 className="text-base font-semibold text-[#2C3E50] leading-tight">BARI</h3>
                      <h3 className="text-base font-semibold text-[#2C3E50] leading-tight">KANENO</h3>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm font-medium text-[#2C3E50]">Juma Makono</p>
                  <p className="text-xs text-[#7F8C8D] mt-1">CEO & Founder</p>
                </div>

                {/* QR Code */}
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 bg-[#F8F9FA] rounded-2xl flex items-center justify-center border-2 border-[#ECF0F1]">
                    <div className="w-28 h-28 bg-white rounded-xl grid grid-cols-8 grid-rows-8 gap-[2px] p-2">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`${Math.random() > 0.5 ? 'bg-[#2C3E50]' : 'bg-white'} rounded-sm`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-[#5D6D7E]">
                  <p>📞 +255 765 762 688</p>
                  <p>✉️ juma@example.com</p>
                </div>
              </div>

              {/* Phone mockup positioned beside card */}
              <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-40 z-20 hidden sm:block">
                <div className="bg-[#2C3E50] rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    <div className="aspect-[9/19] bg-gradient-to-b from-[#F8F9FA] to-white p-3 space-y-2">
                      <div className="h-1 w-16 bg-[#ECF0F1] rounded-full mx-auto mb-3"></div>
                      <div className="h-6 bg-gradient-to-r from-[#F8B195] to-[#F9C4A8] rounded-lg"></div>
                      <div className="space-y-1.5">
                        <div className="h-12 bg-[#ECF0F1] rounded-lg"></div>
                        <div className="h-10 bg-[#ECF0F1] rounded-lg"></div>
                        <div className="h-10 bg-[#ECF0F1] rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Soft glow effect */}
              <div className="absolute -inset-6 bg-gradient-to-br from-[#45B7D1]/10 to-[#5DADE2]/10 blur-3xl -z-10"></div>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#2C3E50] leading-tight tracking-tight">
              Biashara Yako, Scan Moja Tu
            </h1>
            <p className="text-lg sm:text-xl text-[#7F8C8D] font-light leading-relaxed">
              Professional business card + beautiful website + instant access
            </p>
          </div>

          {/* Feature Icons - Horizontal Row */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-3xl">
            <div className="flex flex-col items-center space-y-2 text-center min-w-[140px]">
              <div className="w-14 h-14 bg-gradient-to-br from-[#ECF0F1] to-[#D5DBDB] rounded-2xl flex items-center justify-center">
                <Globe className="w-7 h-7 text-[#45B7D1]" />
              </div>
              <p className="text-sm font-medium text-[#2C3E50] leading-snug">Website yako<br/>mwenyewe</p>
            </div>

            <div className="flex flex-col items-center space-y-2 text-center min-w-[140px]">
              <div className="w-14 h-14 bg-gradient-to-br from-[#ECF0F1] to-[#D5DBDB] rounded-2xl flex items-center justify-center">
                <QrCode className="w-7 h-7 text-[#45B7D1]" />
              </div>
              <p className="text-sm font-medium text-[#2C3E50] leading-snug">QR Code<br/>ya kisasa</p>
            </div>

            <div className="flex flex-col items-center space-y-2 text-center min-w-[140px]">
              <div className="w-14 h-14 bg-gradient-to-br from-[#ECF0F1] to-[#D5DBDB] rounded-2xl flex items-center justify-center">
                <Phone className="w-7 h-7 text-[#45B7D1]" />
              </div>
              <p className="text-sm font-medium text-[#2C3E50] leading-snug">WhatsApp na<br/>simu kwa moja</p>
            </div>

            <div className="flex flex-col items-center space-y-2 text-center min-w-[140px]">
              <div className="w-14 h-14 bg-gradient-to-br from-[#ECF0F1] to-[#D5DBDB] rounded-2xl flex items-center justify-center">
                <Calendar className="w-7 h-7 text-[#45B7D1]" />
              </div>
              <p className="text-sm font-medium text-[#2C3E50] leading-snug">Tayari kwa<br/>siku 2-3</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-3">
            <button className="px-12 py-4 bg-gradient-to-r from-[#F8B195] to-[#F9C4A8] text-white text-lg font-medium rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Anza Leo - 50,000/=
            </button>
            <p className="text-sm text-[#7F8C8D]">
              Wasiliana: <span className="font-medium text-[#45B7D1]">0765 762 688</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;