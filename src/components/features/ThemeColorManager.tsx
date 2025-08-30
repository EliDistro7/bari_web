'use client';

import { useEffect, useState } from 'react';

const ThemeColorManager = () => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  // Dark purple theme colors for browser taskbar
  const themeColors = [
    '#6b21a8', // Deep Purple - Web Applications
    '#7c3aed', // Medium Purple - Mobile Applications  
    '#8b5cf6', // Light Purple - Static Websites
    '#4c1d95'  // Dark Violet - Backend Systems
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