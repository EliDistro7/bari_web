import React from 'react';
import { useLanguage } from '@/context/language';

const PartnersBanner = () => {
  const {language} = useLanguage();

  type Language = 'en' | 'sw';
  type Translation = {
    trustedPartners: string;
    subtitle: string;
    activeClients: string;
    industries: string;
    retention: string;
    support: string;
    startPartnership: string;
  };

  const translations: Record<Language, Translation> = {
    en: {
      trustedPartners: "Trusted Partners",
      subtitle: "Collaborating with forward-thinking companies to transform their digital presence",
      activeClients: "Active Clients",
      industries: "Industries",
      retention: "Retention",
      support: "Support",
      startPartnership: "Start Your Partnership"
    },
    sw: {
      trustedPartners: "Washirika wa Kuaminika",
      subtitle: "Kushirikiana na makampuni yanayotazama mbele ili kubadilisha uwepo wao wa kidijitali",
      activeClients: "Wateja hai",
      industries: "Viwanda",
      retention: "Kuhifadhi",
      support: "Msaada",
      startPartnership: "Anza Ushirikiano Wako"
    }
  };

  const t = translations[language as Language] || translations.en;

  const partnersData = {
    en: [
      { 
        id: 1, 
        name: "Amka Kijana Foundation", 
        logo: "AK",
        logoImage: "/images/partners/amka.png",
        industry: "Healthcare",
        color: "from-emerald-500 to-teal-600"
      },
      { 
        id: 2, 
        name: "KKKT Church Yombo", 
        logo: "KY",
        logoImage: "/images/partners/lutherRose.jpg",
        industry: "Religious",
        color: "from-blue-500 to-indigo-600"
      },
      { 
        id: 3, 
        name: "Ubuntu O House", 
        logo: "UO",
        logoImage: "/images/partners/ubuntu.jpeg",
        industry: "Technology",
        color: "from-purple-500 to-violet-600"
      },
      { 
        id: 4, 
        name: "LubeJunction", 
        logo: "LJ",
        logoImage: "/images/partners/lube.jpg",
        industry: "Automotive",
        color: "from-orange-500 to-red-600"
      },
      { 
        id: 5, 
        name: "Raha Energise", 
        logo: "RE",
        logoImage: "/images/partners/raha-energise-logo.png",
        industry: "Industrial",
        color: "from-yellow-500 to-amber-600"
      },
      { 
        id: 6, 
        name: "Future Holders Company", 
        logo: "FH",
        logoImage: "/images/partners/fh.png",
        industry: "Marketing",
        color: "from-pink-500 to-rose-600"
      },
      { 
        id: 7, 
        name: "Fourfreyn Company", 
        logo: "FF",
        logoImage: "/images/partners/fourfreyn-logo.png",
        industry: "Agriculture",
        color: "from-green-500 to-emerald-600"
      },
    ],
    sw: [
      { 
        id: 1, 
        name: "Amka Kijana Foundation", 
        logo: "AK",
        logoImage: "/images/partners/amka.png",
        industry: "Afya",
        color: "from-emerald-500 to-teal-600"
      },
      { 
        id: 2, 
        name: "KKKT Church Yombo", 
        logo: "KY",
        logoImage: "/images/partners/lutherRose.jpg",
        industry: "Kidini",
        color: "from-blue-500 to-indigo-600"
      },
      { 
        id: 3, 
        name: "Ubuntu O House", 
        logo: "UO",
        logoImage: "/images/partners/ubuntu.jpeg",
        industry: "Teknolojia",
        color: "from-purple-500 to-violet-600"
      },
      { 
        id: 4, 
        name: "LubeJunction", 
        logo: "LJ",
        logoImage: "/images/partners/lube.jpg",
        industry: "Magari",
        color: "from-orange-500 to-red-600"
      },
      { 
        id: 5, 
        name: "Raha Energise", 
        logo: "RE",
        logoImage: "/images/partners/raha-energise-logo.png",
        industry: "Viwanda",
        color: "from-yellow-500 to-amber-600"
      },
      { 
        id: 6, 
        name: "Future Holders Company", 
        logo: "FH",
        logoImage: "/images/partners/fh.png",
        industry: "Uuzaji",
        color: "from-pink-500 to-rose-600"
      },
      { 
        id: 7, 
        name: "Fourfreyn Company", 
        logo: "FF",
        logoImage: "/images/partners/fourfreyn-logo.png",
        industry: "Kilimo",
        color: "from-green-500 to-emerald-600"
      },
    ]
  };

  const partners = partnersData[language as 'en' | 'sw'] || partnersData.en;

  type Partner = {
    id: number;
    name: string;
    logo: string;
    logoImage: string;
    industry: string;
    color: string;
  };

  const PartnerLogo = ({ partner }: { partner: Partner }) => {
    const [imageError, setImageError] = React.useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    if (imageError || !partner.logoImage) {
      return (
        <div className={`w-16 h-16 bg-gradient-to-br ${partner.color} rounded-2xl flex items-center justify-center shadow-lg`}>
          <span className="text-white font-black text-xl tracking-tight">
            {partner.logo}
          </span>
        </div>
      );
    }

    return (
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg p-2 border border-gray-100">
        <img
          src={partner.logoImage}
          alt={`${partner.name} logo`}
          className="w-full h-full object-contain"
          onError={handleImageError}
        />
      </div>
    );
  };

  const StatsCard = ({ value, label, color, delay }: { value: string; label: string; color: string; delay: string }) => (
    <div className={`group bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 hover:bg-white/15 hover:border-white/30 hover:scale-105 transform transition-all duration-500 ${delay} hover:shadow-2xl hover:shadow-cyan-500/10`}>
      <div className={`text-4xl font-black ${color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
        {value}
      </div>
      <div className="text-gray-300 text-sm font-semibold uppercase tracking-wider">
        {label}
      </div>
    </div>
  );

  return (
    <section id='partners' className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-full mb-8 border border-white/20">
            <span className="text-cyan-400 font-bold text-sm uppercase tracking-widest">
              {t.trustedPartners}
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
            Our Partners
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className={`group bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 hover:bg-white/15 hover:border-white/30 hover:scale-105 hover:-translate-y-2 transform transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  <PartnerLogo partner={partner} />
                </div>
                
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    {partner.name}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 text-sm font-semibold rounded-full border border-cyan-400/30">
                    {partner.industry}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
          <StatsCard
            value="7+"
            label={t.activeClients}
            color="text-cyan-400"
            delay="animate-slide-up-1"
          />
          <StatsCard
            value="6"
            label={t.industries}
            color="text-purple-400"
            delay="animate-slide-up-2"
          />
          <StatsCard
            value="98%"
            label={t.retention}
            color="text-emerald-400"
            delay="animate-slide-up-3"
          />
          <StatsCard
            value="24/7"
            label={t.support}
            color="text-pink-400"
            delay="animate-slide-up-4"
          />
        </div>

        {/* CTA */}
        <div className="text-center">
          <a 
            href="https://wa.me/255765762688?text=Hi%2C%20I%27m%20interested%20in%20starting%20a%20partnership%20with%20your%20team%21"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-2 border-transparent hover:border-white/20"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <svg 
                className="w-6 h-6" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              {t.startPartnership}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up-1 {
          animation: slide-up 0.8s ease-out 0.1s both;
        }
        .animate-slide-up-2 {
          animation: slide-up 0.8s ease-out 0.2s both;
        }
        .animate-slide-up-3 {
          animation: slide-up 0.8s ease-out 0.3s both;
        }
        .animate-slide-up-4 {
          animation: slide-up 0.8s ease-out 0.4s both;
        }
      `}</style>
    </section>
  );
};

export default PartnersBanner;