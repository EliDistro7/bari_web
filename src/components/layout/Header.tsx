'use client';

import React, { useState } from 'react';
import { Menu, X, Code2, Sparkles, Rocket, Globe } from 'lucide-react';
import { useLanguage } from '@/context/language';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {language, setLanguage} = useLanguage();

  const openWhatsApp = () => {
    const message = "Hi! I'm interested in learning more about your development services. Could you please provide more information?";
    const url = `https://wa.me/255765762688?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Translation object
  const translations = {
    en: {
      role: "Software Developer",
      projects: "Projects",
      services: "Services",
      location: "My Location",
      partners: "My Partners",
      resources: "Resources",
      getStarted: "Get Started",
      language: "Language"
    },
    sw: {
      role: "Software Developer",
      projects: "Projects",
      services: "Huduma",
      location: "Mahali Nilipo",
      partners: "Washirika",
      resources: "Rasilimali",
      getStarted: "Anza Sasa",
      language: "Lugha"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.sw;

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'sw' : 'en';
    setLanguage(newLang);
  };

  return (
    <>
      <style jsx>{`
        .glass-nav {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 2px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        }
        
        .nav-link {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-link:hover {
          transform: translateY(-2px);
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .logo-glow {
          text-shadow: 0 0 20px rgba(30, 64, 175, 0.15);
        }
        
        .logo-container {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(30, 64, 175, 0.05), rgba(255, 255, 255, 0.95));
          padding: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(30, 64, 175, 0.15);
          border: 1px solid rgba(30, 64, 175, 0.1);
        }
        
        .logo-container:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(30, 64, 175, 0.25);
          background: linear-gradient(135deg, rgba(30, 64, 175, 0.08), rgba(255, 255, 255, 1));
        }
        
        .logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: brightness(1.05) contrast(1.05);
        }
        
        .brand-name {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 900;
          letter-spacing: -0.025em;
        }
        
        .cta-button {
          position: relative;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(30, 64, 175, 0.2);
        }
        
        .cta-button:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 25px rgba(30, 64, 175, 0.3);
        }
        
        .cta-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #1e40af 100%);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .cta-button:hover::before {
          opacity: 1;
        }
        
        .cta-button > span {
          position: relative;
          z-index: 1;
        }
        
        .language-switcher {
          position: relative;
          background: rgba(248, 250, 252, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .language-switcher:hover {
          background: rgba(241, 245, 249, 0.9);
          border-color: rgba(30, 64, 175, 0.3);
          transform: translateY(-1px);
        }
        
        .floating-icon {
          animation: floatIcon 4s ease-in-out infinite;
        }
        
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(5deg); }
        }
        
        .mobile-menu {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
        
        .mobile-menu-item {
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }
        
        .mobile-menu-item:hover {
          background: rgba(30, 64, 175, 0.05);
          border-left-color: #3b82f6;
          transform: translateX(5px);
        }
        
        .pulse-dot {
          animation: pulseDot 2s ease-in-out infinite;
        }
        
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        .verified-badge {
          position: absolute;
          bottom: -4px;
          right: -4px;
          width: 22px;
          height: 22px;
          background: linear-gradient(135deg, #1e40af, #3b82f6);
          border-radius: 6px;
          border: 2px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(30, 64, 175, 0.4);
        }
        
        .verified-check {
          width: 10px;
          height: 10px;
          color: white;
          font-size: 10px;
          font-weight: bold;
        }
      `}</style>

      <nav className="fixed w-full top-0 z-50 glass-nav">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-2 left-1/4 w-1 h-1 bg-blue-500 rounded-full pulse-dot"></div>
          <div className="absolute top-4 right-1/3 w-0.5 h-0.5 bg-blue-600 rounded-full pulse-dot" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-2 left-2/3 w-1.5 h-1.5 bg-blue-400 rounded-full pulse-dot" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-5 relative">
          <div className="flex justify-between items-center">
            {/* Logo with Brand */}
            <div className="flex items-center space-x-4">
              {/* Logo */}
            

              {/* Brand Name */}
              <div className="flex items-center space-x-3">
                <div className="flex flex-col">
                  <div className="text-xl sm:text-2xl font-black brand-name logo-glow">
                    Bari Kaneno
                  </div>
                  <div className="text-xs text-gray-600 font-medium -mt-1">
                    {t.role}
                  </div>
                </div>
              </div>
              
              <div className="hidden sm:block w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full pulse-dot"></div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#projects" className="nav-link text-gray-700 hover:text-gray-900 font-medium">
                {t.projects}
              </a>
              <a href="#services" className="nav-link text-gray-700 hover:text-gray-900 font-medium">
                {t.services}
              </a>
              <a href="#location" className="nav-link text-gray-700 hover:text-gray-900 font-medium">
                {t.location}
              </a>
              <a href="#partners" className="nav-link text-gray-700 hover:text-gray-900 font-medium">
                {t.partners}
              </a>
              <a href="/resources/kkkt-yombo/docs" className="nav-link text-gray-700 hover:text-gray-900 font-medium">
                {t.resources}
              </a>
            </div>

            {/* Language Switcher, CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center space-x-3">
              {/* Language Switcher - Always Visible */}
              <button
                onClick={toggleLanguage}
                className="language-switcher flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900"
                title={t.language}
              >
                <span className="text-xs font-semibold uppercase ml-1">{language}</span>
              </button>

              <button
               onClick={openWhatsApp}
               className="cta-button hidden md:block text-white px-6 py-3 rounded-xl font-semibold text-sm overflow-hidden">
                <span className="flex items-center">
                  {t.getStarted}
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mobile-menu mt-2 mx-4 rounded-2xl overflow-hidden">
              <div className="py-4">
                <a 
                  href="#projects" 
                  className="mobile-menu-item block px-6 py-3 text-gray-700 hover:text-gray-900 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Code2 className="w-5 h-5 mr-3 text-blue-600" />
                    {t.projects}
                  </div>
                </a>
                <a 
                  href="#services" 
                  className="mobile-menu-item block px-6 py-3 text-gray-700 hover:text-gray-900 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-3 text-blue-500" />
                    {t.services}
                  </div>
                </a>
                <a 
                  href="#location" 
                  className="mobile-menu-item block px-6 py-3 text-gray-700 hover:text-gray-900 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Rocket className="w-5 h-5 mr-3 text-blue-600" />
                    {t.location}
                  </div>
                </a>
                <a 
                  href="#partners" 
                  className="mobile-menu-item block px-6 py-3 text-gray-700 hover:text-gray-900 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <div className="w-5 h-5 mr-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
                    {t.partners}
                  </div>
                </a>
                <a 
                  href="/resources/kkkt-yombo/docs" 
                  className="mobile-menu-item block px-6 py-3 text-gray-700 hover:text-gray-900 font-medium"
                  onClick={() => setIsMenuOpen(false)}>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-blue-600 floating-icon" />
                    {t.resources}
                  </div>
                </a>
                
                {/* Mobile Get Started Button */}
                <div className="px-6 py-3 border-t border-gray-200 mt-2">
                  <button 
                    onClick={openWhatsApp}
                    className="cta-button w-full text-white px-6 py-3 rounded-xl font-semibold text-sm overflow-hidden">
                    <span className="flex items-center justify-center">
                      {t.getStarted}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;