'use client';

import { motion } from 'framer-motion';
import { Code2, Smartphone, Globe, Rocket, HeartHandshake } from 'lucide-react';
import { useLanguage } from '@/context/language';

export default function AboutMe() {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "About Me",
      greeting: "Hi, I'm Bari Kaneno 👋",
      intro: `I'm a passionate Software Developer from Dar es Salaam, Tanzania, specializing in building modern web and mobile applications.`,
      details: `I create scalable, user-focused digital solutions using technologies like React, Next.js, Node.js, Laravel, and React Native. 
      My work spans church systems, marketing platforms, e-commerce stores, and enterprise solutions for both startups and growing businesses.`,
      philosophy: `I believe great software blends creativity and engineering — solving real problems while delivering smooth user experiences.`,
      services: "What I Offer",
      webDev: "Web Development",
      mobileDev: "Mobile Apps",
      backend: "Backend & API Design",
      launch: "Deployment & Maintenance",
      connect: "Let's collaborate and build something meaningful together.",
      contactMe: "Contact Me"
    },
    sw: {
      title: "Kuhusu Mimi",
      greeting: "Habari, mimi ni Bari Kaneno 👋",
      intro: `Mimi ni msanidi programu kutoka Dar es Salaam, Tanzania, ninayetengeneza tovuti na programu tumishi za kisasa.`,
      details: `Ninaunda suluhisho za kidijitali zenye ubora wa hali ya juu kwa kutumia teknolojia kama React, Next.js, Node.js, Laravel, na React Native. 
      Kazi zangu ni pamoja na mifumo ya makanisa, majukwaa ya uuzaji, maduka ya mtandaoni, na mifumo ya biashara kwa kampuni zinazokua.`,
      philosophy: `Ninaamini programu bora inachanganya ubunifu na uhandisi — kutatua changamoto halisi huku ikitoa uzoefu bora kwa watumiaji.`,
      services: "Huduma Ninazotoa",
      webDev: "Uundaji wa Tovuti",
      mobileDev: "Programu za Simu",
      backend: "Backend & Ubunifu wa API",
      launch: "Uwekaji Mtandaoni & Matengenezo",
      connect: "Tushirikiane kutengeneza kitu cha maana pamoja.",
      contactMe: "Wasiliana Nami"
    }
  };

  const t = translations[language as keyof typeof translations];

  const services = [
    { icon: Globe, label: t.webDev, gradient: "from-cyan-500 to-blue-600" },
    { icon: Smartphone, label: t.mobileDev, gradient: "from-purple-500 to-pink-600" },
    { icon: Code2, label: t.backend, gradient: "from-emerald-500 to-teal-600" },
    { icon: Rocket, label: t.launch, gradient: "from-orange-500 to-pink-600" },
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
        .minimal-glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .hover-lift {
          transition: transform 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #ffffff, #e5e7eb);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
      `}</style>

      <section className="py-20 bg-gradient-to-b from-[#020617] via-[#0a0a1a] to-[#020617] relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full filter blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 relative z-10"
        >
          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-center text-gradient"
          >
            {t.title}
          </motion.h2>

          {/* Greeting */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 mb-6 text-center"
          >
            {t.greeting}
          </motion.p>

          {/* Content Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="minimal-glass rounded-2xl p-8 mb-12"
          >
            <p className="text-gray-300 leading-relaxed mb-4 text-center lg:text-left">
              {t.intro}
            </p>
            <p className="text-gray-400 leading-relaxed mb-4 text-center lg:text-left">
              {t.details}
            </p>
            <p className="text-gray-400 italic text-center lg:text-left border-l-2 border-cyan-500 pl-4 ml-2">
              {t.philosophy}
            </p>
          </motion.div>

          {/* Services Title */}
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold mb-8 text-center text-white"
          >
            {t.services}
          </motion.h3>

          {/* Services Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {services.map(({ icon: Icon, label, gradient }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="hover-lift minimal-glass rounded-xl p-6 text-center"
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-300 block">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openWhatsApp}
              className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              <HeartHandshake className="w-5 h-5 mr-2" />
              {t.contactMe}
            </motion.button>
          </motion.div>

          {/* Bottom Text */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-gray-500 text-center text-sm"
          >
            {t.connect}
          </motion.p>
        </motion.div>
      </section>
    </>
  );
}