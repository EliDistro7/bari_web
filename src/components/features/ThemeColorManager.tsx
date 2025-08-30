'use client';

import { useEffect, useState } from 'react';

const ThemeColorManager = () => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  // Very dark purple theme colors for browser taskbar
  const themeColors = [
    '#2d1b69', // Very Dark Purple - Web Applications
    '#1e1b4b', // Deep Indigo Purple - Mobile Applications  
    '#312e81', // Dark Slate Purple - Static Websites
    '#1a1625'  // Almost Black Purple - Backend Systems
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