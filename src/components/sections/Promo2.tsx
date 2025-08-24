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
      titleEn: "Market Leadership Solutions",
      titleSw: "Suluhisho za Uongozi wa Soko",
      descEn: "Strategic positioning for market dominance",
      descSw: "Mkakati wa kupata nafasi ya utawala wa soko",
      color: "#E31E24", // BBC Red
      features: ["Market Analysis", "Competitive Strategy", "Growth Planning", "Revenue Optimization"],
      businessValue: "Proven 300% Growth Track Record",
      businessValueSw: "Rekodi ya Ukuaji wa 300% Iliyothibitika",
      guaranteeEn: "Results-Driven Approach",
      guaranteeSw: "Mbinu ya Kulenga Matokeo"
    },
    {
      icon: TrendingUp,
      titleEn: "Business Growth Acceleration", 
      titleSw: "Kuharakisha Ukuaji wa Biashara",
      descEn: "Systematic scaling for sustainable expansion",
      descSw: "Upanuzi wa kimfumo kwa ukuaji endelevu",
      color: "#E31E24",
      features: ["Digital Transformation", "Process Optimization", "Team Development", "Market Expansion"],
      businessValue: "Double Revenue in 12 Months",
      businessValueSw: "Maradufu ya Mapato katika Miezi 12",
      guaranteeEn: "Data-Driven Results",
      guaranteeSw: "Matokeo ya Kimtaalamu"
    },
    {
      icon: Users,
      titleEn: "Customer Excellence Program",
      titleSw: "Mpango wa Ubora wa Wateja",
      descEn: "Building lasting customer relationships",
      descSw: "Kujenga mahusiano endelevu ya wateja",
      color: "#E31E24",
      features: ["Customer Analytics", "Loyalty Programs", "Service Excellence", "Retention Strategy"],
      businessValue: "85% Customer Retention Rate",
      businessValueSw: "Kiwango cha 85% cha Uhifadhi Wateja",
      guaranteeEn: "Measurable Satisfaction Gains",
      guaranteeSw: "Ongezeko la Kuridhisha Linalopimiwa"
    },
    {
      icon: Target,
      titleEn: "Strategic Market Positioning",
      titleSw: "Kuweka Mkakati wa Soko",
      descEn: "Intelligent market capture strategies",
      descSw: "Mikakati ya akili ya kuteka soko",
      color: "#E31E24",
      features: ["Brand Development", "Market Research", "Competitor Analysis", "Positioning Strategy"],
      businessValue: "Capture 40% Market Share",
      businessValueSw: "Chukua 40% ya Hisa ya Soko",
      guaranteeEn: "Strategic Excellence",
      guaranteeSw: "Ubora wa Kimkakati"
    },
    {
      icon: BarChart3,
      titleEn: "Revenue Optimization Systems",
      titleSw: "Mifumo ya Kuboresha Mapato", 
      descEn: "Advanced financial growth methodologies",
      descSw: "Mbinu za hali ya juu za ukuaji wa kifedha",
      color: "#E31E24",
      features: ["Financial Planning", "Revenue Streams", "Cost Optimization", "Profit Maximization"],
      businessValue: "Sustainable Profit Growth",
      businessValueSw: "Ukuaji Endelevu wa Faida",
      guaranteeEn: "Professional Financial Results",
      guaranteeSw: "Matokeo ya Kifedha ya Kitaalamu"
    }
  ];

  // Responsive canvas sizing
  useEffect(() => {
    const updateDimensions = () => {
      const container = canvasRef.current?.parentElement;
      if (!container) return;
      
      const containerWidth = container.clientWidth - 32;
      const maxWidth = Math.min(containerWidth, 1200);
      const aspectRatio = 16 / 9; // Broadcast standard
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
    const sceneDuration = 5000; // 5 seconds per scene
    const totalScenes = services.length + 2;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % sceneDuration) / sceneDuration;
      const sceneIndex = Math.floor(elapsed / sceneDuration) % totalScenes;
      
      setCurrentScene(sceneIndex);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // BBC-style background
      drawBBCBackground(ctx, canvas, elapsed);
      
      if (sceneIndex === 0) {
        drawBBCIntroScene(ctx, canvas, progress, elapsed);
      } else if (sceneIndex === totalScenes - 1) {
        drawBBCOutroScene(ctx, canvas, progress, elapsed);
      } else {
        const serviceIndex = sceneIndex - 1;
        drawBBCServiceScene(ctx, canvas, services[serviceIndex], progress, elapsed);
      }

      // Draw BBC-style lower third
      drawBBCLowerThird(ctx, canvas, elapsed, sceneIndex);

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [language, dimensions]);

  const drawBBCBackground = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, elapsed: number) => {
    // Clean BBC-style gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1a1a'); // Dark charcoal
    gradient.addColorStop(0.3, '#2a2a2a');
    gradient.addColorStop(0.7, '#1e1e1e');
    gradient.addColorStop(1, '#0f0f0f'); // Deep black
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle geometric pattern
    ctx.save();
    ctx.strokeStyle = '#333333';
    ctx.globalAlpha = 0.1;
    ctx.lineWidth = 1;
    
    // Grid pattern
    const gridSize = 60;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    ctx.restore();

    // BBC-style animated accent lines
    ctx.save();
    ctx.strokeStyle = '#E31E24';
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = 2;
    
    const lineOffset = (elapsed * 0.02) % canvas.width;
    ctx.beginPath();
    ctx.moveTo(-lineOffset, canvas.height * 0.2);
    ctx.lineTo(canvas.width - lineOffset, canvas.height * 0.2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(lineOffset, canvas.height * 0.8);
    ctx.lineTo(canvas.width + lineOffset, canvas.height * 0.8);
    ctx.stroke();
    ctx.restore();
  };

  const drawBBCLowerThird = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, elapsed: number, sceneIndex: number) => {
    // BBC-style lower third bar
    const barHeight = 80;
    const barY = canvas.height - barHeight;
    
    // Main red bar
    ctx.fillStyle = '#E31E24';
    ctx.fillRect(0, barY, canvas.width, barHeight);
    
    // Subtle gradient overlay
    const barGradient = ctx.createLinearGradient(0, barY, 0, canvas.height);
    barGradient.addColorStop(0, 'rgba(227, 30, 36, 0.9)');
    barGradient.addColorStop(1, 'rgba(180, 20, 25, 0.95)');
    ctx.fillStyle = barGradient;
    ctx.fillRect(0, barY, canvas.width, barHeight);
    
    // White accent stripe
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, barY, canvas.width, 3);
    
    // BBC-style typography
    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `600 ${getResponsiveFontSize(18)}px 'Arial', sans-serif`;
    ctx.textAlign = 'left';
    
    // Company branding
    ctx.fillText('BARIKI KANENO', 30, barY + 30);
    
    // Business report style subtitle
    ctx.font = `400 ${getResponsiveFontSize(14)}px 'Arial', sans-serif`;
    const subtitle = language === 'sw' ? 'Ripoti ya Biashara' : 'Business Report';
    ctx.fillText(subtitle, 30, barY + 50);
    
    // Time/scene indicator (BBC style)
    ctx.textAlign = 'right';
    ctx.font = `500 ${getResponsiveFontSize(16)}px 'Arial', sans-serif`;
    const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    ctx.fillText(timestamp, canvas.width - 30, barY + 40);
    
    ctx.restore();
  };

  const getResponsiveFontSize = (baseSize: number): number => {
    const scaleFactor = Math.min(dimensions.width / 800, dimensions.height / 450);
    return Math.max(12, baseSize * scaleFactor);
  };

  const drawBBCIntroScene = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, progress: number, elapsed: number) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 40; // Adjust for lower third

    ctx.save();
    ctx.textAlign = 'center';
    
    // BBC-style main headline
    const titleSize = getResponsiveFontSize(48);
    ctx.font = `700 ${titleSize}px 'Arial', sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 4;
    
    const mainHeadline = language === 'sw' 
      ? 'SULUHISHO ZA BIASHARA'
      : 'BUSINESS SOLUTIONS';
    ctx.fillText(mainHeadline, centerX, centerY - 60);

    // Subtitle with BBC styling
    if (progress > 0.3) {
      const subtitleAlpha = Math.min(1, (progress - 0.3) / 0.4);
      ctx.save();
      ctx.globalAlpha = subtitleAlpha;
      ctx.font = `400 ${getResponsiveFontSize(24)}px 'Arial', sans-serif`;
      ctx.fillStyle = '#CCCCCC';
      
      const subtitle = language === 'sw'
        ? 'Ufuatiliaji wa Kina wa Mafanikio ya Biashara'
        : 'In-Depth Analysis of Business Success';
      ctx.fillText(subtitle, centerX, centerY - 20);
      ctx.restore();
    }

    // Key value proposition (BBC news style)
    if (progress > 0.6) {
      const valueAlpha = Math.min(1, (progress - 0.6) / 0.3);
      ctx.save();
      ctx.globalAlpha = valueAlpha;
      
      // Red highlight box
      const boxWidth = 400;
      const boxHeight = 60;
      const boxX = centerX - boxWidth / 2;
      const boxY = centerY + 20;
      
      ctx.fillStyle = '#E31E24';
      ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
      
      // White border
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
      
      ctx.font = `600 ${getResponsiveFontSize(20)}px 'Arial', sans-serif`;
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      
      const valueText = language === 'sw'
        ? 'Ukuaji wa 300% Uliohakikiwa'
        : '300% Verified Growth';
      ctx.fillText(valueText, centerX, boxY + 38);
      
      ctx.restore();
    }

    ctx.restore();
  };

  const drawBBCServiceScene = (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement, 
    service: Service, 
    progress: number,
    elapsed: number
  ) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 40;

    // BBC-style service headline
    ctx.save();
    ctx.textAlign = 'left';
    ctx.font = `700 ${getResponsiveFontSize(32)}px 'Arial', sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 3;
    
    const title = language === 'sw' ? service.titleSw : service.titleEn;
    const titleLines = wrapText(ctx, title, canvas.width - 100);
    
    titleLines.forEach((line, index) => {
      ctx.fillText(line, 50, centerY - 80 + (index * 40));
    });

    // Red accent underline
    ctx.fillStyle = '#E31E24';
    ctx.fillRect(50, centerY - 35, 200, 3);

    // BBC-style description
    ctx.font = `400 ${getResponsiveFontSize(18)}px 'Arial', sans-serif`;
    ctx.fillStyle = '#CCCCCC';
    const desc = language === 'sw' ? service.descSw : service.descEn;
    const descLines = wrapText(ctx, desc, canvas.width - 100);
    
    descLines.forEach((line, index) => {
      ctx.fillText(line, 50, centerY - 10 + (index * 25));
    });

    // Business metrics (BBC data style)
    if (progress > 0.4) {
      const metricsAlpha = Math.min(1, (progress - 0.4) / 0.4);
      ctx.save();
      ctx.globalAlpha = metricsAlpha;
      
      // Metrics box
      const metricsY = centerY + 40;
      ctx.fillStyle = 'rgba(227, 30, 36, 0.1)';
      ctx.fillRect(50, metricsY, canvas.width - 100, 80);
      
      ctx.strokeStyle = '#E31E24';
      ctx.lineWidth = 1;
      ctx.strokeRect(50, metricsY, canvas.width - 100, 80);
      
      ctx.font = `600 ${getResponsiveFontSize(16)}px 'Arial', sans-serif`;
      ctx.fillStyle = '#E31E24';
      ctx.textAlign = 'left';
      
      const businessValue = language === 'sw' ? service.businessValueSw : service.businessValue;
      ctx.fillText(businessValue, 70, metricsY + 30);
      
      ctx.font = `400 ${getResponsiveFontSize(14)}px 'Arial', sans-serif`;
      ctx.fillStyle = '#FFFFFF';
      const guarantee = language === 'sw' ? service.guaranteeSw : service.guaranteeEn;
      ctx.fillText(guarantee, 70, metricsY + 55);
      
      ctx.restore();
    }

    // Feature list (BBC bullet style)
    if (progress > 0.7) {
      const featuresAlpha = Math.min(1, (progress - 0.7) / 0.3);
      ctx.save();
      ctx.globalAlpha = featuresAlpha;
      
      const featuresStartY = centerY + 140;
      ctx.font = `400 ${getResponsiveFontSize(15)}px 'Arial', sans-serif`;
      ctx.fillStyle = '#CCCCCC';
      ctx.textAlign = 'left';
      
      service.features.slice(0, 2).forEach((feature, index) => {
        const featureY = featuresStartY + (index * 25);
        ctx.fillStyle = '#E31E24';
        ctx.fillText('■', 50, featureY);
        ctx.fillStyle = '#CCCCCC';
        ctx.fillText(feature, 75, featureY);
      });
      
      ctx.restore();
    }

    ctx.restore();
  };

  const drawBBCOutroScene = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, progress: number, elapsed: number) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 40;

    ctx.save();
    ctx.textAlign = 'center';
    
    // BBC-style closing headline
    ctx.font = `700 ${getResponsiveFontSize(36)}px 'Arial', sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 4;
    
    const closingText = language === 'sw' 
      ? 'ANZA SAFARI YAKO YA MAFANIKIO'
      : 'BEGIN YOUR SUCCESS JOURNEY';
    ctx.fillText(closingText, centerX, centerY - 60);

    // Contact information (BBC style)
    if (progress > 0.4) {
      const contactAlpha = Math.min(1, (progress - 0.4) / 0.4);
      ctx.save();
      ctx.globalAlpha = contactAlpha;
      
      // Contact box
      const boxWidth = 500;
      const boxHeight = 100;
      const boxX = centerX - boxWidth / 2;
      const boxY = centerY;
      
      ctx.fillStyle = 'rgba(227, 30, 36, 0.9)';
      ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
      
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
      
      ctx.font = `600 ${getResponsiveFontSize(18)}px 'Arial', sans-serif`;
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      
      const consultText = language === 'sw'
        ? 'Mazungumzo ya Bure ya Kitaalamu'
        : 'Professional Consultation Available';
      ctx.fillText(consultText, centerX, boxY + 35);
      
      ctx.font = `500 ${getResponsiveFontSize(16)}px 'Arial', sans-serif`;
      ctx.fillText('📧 bariki@kaneno.dev', centerX, boxY + 65);
      
      ctx.restore();
    }

    ctx.restore();
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const reset = () => {
    setCurrentScene(0);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sw' : 'en');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 sm:p-6 lg:p-8">
      {/* BBC-style header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between bg-red-600 text-white px-6 py-3 rounded-t-lg">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold text-sm">BK</span>
            </div>
            <span className="font-semibold">BARIKI KANENO BUSINESS</span>
          </div>
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-white/20 rounded text-sm hover:bg-white/30 transition-colors"
          >
            {language === 'en' ? 'Kiswahili' : 'English'}
          </button>
        </div>
      </div>

      {/* Main video container */}
      <div className="max-w-7xl mx-auto relative">
        <div className="relative bg-black rounded-b-lg overflow-hidden shadow-2xl border-l-4 border-r-4 border-b-4 border-red-600">
          <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className="block w-full h-auto"
          />
          
          {/* Controls */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={reset}
              className="p-2 bg-black/70 text-white rounded-full hover:bg-black/90 transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* BBC-style footer */}
      <div className="max-w-7xl mx-auto mt-4">
        <div className="bg-gray-800 text-gray-300 px-6 py-3 rounded-b-lg text-sm">
          <div className="flex justify-between items-center">
            <span>© 2024 Bariki Kaneno Business Solutions</span>
            <span className="text-red-400">LIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoVideo;