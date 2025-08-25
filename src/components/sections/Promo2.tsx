import React, { useRef, useEffect, useState } from 'react';
import { Globe, Smartphone, Database, BarChart3, FileText, TrendingUp, DollarSign, Users, Target, Award, Zap, Crown, RotateCcw } from 'lucide-react';

interface Service {
  icon: React.ElementType;
  titleEn: string;
  titleSw: string;
  descEn: string;
  descSw: string;
  color: string;
  features: string[];
  businessValue: string;
  businessValueSw: string;
  guaranteeEn: string;
  guaranteeSw: string;
}

const PromoVideo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [language, setLanguage] = useState<'en' | 'sw'>('sw');
  const [dimensions, setDimensions] = useState({ width: 800, height: 1200 });
  
  const services: Service[] = [
    {
      icon: Globe,
      titleEn: "WEB APPLICATIONS",
      titleSw: "PROGRAMU ZA WAVUTI",
      descEn: "Transform your business with powerful web solutions",
      descSw: "Badilisha biashara yako kwa mifumo ya mtandao",
      color: "#00D4FF", // Cyan
      features: ["REAL-TIME PROCESSING", "AUTOMATED WORKFLOWS", "CUSTOMER PORTALS", "BUSINESS INTELLIGENCE"],
      businessValue: "300% EFFICIENCY BOOST",
      businessValueSw: "ONGEZA UFANISI 300%",
      guaranteeEn: "ROI IN 6 MONTHS OR MONEY BACK!",
      guaranteeSw: "FAIDA KWA MIEZI 6 AU PESA ZIRUDI!"
    },
    {
      icon: FileText,
      titleEn: "PROFESSIONAL WEBSITES", 
      titleSw: "TOVUTI ZA KITAALAMU",
      descEn: "Lightning-fast websites that convert visitors to customers",
      descSw: "Tovuti za haraka zinazobadilisha wageni kuwa wateja",
      color: "#00FF41", // Electric green
      features: ["LIGHTNING SPEED", "SEO OPTIMIZED", "MOBILE RESPONSIVE", "EASY MAINTENANCE"],
      businessValue: "50% MORE CUSTOMERS FROM GOOGLE",
      businessValueSw: "WATEJA 50% ZAIDI KUTOKA GOOGLE",
      guaranteeEn: "TOP GOOGLE RANKINGS GUARANTEED!",
      guaranteeSw: "NAFASI YA JUU GOOGLE IMEDHAMINIWA!"
    },
    {
      icon: Smartphone,
      titleEn: "MOBILE APPLICATIONS",
      titleSw: "PROGRAMU ZA SIMU",
      descEn: "Reach customers everywhere with powerful mobile apps",
      descSw: "Wafikia wateja kila mahali kwa programu za simu",
      color: "#FF6B35", // Orange
      features: ["PUSH NOTIFICATIONS", "OFFLINE CAPABILITY", "NATIVE PERFORMANCE", "APP STORE READY"],
      businessValue: "200% CUSTOMER ENGAGEMENT",
      businessValueSw: "USHIRIKI WA WATEJA 200%",
      guaranteeEn: "VIRAL APP SUCCESS OR REFUND!",
      guaranteeSw: "MAFANIKIO YA APP AU MALIPO!"
    },
    {
      icon: Database,
      titleEn: "SYSTEM INTEGRATION",
      titleSw: "MUUNGANISHO WA MIFUMO",
      descEn: "Connect all your systems for seamless operations",
      descSw: "Unganisha mifumo yako yote kwa uendeshaji mzuri",
      color: "#8B5CF6", // Purple
      features: ["AUTOMATED DATA FLOW", "ELIMINATE MANUAL WORK", "REAL-TIME SYNC", "ERROR REDUCTION"],
      businessValue: "80% LESS MANUAL WORK",
      businessValueSw: "PUNGUZA KAZI YA MKONO 80%",
      guaranteeEn: "SEAMLESS INTEGRATION GUARANTEED!",
      guaranteeSw: "MUUNGANISHO MZURI UMEDHAMINIWA!"
    },
    {
      icon: BarChart3,
      titleEn: "BUSINESS INTELLIGENCE",
      titleSw: "AKILI YA BIASHARA", 
      descEn: "Transform data into powerful business insights",
      descSw: "Badilisha data kuwa maarifa ya biashara",
      color: "#10B981", // Emerald
      features: ["REAL-TIME DASHBOARDS", "PREDICTIVE ANALYTICS", "DATA VISUALIZATION", "SMART REPORTS"],
      businessValue: "MAKE DECISIONS 10X FASTER",
      businessValueSw: "FANYA MAAMUZI HARAKA MARA 10",
      guaranteeEn: "CRYSTAL CLEAR INSIGHTS OR FREE!",
      guaranteeSw: "MAARIFA WAZI AU BURE!"
    }
  ];

  // Responsive canvas sizing
  useEffect(() => {
    const updateDimensions = () => {
      const container = canvasRef.current?.parentElement;
      if (!container) return;
      
      const containerWidth = container.clientWidth - 32;
      const maxWidth = Math.min(containerWidth, 1200);
      const aspectRatio = 16 / 9;
      const height = maxWidth / aspectRatio;
      
      setDimensions({
        width: maxWidth,
        height: Math.min(height, window.innerHeight * 0.7)
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let animationFrame: number;
    let startTime = Date.now();
    const sceneDuration = 4000;
    const totalScenes = services.length + 2;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % sceneDuration) / sceneDuration;
      const sceneIndex = Math.floor(elapsed / sceneDuration) % totalScenes;
      
      setCurrentScene(sceneIndex);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawPowerfulBackground(ctx, canvas, elapsed);
      drawSuccessEnergy(ctx, canvas, elapsed);

      if (sceneIndex === 0) {
        drawBoldIntroScene(ctx, canvas, progress, elapsed);
      } else if (sceneIndex === totalScenes - 1) {
        drawPowerfulOutroScene(ctx, canvas, progress, elapsed);
      } else {
        const serviceIndex = sceneIndex - 1;
        drawBoldServiceScene(ctx, canvas, services[serviceIndex], progress, elapsed);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [language, dimensions]);

  const drawPowerfulBackground = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, elapsed: number) => {
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    );
    
    const hue = (elapsed * 0.02) % 360;
    gradient.addColorStop(0, '#001122');
    gradient.addColorStop(0.3, `hsl(${hue}, 70%, 5%)`);
    gradient.addColorStop(0.7, `hsl(${(hue + 120) % 360}, 60%, 8%)`);
    gradient.addColorStop(1, '#0A0A0A');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Tech grid effect
    ctx.save();
    ctx.strokeStyle = '#00D4FF';
    ctx.globalAlpha = 0.1;
    ctx.lineWidth = 1;
    const gridSize = 60;
    const offset = (elapsed * 0.03) % gridSize;
    
    for (let x = -offset; x < canvas.width + gridSize; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    for (let y = -offset; y < canvas.height + gridSize; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    ctx.restore();
  };

  const drawSuccessEnergy = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, elapsed: number) => {
    const particleCount = Math.floor(canvas.width / 15);
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (elapsed * 0.001 + i) % (Math.PI * 2);
      const radius = 80 + Math.sin(elapsed * 0.002 + i) * 120;
      const x = canvas.width / 2 + Math.cos(angle) * radius;
      const y = canvas.height / 2 + Math.sin(angle) * radius * 0.7;
      
      const size = Math.abs(Math.sin(elapsed * 0.003 + i)) * 2 + 1;
      
      ctx.save();
      
      const colors = ['#00D4FF', '#00FF41', '#FF6B35', '#8B5CF6', '#10B981'];
      const colorIndex = Math.floor((elapsed * 0.01 + i) % colors.length);
      
      ctx.shadowColor = colors[colorIndex];
      ctx.shadowBlur = 15;
      ctx.globalAlpha = 0.7;
      
      ctx.fillStyle = colors[colorIndex];
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
  };

  const getResponsiveFontSize = (baseSize: number): number => {
    const scaleFactor = Math.min(dimensions.width / 800, dimensions.height / 450);
    return Math.max(12, baseSize * scaleFactor);
  };

  const drawBoldIntroScene = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, progress: number, elapsed: number) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.save();
    ctx.textAlign = 'center';
    
    // Company name with tech feel
    const titleSize = getResponsiveFontSize(56);
    ctx.font = `900 ${titleSize}px Arial, sans-serif`;
    
    // Tech shadows
    for (let i = 4; i > 0; i--) {
      ctx.save();
      ctx.translate(i * 2, i * 2);
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = '#000000';
      ctx.fillText('BARIKI KANENO', centerX, centerY - 60);
      ctx.restore();
    }
    
    const titleGradient = ctx.createLinearGradient(centerX - 300, centerY - 80, centerX + 300, centerY - 40);
    titleGradient.addColorStop(0, '#00D4FF');
    titleGradient.addColorStop(0.5, '#FFFFFF');
    titleGradient.addColorStop(1, '#00FF41');
    
    ctx.fillStyle = titleGradient;
    ctx.shadowColor = '#00D4FF';
    ctx.shadowBlur = 25;
    ctx.fillText('BARIKI KANENO', centerX, centerY - 60);

    // Professional tagline
    if (progress > 0.2) {
      const taglineAlpha = Math.min(1, (progress - 0.2) / 0.3);
      ctx.save();
      ctx.globalAlpha = taglineAlpha;
      ctx.font = `800 ${getResponsiveFontSize(28)}px Arial, sans-serif`;
      ctx.fillStyle = '#10B981';
      ctx.shadowColor = '#10B981';
      ctx.shadowBlur = 20;
      
      const tagline = language === 'sw' 
        ? 'SULUHISHO ZA TEKNOLOJIA ZA KISASA'
        : 'CUTTING-EDGE TECHNOLOGY SOLUTIONS';
      ctx.fillText(tagline, centerX, centerY - 15);
      ctx.restore();
    }

    // Value proposition
    if (progress > 0.5) {
      const valueAlpha = Math.min(1, (progress - 0.5) / 0.4);
      ctx.save();
      ctx.globalAlpha = valueAlpha;
      ctx.font = `700 ${getResponsiveFontSize(22)}px Arial, sans-serif`;
      ctx.fillStyle = '#FF6B35';
      ctx.shadowColor = '#FF6B35';
      ctx.shadowBlur = 15;
      
      const valueText = language === 'sw'
        ? 'KUZA BIASHARA YAKO MTANDAONI - HAKIKISHA MAFANIKIO'
        : 'TRANSFORM YOUR BUSINESS - GUARANTEE SUCCESS';
      ctx.fillText(valueText, centerX, centerY + 25);
      
      // Call to action
      const pulseScale = 1 + Math.sin(elapsed * 0.006) * 0.08;
      ctx.save();
      ctx.translate(centerX, centerY + 65);
      ctx.scale(pulseScale, pulseScale);
      ctx.font = `800 ${getResponsiveFontSize(18)}px Arial, sans-serif`;
      ctx.fillStyle = '#00D4FF';
      ctx.shadowBlur = 25;
      
      const cta = language === 'sw'
        ? '⚡ ANZA SAFARI YAKO YA MAFANIKIO ⚡'
        : '⚡ START YOUR SUCCESS JOURNEY ⚡';
      ctx.fillText(cta, 0, 0);
      ctx.restore();
      
      ctx.restore();
    }

    ctx.restore();
  };

  const drawBoldServiceScene = (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement, 
    service: Service, 
    progress: number,
    elapsed: number
  ) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Service title
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = `900 ${getResponsiveFontSize(38)}px Arial, sans-serif`;
    
    // Professional shadow
    for (let i = 3; i > 0; i--) {
      ctx.save();
      ctx.translate(i * 1.5, i * 1.5);
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#000000';
      const title = language === 'sw' ? service.titleSw : service.titleEn;
      ctx.fillText(title, centerX, centerY - 100);
      ctx.restore();
    }
    
    const titleGradient = ctx.createLinearGradient(centerX - 250, centerY - 120, centerX + 250, centerY - 80);
    titleGradient.addColorStop(0, service.color);
    titleGradient.addColorStop(0.5, '#FFFFFF');
    titleGradient.addColorStop(1, service.color);
    
    ctx.fillStyle = titleGradient;
    ctx.shadowColor = service.color;
    ctx.shadowBlur = 30;
    const title = language === 'sw' ? service.titleSw : service.titleEn;
    ctx.fillText(title, centerX, centerY - 100);

    // Business value
    ctx.font = `800 ${getResponsiveFontSize(24)}px Arial, sans-serif`;
    ctx.fillStyle = '#00FF41';
    ctx.shadowColor = '#00FF41';
    ctx.shadowBlur = 20;
    const businessValue = language === 'sw' ? service.businessValueSw : service.businessValue;
    ctx.fillText(businessValue, centerX, centerY - 65);

    // Guarantee
    ctx.font = `700 ${getResponsiveFontSize(18)}px Arial, sans-serif`;
    ctx.fillStyle = '#FF6B35';
    const guarantee = language === 'sw' ? service.guaranteeSw : service.guaranteeEn;
    ctx.fillText(guarantee, centerX, centerY - 40);

    // Description
    ctx.font = `600 ${getResponsiveFontSize(20)}px Arial, sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowBlur = 10;
    const desc = language === 'sw' ? service.descSw : service.descEn;
    ctx.fillText(desc, centerX, centerY - 10);

    // Features
    if (progress > 0.3) {
      const featuresStartY = centerY + 25;
      service.features.forEach((feature, index) => {
        const featureProgress = Math.max(0, (progress - 0.4 - index * 0.06) / 0.2);
        if (featureProgress > 0) {
          const featureY = featuresStartY + index * (getResponsiveFontSize(18) + 8);
          const featureAlpha = Math.min(1, featureProgress * 2);
          
          ctx.save();
          ctx.globalAlpha = featureAlpha;
          ctx.textAlign = 'center';
          ctx.font = `700 ${getResponsiveFontSize(16)}px Arial, sans-serif`;
          ctx.fillStyle = service.color;
          ctx.shadowColor = service.color;
          ctx.shadowBlur = 15;
          
          ctx.fillText(`✓ ${feature}`, centerX, featureY);
          ctx.restore();
        }
      });
    }

    ctx.restore();
  };

  const drawPowerfulOutroScene = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, progress: number, elapsed: number) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.save();
    ctx.textAlign = 'center';
    
    // Call to action
    ctx.font = `900 ${getResponsiveFontSize(42)}px Arial, sans-serif`;
    
    // Powerful shadows
    for (let i = 5; i > 0; i--) {
      ctx.save();
      ctx.translate(i * 2, i * 2);
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#000000';
      const ctaText = language === 'sw' ? 'TWENDE PAMOJA!' : 'LET\'S BUILD TOGETHER!';
      ctx.fillText(ctaText, centerX, centerY - 80);
      ctx.restore();
    }
    
    const ctaGradient = ctx.createLinearGradient(centerX - 300, centerY - 100, centerX + 300, centerY - 60);
    const hue = (elapsed * 0.2) % 360;
    ctaGradient.addColorStop(0, `hsl(${hue}, 100%, 50%)`);
    ctaGradient.addColorStop(0.5, '#FFFFFF');
    ctaGradient.addColorStop(1, `hsl(${(hue + 180) % 360}, 100%, 50%)`);
    
    ctx.fillStyle = ctaGradient;
    ctx.shadowColor = '#00D4FF';
    ctx.shadowBlur = 40;
    const ctaText = language === 'sw' ? 'TWENDE PAMOJA!' : 'LET\'S BUILD TOGETHER!';
    ctx.fillText(ctaText, centerX, centerY - 80);

    // Professional guarantee
    if (progress > 0.3) {
      const guaranteeAlpha = Math.min(1, (progress - 0.3) / 0.4);
      ctx.save();
      ctx.globalAlpha = guaranteeAlpha;
      
      ctx.font = `800 ${getResponsiveFontSize(26)}px Arial, sans-serif`;
      ctx.fillStyle = '#10B981';
      ctx.shadowColor = '#10B981';
      ctx.shadowBlur = 25;
      
      const guaranteeText = language === 'sw'
        ? 'MAFANIKIO YAKO NI DHAMANA YANGU'
        : 'YOUR SUCCESS IS MY GUARANTEE';
      ctx.fillText(guaranteeText, centerX, centerY - 35);
      
      // Contact info
      ctx.font = `700 ${getResponsiveFontSize(20)}px Arial, sans-serif`;
      ctx.fillStyle = '#00D4FF';
      ctx.shadowColor = '#00D4FF';
      ctx.shadowBlur = 20;
      ctx.fillText('📧 +255 765 762 688', centerX, centerY + 10);
      
      ctx.font = `800 ${getResponsiveFontSize(18)}px Arial, sans-serif`;
      ctx.fillStyle = '#FF6B35';
      ctx.shadowBlur = 25;
      const consultText = language === 'sw'
        ? '🚀 USHAURI WA BURE - PIGA SIMU LEO!'
        : '🚀 FREE CONSULTATION - CALL TODAY!';
      ctx.fillText(consultText, centerX, centerY + 50);
      
      ctx.restore();
    }

    ctx.restore();
  };

  const reset = () => {
    setCurrentScene(0);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sw' : 'en');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Tech background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-400/30 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Video container */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-orange-500/10 rounded-2xl sm:rounded-3xl"></div>
          
          <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className="relative z-10 block w-full min-h-screen mx-0"
          />
          
         
       
        </div>
      </div>
    </div>
  );
};

export default PromoVideo;