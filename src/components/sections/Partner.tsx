import React from 'react';
import { useLanguage } from '@/context/language';

const PartnersBanner = () => {
  const {language} = useLanguage();

  const openWhatsApp = () => {
    const message = "Hi! I'm interested in learning more about your development services. Could you please provide more information?";
    const url = `https://wa.me/255765762688?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

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
      subtitle: "Collaborating with forward-thinking companies",
      activeClients: "Active Clients",
      industries: "Industries",
      retention: "Retention",
      support: "Support",
      startPartnership: "Start Your Partnership"
    },
    sw: {
      trustedPartners: "Washirika wa Kuaminika",
      subtitle: "Kushirikiana na makampuni yanayotazama mbele",
      activeClients: "Wateja hai",
      industries: "Viwanda",
      retention: "Kuhifadhi",
      support: "Msaada",
      startPartnership: "Anza Project yako"
    }
  };

  const t = translations[language as Language] || translations.en;

  const partnersData = {
    en: [
      { id: 1, name: "Amka Kijana Foundation", logo: "AK", logoImage: "/images/partners/amka.png", industry: "Healthcare", color: "from-emerald-500 to-teal-600" },
      { id: 2, name: "KKKT Church Yombo", logo: "KY", logoImage: "/images/partners/lutherRose.jpg", industry: "Religious", color: "from-blue-500 to-indigo-600" },
      { id: 3, name: "Ubuntu O House", logo: "UO", logoImage: "/images/partners/ubuntu.jpeg", industry: "Technology", color: "from-purple-500 to-violet-600" },
      { id: 4, name: "LubeJunction", logo: "LJ", logoImage: "/images/partners/lube.jpg", industry: "Automotive", color: "from-orange-500 to-red-600" },
      { id: 5, name: "Raha Energise", logo: "RE", logoImage: "/images/partners/raha-energise-logo.png", industry: "Industrial", color: "from-yellow-500 to-amber-600" },
      { id: 6, name: "Future Holders Company", logo: "FH", logoImage: "/images/partners/fh.png", industry: "Marketing", color: "from-pink-500 to-rose-600" },
      { id: 7, name: "Fourfreyn Company", logo: "FF", logoImage: "/images/partners/fourfreyn-logo.png", industry: "Agriculture", color: "from-green-500 to-emerald-600" },
    ],
    sw: [
      { id: 1, name: "Amka Kijana Foundation", logo: "AK", logoImage: "/images/partners/amka.png", industry: "Afya", color: "from-emerald-500 to-teal-600" },
      { id: 2, name: "KKKT Church Yombo", logo: "KY", logoImage: "/images/partners/lutherRose.jpg", industry: "Kidini", color: "from-blue-500 to-indigo-600" },
      { id: 3, name: "Ubuntu O House", logo: "UO", logoImage: "/images/partners/ubuntu.jpeg", industry: "Teknolojia", color: "from-purple-500 to-violet-600" },
      { id: 5, name: "Chui Batteries", logo: "RE", logoImage: "/images/projects/chui.jpeg", industry: "Viwanda", color: "from-yellow-500 to-amber-600" },
      { id: 6, name: "Future Holders Company", logo: "FH", logoImage: "/images/partners/fh.png", industry: "Uuzaji", color: "from-pink-500 to-rose-600" },
      { id: 7, name: "Fourfreyn Company", logo: "FF", logoImage: "/images/partners/fourfreyn.jpg", industry: "Kilimo", color: "from-green-500 to-emerald-600" },
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

    if (imageError || !partner.logoImage) {
      return (
        <div className={`w-12 h-12 bg-gradient-to-br ${partner.color} rounded-xl flex items-center justify-center`}>
          <span className="text-white font-bold text-sm">
            {partner.logo}
          </span>
        </div>
      );
    }

    return (
      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5">
        <img
          src={partner.logoImage}
          alt={`${partner.name} logo`}
          className="w-full h-full object-contain"
          onError={() => setImageError(true)}
        />
      </div>
    );
  };

  return (
    <section id='partners' className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-cyan-500/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-sm rounded-full mb-4 border border-white/10">
            <span className="text-cyan-400 text-xs font-medium uppercase tracking-wider">
              {t.trustedPartners}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            My Partners
          </h2>
          
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Partners Grid - Minimalist */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-16">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <PartnerLogo partner={partner} />
                <div className="w-full">
                  <h3 className="text-white text-xs font-medium leading-tight truncate">
                    {partner.name}
                  </h3>
                  <span className="text-cyan-400/70 text-xs">
                    {partner.industry}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats - Minimalist */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400 mb-1">7+</div>
            <div className="text-gray-400 text-xs uppercase tracking-wider">{t.activeClients}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">6</div>
            <div className="text-gray-400 text-xs uppercase tracking-wider">{t.industries}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400 mb-1">98%</div>
            <div className="text-gray-400 text-xs uppercase tracking-wider">{t.retention}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-pink-400 mb-1">24/7</div>
            <div className="text-gray-400 text-xs uppercase tracking-wider">{t.support}</div>
          </div>
        </div>

        {/* CTA - Minimalist */}
        <div className="text-center">
          <button 
            onClick={openWhatsApp}
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            {t.startPartnership}
          </button>
        </div>
      </div>
    </section>
  );
};

export default PartnersBanner;