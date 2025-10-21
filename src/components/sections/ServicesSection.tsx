import React, { useState } from 'react';
import { Globe, Smartphone, Database, BarChart3, Zap, Shield, Clock, TrendingUp, X, ExternalLink, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/language';

const ServicesSection = () => {
  const { language } = useLanguage();
  const [selectedService, setSelectedService] = useState<any>(null);

  // Mock translations - replace with actual servicesTranslations import
  const servicesTranslations = {
    en: {
      premiumServices: "Premium Services",
      sectionTitle: "Transform Your",
      sectionSubtitle: "Digital Presence",
      sectionDescription: "Elevate your business with",
      sectionDescriptionHighlight: "cutting-edge solutions",
      sectionDescriptionEnd: "tailored to your needs",
      learnMore: "Learn More",
      ctaDescription: "Ready to elevate your business",
      ctaDescriptionHighlight: "to the next level",
      ctaButton: "Start Your Project",
      whoNeedsTitle: "Who Needs This?",
      challengesTitle: "Business Challenges",
      featuresTitle: "Key Features",
      guideTitle: "Detailed Guide",
      discussButton: "Discuss on WhatsApp",
      otherServicesButton: "View Other Services",
      services: [
        {
          icon: Globe,
          title: "Web Development",
          shortDesc: "Custom websites",
          desc: "Responsive, fast, and SEO-optimized",
          gradient: "from-cyan-500 to-blue-600",
          features: ["Responsive Design", "SEO Optimization", "Fast Loading", "Custom CMS"],
          whoNeedsIt: ["Small Businesses", "Enterprises", "E-commerce"],
          businessChallenges: ["Poor online presence", "Slow website", "Low conversions"],
          detailedDescription: "**Modern Web Solutions**\n\nWe build fast, responsive websites that convert visitors into customers.\n\n• Custom designs\n• SEO optimized\n• Mobile-first approach"
        },
        {
          icon: Smartphone,
          title: "Mobile Apps",
          shortDesc: "iOS & Android",
          desc: "Native and cross-platform solutions",
          gradient: "from-purple-500 to-pink-600",
          features: ["Cross-Platform", "Native Performance", "Push Notifications", "Offline Support"],
          whoNeedsIt: ["Startups", "Growing Businesses", "Service Providers"],
          businessChallenges: ["Mobile engagement", "User retention", "App performance"],
          detailedDescription: "**Mobile Excellence**\n\nCreate engaging mobile experiences for your users.\n\n• iOS & Android\n• React Native\n• Flutter"
        },
        {
          icon: Database,
          title: "Backend Systems",
          shortDesc: "Scalable APIs",
          desc: "Robust server infrastructure",
          gradient: "from-emerald-500 to-teal-600",
          features: ["RESTful APIs", "Database Design", "Cloud Integration", "Security"],
          whoNeedsIt: ["Tech Companies", "SaaS Providers", "Data-driven Businesses"],
          businessChallenges: ["System scalability", "Data management", "Integration issues"],
          detailedDescription: "**Powerful Backend**\n\nBuild scalable server infrastructure.\n\n• Node.js\n• Python\n• Database optimization"
        },
        {
          icon: BarChart3,
          title: "Analytics",
          shortDesc: "Data insights",
          desc: "Track and optimize performance",
          gradient: "from-orange-500 to-red-600",
          features: ["Real-time Data", "Custom Dashboards", "Reports", "Predictions"],
          whoNeedsIt: ["Marketing Teams", "Executives", "Product Managers"],
          businessChallenges: ["Data visibility", "Decision making", "Performance tracking"],
          detailedDescription: "**Data-Driven Insights**\n\nMake informed decisions with analytics.\n\n• Custom dashboards\n• Real-time tracking\n• Predictive analytics"
        },
        {
          icon: Shield,
          title: "Security",
          shortDesc: "Protection",
          desc: "Enterprise-grade security",
          gradient: "from-indigo-500 to-purple-600",
          features: ["Encryption", "Authentication", "Compliance", "Monitoring"],
          whoNeedsIt: ["All Businesses", "Financial Services", "Healthcare"],
          businessChallenges: ["Data breaches", "Compliance", "Trust issues"],
          detailedDescription: "**Security First**\n\nProtect your business and users.\n\n• SSL/TLS\n• OAuth 2.0\n• GDPR compliance"
        }
      ],
      benefits: [
        { title: "Fast Delivery", desc: "Quick turnaround times" },
        { title: "Secure", desc: "Enterprise-grade security" },
        { title: "24/7 Support", desc: "Always here to help" },
        { title: "Scalable", desc: "Grows with your business" }
      ]
    },
    sw: {
      premiumServices: "Huduma Bora",
      sectionTitle: "Badilisha",
      sectionSubtitle: "Uwepo Wako wa Kidijitali",
      sectionDescription: "Pandisha biashara yako na",
      sectionDescriptionHighlight: "suluhisho za kisasa",
      sectionDescriptionEnd: "zilizoundwa kwa mahitaji yako",
      learnMore: "Jifunze Zaidi",
      ctaDescription: "Uko tayari kupandisha biashara yako",
      ctaDescriptionHighlight: "kwa ngazi mpya",
      ctaButton: "Anza Mradi Wako",
      whoNeedsTitle: "Nani Anahitaji Hii?",
      challengesTitle: "Changamoto za Biashara",
      featuresTitle: "Vipengele Muhimu",
      guideTitle: "Mwongozo wa Kina",
      discussButton: "Jadili kwenye WhatsApp",
      otherServicesButton: "Angalia Huduma Zingine",
      services: [
        {
          icon: Globe,
          title: "Utengenezaji wa Wavuti",
          shortDesc: "Tovuti maalum",
          desc: "Zinazoitikia, za haraka, na SEO",
          gradient: "from-cyan-500 to-blue-600",
          features: ["Muundo Unaotikia", "SEO Optimization", "Upakiaji wa Haraka", "CMS Maalum"],
          whoNeedsIt: ["Biashara Ndogo", "Makampuni Makubwa", "E-commerce"],
          businessChallenges: ["Uwepo duni mtandaoni", "Tovuti polepole", "Ubadilishaji wa chini"],
          detailedDescription: "**Suluhisho za Wavuti za Kisasa**\n\nTunajenga tovuti za haraka zinazobadilisha wageni kuwa wateja.\n\n• Miundo maalum\n• SEO optimized\n• Mbinu ya simu kwanza"
        },
        {
          icon: Smartphone,
          title: "Programu za Simu",
          shortDesc: "iOS & Android",
          desc: "Suluhisho za asili na cross-platform",
          gradient: "from-purple-500 to-pink-600",
          features: ["Cross-Platform", "Utendaji wa Asili", "Arifa za Push", "Msaada Nje ya Mtandao"],
          whoNeedsIt: ["Biashara Mpya", "Biashara Zinazokua", "Watoa Huduma"],
          businessChallenges: ["Ushirikiano wa simu", "Uhifadhi wa watumiaji", "Utendaji wa programu"],
          detailedDescription: "**Ubora wa Simu**\n\nUnda uzoefu wa kuvutia wa simu kwa watumiaji wako.\n\n• iOS & Android\n• React Native\n• Flutter"
        },
        {
          icon: Database,
          title: "Mifumo ya Backend",
          shortDesc: "APIs Zinazopanuka",
          desc: "Miundombinu imara ya seva",
          gradient: "from-emerald-500 to-teal-600",
          features: ["RESTful APIs", "Muundo wa Database", "Ushirikiano wa Cloud", "Usalama"],
          whoNeedsIt: ["Makampuni ya Teknolojia", "Watoa SaaS", "Biashara Zinazotegemea Data"],
          businessChallenges: ["Upanuzi wa mfumo", "Usimamizi wa data", "Masuala ya ushirikiano"],
          detailedDescription: "**Backend Yenye Nguvu**\n\nJenga miundombinu ya seva inayopanuka.\n\n• Node.js\n• Python\n• Uboreshaji wa database"
        },
        {
          icon: BarChart3,
          title: "Uchambuzi",
          shortDesc: "Maarifa ya data",
          desc: "Fuatilia na uboreshe utendaji",
          gradient: "from-orange-500 to-red-600",
          features: ["Data ya Muda Halisi", "Dashibodi Maalum", "Ripoti", "Utabiri"],
          whoNeedsIt: ["Timu za Masoko", "Watendaji", "Wasimamizi wa Bidhaa"],
          businessChallenges: ["Uonekano wa data", "Ufanyaji maamuzi", "Ufuatiliaji wa utendaji"],
          detailedDescription: "**Maarifa Yanayotegemea Data**\n\nFanya maamuzi yenye taarifa na uchambuzi.\n\n• Dashibodi maalum\n• Ufuatiliaji wa muda halisi\n• Uchambuzi wa kutabiri"
        },
        {
          icon: Shield,
          title: "Usalama",
          shortDesc: "Ulinzi",
          desc: "Usalama wa ngazi ya biashara",
          gradient: "from-indigo-500 to-purple-600",
          features: ["Usimbaji", "Uthibitishaji", "Uzingatiaji", "Ufuatiliaji"],
          whoNeedsIt: ["Biashara Zote", "Huduma za Kifedha", "Huduma za Afya"],
          businessChallenges: ["Uvunjaji wa data", "Uzingatiaji", "Masuala ya uaminifu"],
          detailedDescription: "**Usalama Kwanza**\n\nLinda biashara na watumiaji wako.\n\n• SSL/TLS\n• OAuth 2.0\n• Uzingatiaji wa GDPR"
        }
      ],
      benefits: [
        { title: "Utoaji Haraka", desc: "Muda wa kuzunguka haraka" },
        { title: "Salama", desc: "Usalama wa ngazi ya biashara" },
        { title: "Msaada 24/7", desc: "Daima hapa kusaidia" },
        { title: "Inapanuka", desc: "Inakua na biashara yako" }
      ]
    }
  };

  const t = servicesTranslations[language as keyof typeof servicesTranslations];
  const services = t.services;
  const benefits = t.benefits;

  const openWhatsApp = () => {
    const message = "Hi! I'm interested in learning more about your development services. Could you please provide more information?";
    const url = `https://wa.me/255765762688?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <section id="services" className="relative py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Subtle Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-cyan-500/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-sm rounded-full mb-4 border border-white/10">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-xs font-medium uppercase tracking-wider">
                {t.premiumServices}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {t.sectionTitle}
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {t.sectionSubtitle}
              </span>
            </h2>
            <p className="text-base text-gray-400 max-w-2xl mx-auto">
              {t.sectionDescription}
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold"> {t.sectionDescriptionHighlight}</span> {t.sectionDescriptionEnd}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedService(service)}
              >
                {/* Service Icon */}
                <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-4`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-2 text-sm">
                  {service.shortDesc}
                </p>
                <p className="text-gray-500 mb-4 text-xs">
                  {service.desc}
                </p>

                {/* Feature Count */}
                <div className="text-cyan-400 text-xs flex items-center">
                  {service.features.length} {t.featuresTitle.toLowerCase()}
                  <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
                    {index === 0 && <Zap className="w-5 h-5 text-white" />}
                    {index === 1 && <Shield className="w-5 h-5 text-white" />}
                    {index === 2 && <Clock className="w-5 h-5 text-white" />}
                    {index === 3 && <TrendingUp className="w-5 h-5 text-white" />}
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{benefit.title}</h4>
                <p className="text-gray-400 text-xs">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-400 mb-6 text-sm">
              {t.ctaDescription}
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold"> {t.ctaDescriptionHighlight}</span>?
            </p>
            <button 
              onClick={openWhatsApp}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
            >
              {t.ctaButton}
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* WhatsApp Float Button */}
        <button
          onClick={openWhatsApp}
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          title="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </button>

        {/* Service Detail Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${selectedService.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <selectedService.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedService.title}
                    </h2>
                    <p className="text-cyan-400 text-sm">
                      {selectedService.shortDesc}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Who Needs It */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-cyan-400" />
                  {t.whoNeedsTitle}
                </h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {selectedService.whoNeedsIt.map((item: string, index: number) => (
                    <div key={index} className="flex items-center text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mr-2"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Challenges */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                  {t.challengesTitle}
                </h3>
                <div className="space-y-2">
                  {selectedService.businessChallenges.map((challenge:string, index:number) => (
                    <div key={index} className="flex items-start text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-emerald-400" />
                  {t.featuresTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedService.features.map((feature:string, index:number) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                      <span className="text-white text-xs font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Description */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-pink-400" />
                  {t.guideTitle}
                </h3>
                <div className="text-gray-300 text-sm leading-relaxed space-y-3">
                  {selectedService.detailedDescription.split('\n').map((paragraph:string, index:number) => {
                    if (paragraph.trim() === '') return null;
                    
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h4 key={index} className="text-base font-bold text-white mt-4 mb-2">
                          {paragraph.replace(/\*\*/g, '')}
                        </h4>
                      );
                    }
                    
                    if (paragraph.startsWith('•')) {
                      return (
                        <div key={index} className="flex items-start ml-4">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                          <span>{paragraph.substring(2)}</span>
                        </div>
                      );
                    }
                    
                    return <p key={index}>{paragraph}</p>;
                  })}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-700">
                <button
                  onClick={openWhatsApp}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t.discussButton}
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  {t.otherServicesButton}
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