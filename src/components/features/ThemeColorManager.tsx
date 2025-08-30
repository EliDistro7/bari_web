'use client';

import { useEffect, useState } from 'react';

const ThemeColorManager = () => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  // Theme colors that match your HeroSection
  const themeColors = [
    '#06b6d4', // Cyan - Web Applications
    '#8b5cf6', // Purple - Mobile Applications  
    '#10b981', // Emerald - Static Websites
    '#fb923c'  // Orange - Backend Systems
  ];

  // Service rotation timing (matches HeroSection)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveServiceIndex((prev) => (prev + 1) % themeColors.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, []);

  // Update browser theme color
  useEffect(() => {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const msNavButtonMeta = document.querySelector('meta[name="msapplication-navbutton-color"]');
    const msTileColorMeta = document.querySelector('meta[name="msapplication-TileColor"]');
    
    const currentColor = themeColors[activeServiceIndex];
    
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', currentColor);
    }
    
    if (msNavButtonMeta) {
      msNavButtonMeta.setAttribute('content', currentColor);
    }
    
    if (msTileColorMeta) {
      msTileColorMeta.setAttribute('content', currentColor);
    }

    // For iOS Safari address bar
    const appleStatusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (appleStatusBarMeta) {
      appleStatusBarMeta.setAttribute('content', 'black-translucent');
    }

  }, [activeServiceIndex]);

  return null; // This component doesn't render anything visible
};

export default ThemeColorManager;