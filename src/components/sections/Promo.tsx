import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, Globe, Smartphone, Database, BarChart3, FileText, TrendingUp, DollarSign, Users, Target, Award, Zap, Crown } from 'lucide-react';

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
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  
  const services: Service[] = [
    {
      icon: Crown,
      titleEn: "DOMINATE YOUR MARKET",
      titleSw: "TAWALA SOKO LAKO",
      descEn: "Become the undisputed industry leader",
      descSw: "Kuwa kiongozi mkuu wa sekta yako",
      color: "#FFD700", // Gold
      features: ["CRUSH COMPETITION", "PREMIUM PRICING", "MARKET AUTHORITY", "UNSTOPPABLE GROWTH"],
      businessValue: "GUARANTEE: 500% REVENUE BOOST",
      businessValueSw: "DHAMANA: ONGEZA MAPATO 500%",
      guaranteeEn: "OR YOUR MONEY BACK!",
      guaranteeSw: "AU PESA ZAKO ZIRUDI!"
    },
    {
      icon: Zap,
      titleEn: "EXPLOSIVE BUSINESS GROWTH", 
      titleSw: "UKUAJI WA KASI WA BIASHARA",
      descEn: "Accelerate beyond your wildest dreams",
      descSw: "Harakisha zaidi ya ndoto zako",
      color: "#00FF41", // Electric green
      features: ["LIGHTNING FAST RESULTS", "AUTOMATED PROFITS", "SCALABLE SYSTEMS", "PASSIVE INCOME"],
      businessValue: "TRIPLE YOUR PROFITS IN 90 DAYS",
      businessValueSw: "MARADUFU FAIDA ZAKO KWA SIKU 90",
      guaranteeEn: "PROVEN RESULTS OR REFUND!",
      guaranteeSw: "MATOKEO YALIYOTHIBITIKA AU MALIPO!"
    },
    {
      icon: Award,
      titleEn: "PREMIUM CUSTOMER LOYALTY",
      titleSw: "UAMINIFU WA HALI YA JUU",
      descEn: "Turn customers into raving fans",
      descSw: "Badilisha wateja kuwa mashabiki wakuu",
      color: "#FF6B35", // Success orange
      features: ["100% SATISFACTION", "REPEAT BUYERS", "WORD-OF-MOUTH MARKETING", "BRAND EVANGELISTS"],
      businessValue: "90% CUSTOMER RETENTION RATE",
      businessValueSw: "ASILIMIA 90 YA WATEJA WANARUDIA",
      guaranteeEn: "LIFETIME CUSTOMER VALUE!",
      guaranteeSw: "THAMANI YA WATEJA MAISHA YOTE!"
    },
    {
      icon: Target,
      titleEn: "TOTAL MARKET CONQUEST",
      titleSw: "USHINDI MKUU WA SOKO",
      descEn: "Capture and control entire markets",
      descSw: "Shika na udhibiti masoko yote",
      color: "#8B5CF6", // Royal purple
      features: ["MARKET MONOPOLY", "PRICE LEADERSHIP", "COMPETITOR ELIMINATION", "INDUSTRY STANDARD"],
      businessValue: "CONTROL 80% OF YOUR MARKET",
      businessValueSw: "DHIBITI ASILIMIA 80 YA SOKO LAKO",
      guaranteeEn: "GUARANTEED DOMINANCE!",
      guaranteeSw: "UTAWALA ULIODHAMINIWA!"
    },
    {
      icon: DollarSign,
      titleEn: "UNSTOPPABLE WEALTH MACHINE",
      titleSw: "MASHINE YA UTAJIRI ISIYOSIMAMA", 
      descEn: "Generate massive wealth automatically",
      descSw: "Zalisha utajiri mkuu kiotomatiki",
      color: "#10B981", // Money green
      features: ["AUTOMATED REVENUE", "PASSIVE PROFITS", "WEALTH MULTIPLICATION", "FINANCIAL FREEDOM"],
      businessValue: "MILLIONAIRE STATUS GUARANTEED",
      businessValueSw: "HALI YA UMILIONEA IMEDHAMINIWA",
      guaranteeEn: "BECOME RICH OR PAY NOTHING!",
      guaranteeSw: "KUWA TAJIRI AU ULIPE KITU!"
    }
  ];

  // Responsive canvas sizing
  useEffect(() => {
    const updateDimensions = () => {
      const container = canvasRef.current?.parentElement;
      if (!container) return;
      
      const containerWidth = container.clientWidth - 32;
      const maxWidth = Math.min(containerWidth, 1200);
      const aspectRatio = 16 / 9; // Cinematic aspect ratio
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
    const sceneDuration = 4000; // 4 seconds per scene for impact
    const totalScenes = services.length + 2;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % sceneDuration) / sceneDuration;
      const sceneIndex = Math.floor(elapsed / sceneDuration) % totalScenes;
      
      setCurrentScene(sceneIndex);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Powerful background
      drawPowerfulBackground(ctx, canvas, elapsed);
      
     

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

    // Auto-start animation
    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [language, dimensions]);

  const drawPowerfulBackground = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, elapsed: number) => {
    // Dynamic power gradient
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    );
    
    const hue = (elapsed * 0.02) % 360;
    gradient.addColorStop(0, '#000000'); // Deep black center
    gradient.addColorStop(0.3, `hsl(${hue}, 100%, 3%)`);
    gradient.addColorStop(0.7, `hsl(${(hue + 120) % 360}, 80%, 8%)`);
    gradient.addColorStop(1, '#1A1A1A'); // Rich dark edge
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Power grid effect
    ctx.save();
    ctx.strokeStyle = '#FFD700';
    ctx.globalAlpha = 0.15;
    ctx.lineWidth = 1;
    const gridSize = 80;
    const offset = (elapsed * 0.05) % gridSize;
    
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

    // Lightning effect
    if (Math.sin(elapsed * 0.01) > 0.95) {
      ctx.save();
      ctx.strokeStyle = '#FFFFFF';
      ctx.globalAlpha = 0.8;
      ctx.lineWidth = 3;
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 20;
      
      ctx.beginPath();
      ctx.moveTo(0, Math.random() * canvas.height);
      ctx.lineTo(canvas.width, Math.random() * canvas.height);
      ctx.stroke();
      ctx.restore();
    }
  };

  const drawSuccessEnergy = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, elapsed: number) => {
    const particleCount = Math.floor(canvas.width / 10);
    
    for (let i = 0; i < particleCount; i++) {
      // Explosive energy movement
      const angle = (elapsed * 0.002 + i) % (Math.PI * 2);
      const radius = 100 + Math.sin(elapsed * 0.003 + i) * 150;
      const x = canvas.width / 2 + Math.cos(angle) * radius;
      const y = canvas.height / 2 + Math.sin(angle) * radius * 0.6;
      
      const sizeBase = Math.sin(elapsed * 0.005 + i);
      const size = Math.abs(sizeBase) * .05 + 1.5;
      
      if (size <= 0) continue;
      
      ctx.save();
      
      // Success energy colors
      const energyColors = ['#FFD700', '#00FF41', '#FF6B35', '#8B5CF6', '#10B981', '#FFFFFF'];
      const colorIndex = Math.floor((elapsed * 0.01 + i) % energyColors.length);
      
      // Glowing energy effect
      ctx.shadowColor = energyColors[colorIndex];
      ctx.shadowBlur = 30;
      ctx.globalAlpha = 0.9;
      
      const energyGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
      energyGradient.addColorStop(0, energyColors[colorIndex]);
      energyGradient.addColorStop(0.5, energyColors[colorIndex] + '80');
      energyGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = energyGradient;
      ctx.beginPath();
      ctx.arc(x, y, size * 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Core energy
      ctx.fillStyle = energyColors[colorIndex];
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
  };

  

  const getResponsiveFontSize = (baseSize: number): number => {
    const scaleFactor = Math.min(dimensions.width / 800, dimensions.height / 450);
    return Math.max(14, baseSize * scaleFactor);
  };

  const drawBoldIntroScene = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, progress: number, elapsed: number) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.save();
    ctx.textAlign = 'center';
    
    // Explosive company name
    const titleSize = getResponsiveFontSize(64);
    ctx.font = `900 ${titleSize}px Arial, sans-serif`;
    
    // Multi-layer shadow for power
    for (let i = 8; i > 0; i--) {
      ctx.save();
      ctx.translate(i, i);
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#000000';
      ctx.fillText('BARIKI KANENO', centerX, centerY - 60);
      ctx.restore();
    }
    
    // Power gradient
    const titleGradient = ctx.createLinearGradient(centerX - 400, centerY - 100, centerX + 400, centerY - 20);
    titleGradient.addColorStop(0, '#FFD700');
    titleGradient.addColorStop(0.3, '#FFFFFF');
    titleGradient.addColorStop(0.7, '#00FF41');
    titleGradient.addColorStop(1, '#FFD700');
    
    ctx.fillStyle = titleGradient;
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 30;
    ctx.fillText('BARIKI KANENO', centerX, centerY - 60);

    // Bold business promise
    if (progress > 0.2) {
      const promiseAlpha = Math.min(1, (progress - 0.2) / 0.3);
      ctx.save();
      ctx.globalAlpha = promiseAlpha;
      ctx.font = `900 ${getResponsiveFontSize(32)}px Arial, sans-serif`;
      ctx.fillStyle = '#FF6B35';
      ctx.shadowColor = '#FF6B35';
      ctx.shadowBlur = 25;
      
      const promise = language === 'sw' 
        ? 'HAKIKISHA MAFANIKIO YA BIASHARA!'
        : 'GUARANTEED BUSINESS SUCCESS!';
      ctx.fillText(promise, centerX, centerY - 10);
      ctx.restore();
    }

    // Irresistible value proposition
    if (progress > 0.5) {
      const valueAlpha = Math.min(1, (progress - 0.5) / 0.4);
      ctx.save();
      ctx.globalAlpha = valueAlpha;
      ctx.font = `800 ${getResponsiveFontSize(24)}px Arial, sans-serif`;
      ctx.fillStyle = '#10B981';
      ctx.shadowColor = '#10B981';
      ctx.shadowBlur = 20;
      
      const valueText = language === 'sw'
        ? '500% ONGEZEKO LA MAPATO AU PESA ZIRUDI!'
        : '500% REVENUE INCREASE OR MONEY BACK!';
      ctx.fillText(valueText, centerX, centerY + 40);
      
      // Pulsing effect for emphasis
      const pulseScale = 1 + Math.sin(elapsed * 0.008) * 0.1;
      ctx.save();
      ctx.translate(centerX, centerY + 80);
      ctx.scale(pulseScale, pulseScale);
      ctx.font = `900 ${getResponsiveFontSize(20)}px Arial, sans-serif`;
      ctx.fillStyle = '#FFD700';
      ctx.shadowBlur = 30;
      
      const urgency = language === 'sw'
        ? '⚡ MUDA MFUPI TU - ANZA LEO! ⚡'
        : '⚡ LIMITED TIME - START TODAY! ⚡';
      ctx.fillText(urgency, 0, 0);
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

    // Bold service title
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = `900 ${getResponsiveFontSize(42)}px Arial, sans-serif`;
    
    // Power shadow
    for (let i = 6; i > 0; i--) {
      ctx.save();
      ctx.translate(i * 1.5, i * 1.5);
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = '#000000';
      const title = language === 'sw' ? service.titleSw : service.titleEn;
      ctx.fillText(title, centerX, centerY - 120);
      ctx.restore();
    }
    
    const titleGradient = ctx.createLinearGradient(centerX - 300, centerY - 140, centerX + 300, centerY - 100);
    titleGradient.addColorStop(0, service.color);
    titleGradient.addColorStop(0.5, '#FFFFFF');
    titleGradient.addColorStop(1, service.color);
    
    ctx.fillStyle = titleGradient;
    ctx.shadowColor = service.color;
    ctx.shadowBlur = 40;
    const title = language === 'sw' ? service.titleSw : service.titleEn;
    ctx.fillText(title, centerX, centerY - 120);

    // Guarantee promise
    ctx.font = `800 ${getResponsiveFontSize(28)}px Arial, sans-serif`;
    ctx.fillStyle = '#FFD700';
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 25;
    const businessValue = language === 'sw' ? service.businessValueSw : service.businessValue;
    ctx.fillText(businessValue, centerX, centerY - 80);

    // Money-back guarantee
    ctx.font = `700 ${getResponsiveFontSize(20)}px Arial, sans-serif`;
    ctx.fillStyle = '#FF6B35';
    const guarantee = language === 'sw' ? service.guaranteeSw : service.guaranteeEn;
    ctx.fillText(guarantee, centerX, centerY - 50);

    // Description with power
    ctx.font = `600 ${getResponsiveFontSize(22)}px Arial, sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowBlur = 15;
    const desc = language === 'sw' ? service.descSw : service.descEn;
    ctx.fillText(desc, centerX, centerY - 15);

    // Explosive business chart
    if (progress > 0.2) {
      const chartSize = Math.min(canvas.width * 0.35, canvas.height * 0.25);
      const chartX = centerX - chartSize / 2;
      const chartY = centerY + 10;
     // drawExplosiveChart(ctx, chartX, chartY, chartSize, chartSize * 0.6, progress, service.color);
    }

    // Power benefits
    if (progress > 0.4) {
      const benefitsStartY = centerY + canvas.height * 0.25;
      service.features.forEach((feature, index) => {
        const featureProgress = Math.max(0, (progress - 0.5 - index * 0.08) / 0.25);
        if (featureProgress > 0) {
          const featureY = benefitsStartY + index * (getResponsiveFontSize(24) + 8);
          const featureAlpha = Math.min(1, featureProgress * 2);
          
          ctx.save();
          ctx.globalAlpha = featureAlpha;
          ctx.textAlign = 'center';
          ctx.font = `800 ${getResponsiveFontSize(18)}px Arial, sans-serif`;
          ctx.fillStyle = service.color;
          ctx.shadowColor = service.color;
          ctx.shadowBlur = 20;
          
          // Pulsing power effect
          const featurePulse = 1 + Math.sin((elapsed + index * 500) * 0.01) * 0.05;
          ctx.save();
          ctx.translate(centerX, featureY);
          ctx.scale(featurePulse, featurePulse);
          ctx.fillText(`⚡ ${feature} ⚡`, 0, 0);
          ctx.restore();
          
          ctx.restore();
        }
      });
    }

   
  };

  const drawPowerfulOutroScene = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, progress: number, elapsed: number) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.save();
    ctx.textAlign = 'center';
    
    // Explosive call-to-action
    ctx.font = `900 ${getResponsiveFontSize(48)}px Arial, sans-serif`;
    
    // Power shadows
    for (let i = 10; i > 0; i--) {
      ctx.save();
      ctx.translate(i * 2, i * 2);
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = '#000000';
      const ctaText = language === 'sw' ? 'ANZA KUPATA MILIONI LEO!' : 'START MAKING MILLIONS TODAY!';
      ctx.fillText(ctaText, centerX, centerY - 80);
      ctx.restore();
    }
    
    // Rainbow power gradient
    const ctaGradient = ctx.createLinearGradient(centerX - 400, centerY - 100, centerX + 400, centerY - 60);
    const hue = (elapsed * 0.3) % 360;
    ctaGradient.addColorStop(0, `hsl(${hue}, 100%, 50%)`);
    ctaGradient.addColorStop(0.2, `hsl(${(hue + 72) % 360}, 100%, 60%)`);
    ctaGradient.addColorStop(0.4, `hsl(${(hue + 144) % 360}, 100%, 70%)`);
    ctaGradient.addColorStop(0.6, `hsl(${(hue + 216) % 360}, 100%, 60%)`);
    ctaGradient.addColorStop(0.8, `hsl(${(hue + 288) % 360}, 100%, 50%)`);
    ctaGradient.addColorStop(1, `hsl(${hue}, 100%, 50%)`);
    
    ctx.fillStyle = ctaGradient;
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 50;
    const ctaText = language === 'sw' ? 'ANZA KUPATA MILIONI LEO!' : 'START MAKING MILLIONS TODAY!';
    ctx.fillText(ctaText, centerX, centerY - 80);

    // Ultimate guarantee
    if (progress > 0.3) {
      const guaranteeAlpha = Math.min(1, (progress - 0.3) / 0.4);
      ctx.save();
      ctx.globalAlpha = guaranteeAlpha;
      
      // Pulsing guarantee
      const guaranteePulse = 1 + Math.sin(elapsed * 0.012) * 0.15;
      ctx.save();
      ctx.translate(centerX, centerY - 20);
      ctx.scale(guaranteePulse, guaranteePulse);
      
      ctx.font = `800 ${getResponsiveFontSize(32)}px Arial, sans-serif`;
      ctx.fillStyle = '#FF6B35';
      ctx.shadowColor = '#FF6B35';
      ctx.shadowBlur = 40;
      
      const guaranteeText = language === 'sw'
        ? 'MILIONEA KATIKA MIEZI 6 AU MALIPO KAMILI!'
        : 'MILLIONAIRE IN 6 MONTHS OR FULL REFUND!';
      ctx.fillText(guaranteeText, 0, 0);
      ctx.restore();
      
      // Contact with urgency
      ctx.font = `700 ${getResponsiveFontSize(24)}px Arial, sans-serif`;
      ctx.fillStyle = '#10B981';
      ctx.shadowColor = '#10B981';
      ctx.shadowBlur = 30;
      ctx.fillText('📧 bariki@kaneno.dev', centerX, centerY + 30);
      
      ctx.font = `900 ${getResponsiveFontSize(20)}px Arial, sans-serif`;
      ctx.fillStyle = '#FFD700';
      ctx.shadowBlur = 35;
      const urgentText = language === 'sw'
        ? '🔥 WITO WA BURE - KABLA HAIJACHELEWA! 🔥'
        : '🔥 FREE CONSULTATION - BEFORE IT\'S TOO LATE! 🔥';
      ctx.fillText(urgentText, centerX, centerY + 70);
      
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
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Power background effects */}
    



      {/* Responsive video container */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative bg-black/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-400/50 hover:border-yellow-400 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-green-500/20 to-orange-500/20 rounded-2xl sm:rounded-3xl animate-pulse"></div>
          
          <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className="relative z-10 block w-full h-auto rounded-2xl sm:rounded-3xl"
          />
    

        </div>
      </div>


    </div>
  )
}

export default PromoVideo;