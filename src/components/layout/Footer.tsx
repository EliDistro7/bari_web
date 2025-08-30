'use client';
import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  Heart,
  ArrowUp,
  Code2,
  Sparkles,
  Globe,
  Send,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '@/context/language';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { language } = useLanguage();

  // Translation object
  const translations = {
    en: {
      quickLinks: "Quick Links",
      projects: "Projects",
      services: "Services",
      location: "My Location",
      partners: "My Partners",
      contact: "Contact Info",
      email: "Email",
      phone: "Phone",
      address: "Address",
      followMe: "Follow Me",
      newsletter: "Newsletter",
      newsletterText: "Subscribe to get the latest updates and project insights",
      subscribe: "Subscribe",
      enterEmail: "Enter your email",
      footerText: "Built with passion in Dar es Salaam, Tanzania",
      rights: "All rights reserved",
      backToTop: "Back to top",
      role: "Software Developer & Tech Enthusiast"
    },
    sw: {
      quickLinks: "Viungo vya Haraka",
      projects: "Projects",
      services: "Huduma",
      location: "Mahali Nilipo",
      partners: "Wadau Wangu",
      contact: "Mawasiliano",
      email: "Barua pepe",
      phone: "Simu",
      address: "Anwani",
      followMe: "Nifuate",
      newsletter: "Jarida",
      newsletterText: "Jiunge ili kupata habari za hivi karibuni na maarifa ya miradi",
      subscribe: "Jiunge",
      enterEmail: "Ingiza barua pepe yako",
      footerText: "Imeundwa kwa shauku Dar es Salaam, Tanzania",
      rights: "Haki zote zimehifadhiwa",
      backToTop: "Rudi juu",
      role: "Software Developer na Mpenda Teknolojia"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.sw;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style jsx>{`
        .glass-footer {
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(25px);
          border-top: 1px solid rgba(102, 126, 234, 0.2);
        }
        
        .footer-section {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .footer-link {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
        }
        
        .footer-link:hover {
          transform: translateX(5px);
          color: #67e8f9;
        }
        
        .footer-link::before {
          content: '';
          position: absolute;
          left: -15px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          transition: width 0.3s ease;
        }
        
        .footer-link:hover::before {
          width: 10px;
        }
        
        .social-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(102, 126, 234, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }
        
        .social-icon:hover {
          transform: translateY(-3px) scale(1.05);
          border-color: rgba(102, 126, 234, 0.6);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }
        
        .social-icon.github:hover {
          background: rgba(36, 41, 46, 0.9);
          box-shadow: 0 8px 25px rgba(36, 41, 46, 0.4);
        }
        
        .social-icon.linkedin:hover {
          background: rgba(13, 102, 194, 0.2);
          box-shadow: 0 8px 25px rgba(13, 102, 194, 0.3);
        }
        
        .social-icon.twitter:hover {
          background: rgba(29, 155, 240, 0.2);
          box-shadow: 0 8px 25px rgba(29, 155, 240, 0.3);
        }
        
        .social-icon.instagram:hover {
          background: linear-gradient(45deg, rgba(225, 48, 108, 0.2), rgba(255, 214, 0, 0.2));
          box-shadow: 0 8px 25px rgba(225, 48, 108, 0.3);
        }
        
        .newsletter-form {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(102, 126, 234, 0.3);
          backdrop-filter: blur(15px);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .newsletter-form:focus-within {
          border-color: rgba(102, 126, 234, 0.6);
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
        }
        
        .newsletter-input {
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-size: 14px;
        }
        
        .newsletter-input::placeholder {
          color: rgba(156, 163, 175, 0.7);
        }
        
        .newsletter-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 8px;
        }
        
        .newsletter-button:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .contact-item {
          transition: all 0.3s ease;
          padding: 8px;
          border-radius: 8px;
        }
        
        .contact-item:hover {
          background: rgba(102, 126, 234, 0.1);
          transform: translateX(3px);
        }
        
        .brand-footer {
          background: linear-gradient(135deg, #67e8f9 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 900;
          letter-spacing: -0.025em;
        }
        
        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 40;
        }
        
        .back-to-top:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
        }
        
        .floating-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          border-radius: 50%;
          animation: floatParticle 8s ease-in-out infinite;
        }
        
        .particle:nth-child(1) {
          top: 10%;
          left: 10%;
          width: 4px;
          height: 4px;
          background: #67e8f9;
          animation-delay: 0s;
        }
        
        .particle:nth-child(2) {
          top: 20%;
          right: 15%;
          width: 3px;
          height: 3px;
          background: #a855f7;
          animation-delay: 2s;
        }
        
        .particle:nth-child(3) {
          bottom: 30%;
          left: 20%;
          width: 2px;
          height: 2px;
          background: #ec4899;
          animation-delay: 4s;
        }
        
        .particle:nth-child(4) {
          bottom: 15%;
          right: 25%;
          width: 3px;
          height: 3px;
          background: #10b981;
          animation-delay: 6s;
        }
        
        @keyframes floatParticle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.7;
          }
          25% { 
            transform: translateY(-10px) translateX(5px) scale(1.1);
            opacity: 1;
          }
          50% { 
            transform: translateY(-5px) translateX(-5px) scale(0.9);
            opacity: 0.8;
          }
          75% { 
            transform: translateY(-15px) translateX(3px) scale(1.05);
            opacity: 0.9;
          }
        }
        
        .section-title {
          position: relative;
          padding-bottom: 8px;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          border-radius: 1px;
        }
        
        .profile-mini {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid transparent;
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
          padding: 3px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
        }
        
        .profile-mini:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
        }
        
        .profile-mini-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #1e293b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          color: #67e8f9;
        }
        
        .verified-badge-footer {
          position: absolute;
          bottom: -3px;
          right: -3px;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 50%;
          border: 3px solid rgba(15, 23, 42, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .heart-beat {
          animation: heartBeat 2s ease-in-out infinite;
        }
        
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>

      <footer className="relative glass-footer">
        {/* Floating Background Particles */}
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Brand Section */}
            <div className="footer-section lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative profile-mini">
                  <div className="profile-mini-inner">BK</div>
                  <div className="verified-badge-footer">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                <div>
                  <div className="text-xl font-black brand-footer">
                    Bari Kaneno
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    {t.role}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {t.footerText} <Heart className="inline w-4 h-4 text-red-500 heart-beat" />
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="section-title text-white font-bold text-lg mb-6">
                {t.quickLinks}
              </h3>
              <div className="space-y-4">
                <a href="#projects" className="footer-link text-gray-400 hover:text-cyan-400 text-sm block">
                  <Code2 className="w-4 h-4 mr-2" />
                  {t.projects}
                </a>
                <a href="#services" className="footer-link text-gray-400 hover:text-cyan-400 text-sm block">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t.services}
                </a>
                <a href="#location" className="footer-link text-gray-400 hover:text-cyan-400 text-sm block">
                  <MapPin className="w-4 h-4 mr-2" />
                  {t.location}
                </a>
                <a href="#partners" className="footer-link text-gray-400 hover:text-cyan-400 text-sm block">
                  <Globe className="w-4 h-4 mr-2" />
                  {t.partners}
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h3 className="section-title text-white font-bold text-lg mb-6">
                {t.contact}
              </h3>
              <div className="space-y-4">
                <div className="contact-item">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Mail className="w-4 h-4 mr-3 text-cyan-400" />
                    <div>
                      <div className="font-medium text-gray-300">{t.email}</div>
                      <div>elibarikaneno@gmail.com</div>
                    </div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Phone className="w-4 h-4 mr-3 text-purple-400" />
                    <div>
                      <div className="font-medium text-gray-300">{t.phone}</div>
                      <div>+255 765 762 688</div>
                    </div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-3 text-pink-400" />
                    <div>
                      <div className="font-medium text-gray-300">{t.address}</div>
                      <div>Dar es Salaam, Tanzania</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="footer-section">
              <h3 className="section-title text-white font-bold text-lg mb-6">
                {t.newsletter}
              </h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {t.newsletterText}
              </p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form flex p-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.enterEmail}
                  className="newsletter-input flex-1 px-3 py-2"
                  required
                />
                <button
                  type="submit"
                  className="newsletter-button px-4 py-2 text-white font-medium flex items-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="border-t border-gray-700/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              
              {/* Social Icons */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm font-medium mr-2">{t.followMe}:</span>
                <a
                  href="https://github.com/barikikaneno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon github flex items-center justify-center"
                >
                  <Github className="w-5 h-5 text-gray-300" />
                </a>
                <a
                  href="https://linkedin.com/in/barikikaneno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon linkedin flex items-center justify-center"
                >
                  <Linkedin className="w-5 h-5 text-gray-300" />
                </a>
                <a
                  href="https://twitter.com/barikikaneno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon twitter flex items-center justify-center"
                >
                  <Twitter className="w-5 h-5 text-gray-300" />
                </a>
                <a
                  href="https://instagram.com/barikikaneno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon instagram flex items-center justify-center"
                >
                  <Instagram className="w-5 h-5 text-gray-300" />
                </a>
              </div>

              {/* Copyright */}
              <div className="text-center md:text-right">
                <div className="text-gray-400 text-sm">
                  © 2025 <span className="brand-footer">Bari Kaneno</span>. {t.rights}.
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Made with <Heart className="inline w-3 h-3 text-red-500 heart-beat" /> using React & Tailwind CSS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="back-to-top flex items-center justify-center text-white hover:text-gray-100"
          title={t.backToTop}
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </footer>
    </>
  );
};

export default Footer;