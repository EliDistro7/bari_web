'use client';

import { motion } from 'framer-motion';
import { Code2, Smartphone, Globe, Rocket, HeartHandshake, Award, Zap, Target } from 'lucide-react';
import { useLanguage } from '@/context/language';

export default function AboutMe() {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "About Me",
      greeting: "Hi, I'm Bari Kaneno",
      subtitle: "Software Developer & Digital Solutions Architect",
      intro: `I'm a passionate Software Developer from Dar es Salaam, Tanzania, specializing in building modern web and mobile applications that drive business growth and user engagement.`,
      details: `I create scalable, user-focused digital solutions using cutting-edge technologies like React, Next.js, Node.js, Laravel, and React Native. My expertise spans church management systems, marketing platforms, e-commerce solutions, and enterprise applications for startups and established businesses.`,
      philosophy: `"Great software is where creativity meets engineering — solving real problems while delivering exceptional user experiences."`,
      services: "Core Competencies",
      webDev: "Web Development",
      mobileDev: "Mobile Applications",
      backend: "Backend & API",
      launch: "Deployment & Support",
      stats: {
        projects: "10+",
        projectsLabel: "Projects Delivered",
        experience: "1.5+",
        experienceLabel: "Years Experience",
        clients: "7+",
        clientsLabel: "Happy Clients"
      },
      connect: "Ready to bring your ideas to life? Let's create something exceptional together.",
      contactMe: "Start a Conversation"
    },
    sw: {
      title: "Kuhusu Mimi",
      greeting: "Habari, mimi ni Bari Kaneno",
      subtitle: "Msanidi Programu & Mbunifu wa Suluhisho za Kidijitali",
      intro: `Mimi ni msanidi programu kutoka Dar es Salaam, Tanzania, ninayetengeneza tovuti na programu tumishi za kisasa zinazokua biashara na kushirikisha watumiaji.`,
      details: `Ninaunda suluhisho za kidijitali zenye ubora wa hali ya juu kwa kutumia teknolojia za kisasa kama React, Next.js, Node.js, Laravel, na React Native. Ujuzi wangu unajumuisha mifumo ya usimamizi wa makanisa, majukwaa ya uuzaji, suluhisho za biashara mtandaoni, na programu za biashara kwa kampuni zipya na zilizoimarika.`,
      philosophy: `"Programu bora ni mahali ambapo ubunifu unakutana na uhandisi — kutatua matatizo halisi huku ikitoa uzoefu wa kipekee kwa watumiaji."`,
      services: "Uwezo wa Msingi",
      webDev: "Uundaji wa Tovuti",
      mobileDev: "Programu za Simu",
      backend: "Backend & API",
      launch: "Uwekaji & Msaada",
      stats: {
        projects: "10+",
        projectsLabel: "Miradi Iliyokamilika",
        experience: "1.5+",
        experienceLabel: "Miaka ya Uzoefu",
        clients: "7+",
        clientsLabel: "Wateja Wenye Furaha"
      },
      connect: "Uko tayari kuleta mawazo yako kwenye uhalisia? Tushirikiane kuunda kitu cha kipekee.",
      contactMe: "Anza Mazungumzo"
    }
  };

  const t = translations[language as keyof typeof translations];

  const services = [
    { icon: Globe, label: t.webDev, gradient: "from-cyan-500 to-blue-600", bg: "bg-cyan-50" },
    { icon: Smartphone, label: t.mobileDev, gradient: "from-purple-500 to-pink-600", bg: "bg-purple-50" },
    { icon: Code2, label: t.backend, gradient: "from-emerald-500 to-teal-600", bg: "bg-emerald-50" },
    { icon: Rocket, label: t.launch, gradient: "from-orange-500 to-pink-600", bg: "bg-orange-50" },
  ];

  const openWhatsApp = () => {
    const message = language === 'en'
      ? "Hi Bari! I'm interested in your development services."
      : "Habari Bari! Napenda kujua zaidi kuhusu huduma zako za maendeleo ya programu.";
    const url = `https://wa.me/255765762688?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <style jsx>{`
        .section-bg {
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
        }
        
        .card-elevated {
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-elevated:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .profile-container {
          position: relative;
          width: 280px;
          height: 280px;
          margin: 0 auto;
        }
        
        .rotating-border {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            #06b6d4,
            #8b5cf6,
            #ec4899,
            #f59e0b,
            #06b6d4
          );
          animation: rotate 4s linear infinite;
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .profile-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: white;
          padding: 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }
        
        .profile-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid white;
        }
        
        .verified-badge {
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 50%;
          border: 5px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          z-index: 10;
        }
        
        .stat-card {
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #06b6d4, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .quote-card {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(139, 92, 246, 0.05));
          border-left: 4px solid #8b5cf6;
        }
      `}</style>

      <section className="section-bg py-24 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-200 to-pink-200 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              {t.title}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-5 gap-12 items-start mb-16">
            {/* Left Column - Profile */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="profile-container mb-8">
                <div className="rotating-border"></div>
                <div className="profile-wrapper">
                  <img 
                    src="/bari.png" 
                    alt="Bari Kaneno - Software Developer"
                    className="profile-image"
                  />
                </div>
                <div className="verified-badge">
                  <Award className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="stat-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-black gradient-text mb-1">
                    {t.stats.projects}
                  </div>
                  <div className="text-xs text-gray-600 font-semibold leading-tight">
                    {t.stats.projectsLabel}
                  </div>
                </div>
                <div className="stat-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-black gradient-text mb-1">
                    {t.stats.experience}
                  </div>
                  <div className="text-xs text-gray-600 font-semibold leading-tight">
                    {t.stats.experienceLabel}
                  </div>
                </div>
                <div className="stat-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-black gradient-text mb-1">
                    {t.stats.clients}
                  </div>
                  <div className="text-xs text-gray-600 font-semibold leading-tight">
                    {t.stats.clientsLabel}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 space-y-6"
            >
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {t.greeting}
                </h3>
                <p className="text-xl text-gray-600 font-semibold mb-6">
                  {t.subtitle}
                </p>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                {t.intro}
              </p>

              <p className="text-base text-gray-600 leading-relaxed">
                {t.details}
              </p>

              <div className="quote-card p-6 rounded-xl">
                <Zap className="w-8 h-8 text-purple-600 mb-3" />
                <p className="text-gray-800 italic font-medium text-lg leading-relaxed">
                  {t.philosophy}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-elevated rounded-3xl p-8 md:p-12"
          >
            <div className="flex items-center justify-center mb-10">
              <Target className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-3xl md:text-4xl font-black text-gray-900">
                {t.services}
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {services.map(({ icon: Icon, label, gradient, bg }, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={`${bg} rounded-2xl p-6 text-center border border-gray-100 cursor-pointer transition-all`}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm font-bold text-gray-900 block">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center border-t border-gray-100 pt-10">
              <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
                {t.connect}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openWhatsApp}
                className="inline-flex items-center bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                <HeartHandshake className="w-6 h-6 mr-3" />
                {t.contactMe}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}