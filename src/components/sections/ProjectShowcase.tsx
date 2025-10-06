import React, { useState } from 'react';
import { ExternalLink, Github, Play, Clock, CheckCircle, Sparkles, Code2, Smartphone, Globe, Database, Rocket, Heart, TrendingUp, Leaf, Wrench, Home, Calculator } from 'lucide-react';
import { useLanguage } from '@/context/language';

const ProjectsShowcase = () => {
  const { language } = useLanguage();
   const openWhatsApp = () => {
    const message = "Hi! I'm interested in learning more about your development services. Could you please provide more information?";
    const url = `https://wa.me/255765762688?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  const [activeCategory, setActiveCategory] = useState('all');

  const translations = {
    en: {
      portfolioShowcase: "Portfolio Showcase",
      digitalMasterpieces: "DIGITAL MASTERPIECES",
      digitalText: "DIGITAL",
      masterpiecesText: "MASTERPIECES",
      exploreText: "Explore my collection of",
      innovativeSolutions: "innovative solutions",
      fromProduction: "- from production applications to experimental showcases",
      allProjects: "All Projects",
      completed: "Completed",
      inProgress: "In Progress",
      showcases: "Showcases",
      live: "Live",
      wip: "WIP",
      demo: "Demo",
      progress: "Progress",
      visitLive: "Visit Live",
      viewDemo: "View Demo",
      haveProject: "Have a project in mind? Let's",
      buildSomething: "build something amazing",
      together: "together.",
      startProject: "Start Your Project",
      // Project descriptions
      churchSystemDesc: "Complete church management system with member tracking, event scheduling, donation management, and multi-language support for Swahili congregations.",
      pichazangu: 'Web app for sharing and discovering stunning images by photographers worldwide.',
      mentalHealthDesc: "Static website with SANITY CMS promoting mental health and reproductive health awareness with educational blogs and resources for young people in Tanzania.",
      marketingCompanyDesc: "Professional marketing company website showcasing digital marketing services, branding solutions, and client success stories.",
      chui: "Online platform for Chui Batteries with product catalog, online ordering, and distributor network management.",
      elemi: 'A web profile for Elemi Electrical company company showcasing services, projects, and client testimonials.',
      lubricantsDesc: "Online platform for Kechita Restaurant with meals catalog, online ordering.",
      farmImplementsDesc: "Agricultural equipment marketplace connecting farmers with quality farm implements and machinery suppliers.",
      ubuntuAppDesc: "Modern marketing application for Ubuntu O House with client management, campaign tracking, and analytics dashboard.",
      accountingAppDesc: "Comprehensive accounting application for Masatu service providers with invoicing, expense tracking, and financial reporting."
    },
    sw: {
      portfolioShowcase: "Mfumo wa Kazi",
      digitalMasterpieces: "KAZI ZANGU",
      digitalText: "KAZI ZA",
      masterpiecesText: "KIDIJITALI",
      exploreText: "Dodosa mkusanyiko wangu wa",
      innovativeSolutions: "suluhisho za ubunifu",
      fromProduction: "- Tovuti, Mifumo ya Tehama na Programu Tumishi",
      allProjects: "Project zote",
      completed: "Imekamilika",
      inProgress: "Inaendelea",
      showcases: "Maonyesho",
      live: "Hai",
      wip: "Inaendelea",
      demo: "Onyesho",
      progress: "Maendeleo",
      visitLive: "Tembelea Tovuti",
      viewDemo: "Ona Demo",
      haveProject: "Una project? Hebu",
      buildSomething: "tuunde kitu",
      together: "pamoja.",
      startProject: "Anza project yako",
      // Project descriptions
      churchSystemDesc: "Mfumo kamili wa usimamizi wa kanisa wenye ufuatiliaji wa waumini, ratiba za matukio, usimamizi wa michango, na lugha za Kiswahili.",
      pichazangu: 'Programu ya wavuti ya ku-share na kutunza picha za kupendeza kutoka kwa wapiga picha duniani kote.',
      mentalHealthDesc: "Tovuti tuli inayohamasisha uongozi wa afya ya akili na uzazi kwa vijana wa Tanzania kupitia blogu za elimu na rasilimali.",
      chui: "Jukwaa la mtandaoni la Chui Batteries lenye katalogi ya bidhaa, uagizaji mtandaoni, na usimamizi wa mtandao wa wasambazaji.",
      elemi: 'Profaili ya wavuti ya kampuni ya umeme ya Elemi ikionyesha huduma, miradi, na maoni ya wateja.',
      marketingCompanyDesc: "Tovuti ya mtaalamu ya kampuni ya uuzaji inayoonyesha huduma za uuzaji wa kidijitali, suluhisho za chapa, na hadithi za mafanikio ya wateja.",
      lubricantsDesc: "Jukwaa la kuweka order ya chakula kwa njia ya mtandao lenye katalogi ya vyakula, uagizaji mtandaoni, na usimamizi wa mtandao wa wasambazaji.",
      farmImplementsDesc: "Soko la vifaa vya kilimo linalowaunganisha wakulima na wasambazaji wa vifaa na mashine za kilimo zenye ubora.",
      ubuntuAppDesc: "Programu ya kisasa ya uuzaji ya Ubuntu O House yenye usimamizi wa wateja, ufuatiliaji wa kampeni, na dashibodi ya takwimu.",
      accountingAppDesc: "Programu kamili ya uhasibu kwa watoa huduma wa Masatu yenye bili, ufuatiliaji wa matumizi, na ripoti za kifedha."
    }
  };

  const t = translations[language as keyof typeof translations];

  // Real project data with your actual projects
  const projects = [
    {
      id: 1,
      title: "KKK Tyombo Church System",
      description: t.churchSystemDesc,
      category: "completed",
      type: "web",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "i18n"],
      image: "/images/projects/yombo.jpg",
      liveUrl: "https://kkktyombo.org",
      githubUrl: "#",
      status: language === 'en' ? "Serving 1000+ church members" : "Inahudumia waumini 1000+",
      icon: Heart
    },
      {
      id: 1,
      title: "Online media storage",
      description: t.pichazangu,
      category: "completed",
      type: "web",
      tech: ["React", "Node.js", "MongoDB",],
      image: "/images/projects/pichazangu.jpg",
      liveUrl: "https://pichazangu.store",
      githubUrl: "#",
      status: language === 'en' ? "A solution for all photographers ":"Jawabu kwa wapiga picha wote",
      icon: Heart
    },

    {
      id: 2,
      title: "Amkakijana Mental Health Platform",
      description: t.mentalHealthDesc,
      category: "completed",
      type: "web",
      tech: ["React", "Next.js", "Tailwind", "Markdown"],
      image: "/images/projects/amka.jpg",
      liveUrl: "https://amkakijana.org",
      status: language === 'en' ? "Educational resource for 5000+ monthly visitors" : "Rasilimali ya elimu kwa wageni 5000+ kwa mwezi",
      icon: Heart
    },
    {
      id: 3,
      title: "Future Holders Marketing Pro",
      description: t.marketingCompanyDesc,
      category: "completed",
      type: "web",
      tech: ["React", "Next.js", "Framer Motion", "CMS"],
      image: "/images/projects/fh.jpg",
      liveUrl: "https://futureholders.pro",
      status: language === 'en' ? "Growing digital marketing agency" : "Wakala wa uuzaji wa kidijitali unaoongezeka",
      icon: TrendingUp
    },
    {
      id: 4,
      title: "Chui Batteries",
      description: t.lubricantsDesc,
      category: "completed",
      type: "web",
      tech: ["React", "WooCommerce", "PHP", "Stripe", "Inventory"],
      image: "/images/projects/chui.jpeg",
      liveUrl: "https://chui-battery-tanzania.com",
      status: language === 'en' ? "Automobile Batteries" : "betri za magari",
      icon: Wrench
    },
      {
      id: 8,
      title: "Kechita Foods",
      description: t.lubricantsDesc,
         category: "progress",
         progress: 80,
      type: "web",
      tech: ["React", "WooCommerce", "PHP", "Stripe", "Inventory"],
      image: "/images/projects/kechita.jpg",
      liveUrl: "https://commerce-eta-eight.vercel.app/",
      status: language === 'en' ? "Automobile Batteries" : "betri za magari",
      icon: Wrench
    },
    {
      id: 5,
      title: "FourFreyn Farm Implements",
      description: t.farmImplementsDesc,
      category: "completed",
      type: "web",
      tech: ["WordPress", "WooCommerce", "Custom PHP", "Payment Gateway"],
      image: "/images/projects/fourfreyn.jpg",
      liveUrl: "https://fourfreyn.com",
      status: language === 'en' ? "Agricultural equipment supplier" : "Msambazaji wa vifaa vya kilimo",
      icon: Leaf
    },
    {
      id: 6,
      title: "Ubuntu O House Marketing App",
      description: t.ubuntuAppDesc,
      category: "progress",
      type: "app",
      tech: ["React Native", "Firebase", "Analytics", "Push Notifications"],
      image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400&h=250&fit=crop&auto=format",
      progress: 85,
      status: language === 'en' ? "Marketing automation platform" : "Jukwaa la uuzaji la kiotomatiki",
      icon: Home
    },
    {
      id: 7,
      title: "Masatu Service Provider Accounting",
      description: t.accountingAppDesc,
      category: "progress",
      type: "system",
      tech: ["Vue.js", "Laravel", "MySQL", "PDF Reports", "Multi-currency"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&auto=format",
      progress: 70,
      status: language === 'en' ? "Comprehensive accounting solution" : "Suluhisho kamili la uhasibu",
      icon: Calculator
    }
  ];

  const categories = [
    { id: 'all', label: t.allProjects, icon: Rocket, count: projects.length },
    { id: 'completed', label: t.completed, icon: CheckCircle, count: projects.filter(p => p.category === 'completed').length },
    { id: 'progress', label: t.inProgress, icon: Clock, count: projects.filter(p => p.category === 'progress').length },
    { id: 'draft', label: t.showcases, icon: Sparkles, count: projects.filter(p => p.category === 'draft').length }
  ];

  const getTypeIcon = (type:string) => {
    switch(type) {
      case 'web': return Globe;
      case 'app': return Smartphone;
      case 'system': return Database;
      default: return Code2;
    }
  };

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <>
      <style jsx>{`
        .floating-3d-slow {
          animation: float3dSlow 12s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        
        @keyframes float3dSlow {
          0%, 100% { 
            transform: translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg); 
          }
          25% { 
            transform: translateY(-20px) translateZ(15px) rotateX(8deg) rotateY(12deg); 
          }
          50% { 
            transform: translateY(-25px) translateZ(8px) rotateX(-4deg) rotateY(-8deg); 
          }
          75% { 
            transform: translateY(-15px) translateZ(20px) rotateX(12deg) rotateY(4deg); 
          }
        }
        
        .project-card-3d {
          transform-style: preserve-3d;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(25px);
          border: 2px solid rgba(255, 255, 255, 0.15);
        }
        
        .project-card-3d:hover {
          transform: translateY(-25px) rotateY(12deg) rotateX(10deg) scale(1.03);
          box-shadow: 
            0 35px 80px rgba(0, 0, 0, 0.5),
            0 0 50px rgba(102, 126, 234, 0.4),
            0 0 100px rgba(118, 75, 162, 0.3);
          border-color: rgba(102, 126, 234, 0.5);
          background: rgba(255, 255, 255, 0.12);
        }
        
        /* Disable hover effects on mobile */
        @media (max-width: 768px) {
          .project-card-3d:hover {
            transform: none;
            box-shadow: none;
            border-color: rgba(255, 255, 255, 0.15);
            background: rgba(255, 255, 255, 0.08);
          }
          
          .project-card-3d:hover .project-image {
            transform: none;
            box-shadow: none;
          }
        }
        
        .category-btn {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border: 2px solid rgba(255, 255, 255, 0.15);
        }
        
        .category-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        @media (max-width: 768px) {
          .category-btn.active {
            transform: none;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
          }
        }
        
        .category-btn:hover:not(.active) {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px) scale(1.01);
          border-color: rgba(102, 126, 234, 0.3);
        }
        
        @media (max-width: 768px) {
          .category-btn:hover:not(.active) {
            transform: none;
          }
        }
        
        .tech-badge {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
          border: 1px solid rgba(102, 126, 234, 0.4);
          backdrop-filter: blur(10px);
        }
        
        .progress-bar {
          background: linear-gradient(90deg, #667eea 0%, #764ba2 30%, #f093fb 60%, #4facfe 100%);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .project-image {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
        }
        
        .project-card-3d:hover .project-image {
          transform: scale(1.08) rotateZ(2deg);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }
        
        .image-overlay {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 50%, rgba(240, 147, 251, 0.8) 100%);
          opacity: 0;
          transition: all 0.4s ease;
        }
        
        .project-card-3d:hover .image-overlay {
          opacity: 1;
        }
        
        @keyframes pulseGlowBold {
          0%, 100% { 
            box-shadow: 0 0 30px rgba(102, 126, 234, 0.3), 0 0 60px rgba(118, 75, 162, 0.2);
            opacity: 1;
          }
          50% { 
            box-shadow: 0 0 50px rgba(118, 75, 162, 0.5), 0 0 80px rgba(240, 147, 251, 0.3);
            opacity: 0.9;
          }
        }
        
        .pulse-glow-bold {
          animation: pulseGlowBold 3s infinite;
        }
        
        .neon-text-bold {
          text-shadow: 0 0 15px rgba(102, 126, 234, 0.5), 0 0 30px rgba(118, 75, 162, 0.3);
        }
        
        .credibility-boost {
          font-weight: 900;
          font-size: 1.1em;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
        }
        
        .project-icon {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(102, 126, 234, 0.3);
        }
      `}</style>

      <section id='projects' className="relative py-16 sm:py-28 overflow-hidden">
        {/* Enhanced 3D Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* Enhanced Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="projectGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="url(#projectGridGradient)" strokeWidth="1" opacity="0.6"/>
              </pattern>
              <linearGradient id="projectGridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
                <stop offset="30%" style={{stopColor: '#764ba2', stopOpacity: 0.9}} />
                <stop offset="70%" style={{stopColor: '#f093fb', stopOpacity: 0.8}} />
                <stop offset="100%" style={{stopColor: '#4facfe', stopOpacity: 0.7}} />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#projectGrid)" />
          </svg>
        </div>
        
        {/* Enhanced Floating Elements - Hidden on mobile */}
        <div className="absolute inset-0 hidden md:block">
          <div className="absolute top-20 left-20 w-32 h-32 opacity-15 floating-3d-slow">
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 transform rounded-xl shadow-2xl pulse-glow-bold" 
                 style={{transform: 'rotateX(35deg) rotateY(45deg) rotateZ(10deg)'}}></div>
          </div>
          
          <div className="absolute top-1/4 right-28 w-24 h-24 opacity-20 floating-3d-slow" style={{animationDelay: '2s'}}>
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 transform rounded-2xl shadow-2xl pulse-glow-bold" 
                 style={{transform: 'rotateX(45deg) rotateY(-30deg) rotateZ(25deg)'}}></div>
          </div>
          
          <div className="absolute bottom-28 left-1/3 w-28 h-28 opacity-18 floating-3d-slow" style={{animationDelay: '4s'}}>
            <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-cyan-400 transform rounded-xl shadow-2xl pulse-glow-bold" 
                 style={{transform: 'rotateX(-20deg) rotateY(60deg) rotateZ(-15deg)'}}></div>
          </div>
          
          {/* Enhanced Code Symbols */}
          <div className="absolute top-1/3 left-16 text-cyan-400 opacity-30 text-5xl floating-3d-slow pulse-glow-bold font-black">{'<>'}</div>
          <div className="absolute top-2/3 right-20 text-purple-400 opacity-30 text-4xl floating-3d-slow pulse-glow-bold font-black" style={{animationDelay: '1.5s'}}>{ '{}' }</div>
          <div className="absolute bottom-1/3 right-1/3 text-pink-400 opacity-30 text-3xl floating-3d-slow pulse-glow-bold font-black" style={{animationDelay: '3s'}}>( )</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-16 sm:mb-24">
            <div className="inline-block mb-6 sm:mb-8">
              <div className="category-btn px-4 sm:px-8 py-3 sm:py-4 rounded-full">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-black text-sm sm:text-base uppercase tracking-widest">
                  {t.portfolioShowcase}
                </span>
              </div>
            </div>
            
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 sm:mb-8 neon-text-bold leading-tight">
           
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.masterpiecesText}
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed px-4">
              {t.exploreText}
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-black"> {t.innovativeSolutions}</span>
              {t.fromProduction}
            </p>
          </div>

          {/* Enhanced Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-16 sm:mb-20 px-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category-btn px-4 sm:px-8 py-3 sm:py-5 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 ${
                    activeCategory === category.id ? 'active text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="hidden sm:inline">{category.label}</span>
                    <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-black ${
                      activeCategory === category.id ? 'bg-white/25' : 'bg-white/15'
                    }`}>
                      {category.count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Enhanced Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {filteredProjects.map((project, index) => {
              const TypeIcon = getTypeIcon(project.type);
              const ProjectIcon = project.icon;
              return (
                <div
                  key={project.id}
                  className="project-card-3d rounded-2xl sm:rounded-3xl p-4 sm:p-8 px-0 shadow-2xl"
                  style={{animationDelay: `${index * 0.15}s`}}
                >
                  {/* Enhanced Project Image */}
                  <div className="relative mb-6 sm:mb-8 overflow-hidden project-image rounded-2xl">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 sm:h-96 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 image-overlay flex items-center justify-center">
                      <div className="flex items-center space-x-3">
                        <TypeIcon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                        <span className="text-white font-black text-base sm:text-lg tracking-wider">{project.type.toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <span className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-black backdrop-blur-lg ${
                        project.category === 'completed' ? 'bg-green-500/90 text-white shadow-lg shadow-green-500/50' :
                        project.category === 'progress' ? 'bg-yellow-500/90 text-white shadow-lg shadow-yellow-500/50' :
                        'bg-blue-500/90 text-white shadow-lg shadow-blue-500/50'
                      }`}>
                        {project.category === 'completed' ? t.live : 
                         project.category === 'progress' ? t.wip : t.demo}
                      </span>
                    </div>
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 project-icon p-2 sm:p-3 rounded-xl">
                      <ProjectIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>

                  {/* Enhanced Project Title & Description */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black px-4 sm:px-8 text-white mb-3 sm:mb-4 neon-text-bold leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-8 text-sm sm:text-base font-medium">
                    {project.description}
                  </p>

                  {/* Enhanced Progress Bar */}
                  {project.progress && (
                    <div className="mb-6 sm:mb-8 px-4 sm:px-8">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm sm:text-base text-gray-300 font-semibold">{t.progress}</span>
                        <span className="text-sm sm:text-base font-black text-white bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden">
                        <div 
                          className="progress-bar h-2 sm:h-3 rounded-full transition-all duration-1000 shadow-lg"
                          style={{width: `${project.progress}%`, backgroundSize: '200% 100%'}}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Tech Stack */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 px-4 sm:px-8">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="tech-badge px-2 sm:px-4 py-1 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Enhanced Status */}
                  <p className="text-sm sm:text-base credibility-boost mb-6 sm:mb-8 px-4 sm:px-8 font-black tracking-wide">{project.status}</p>

                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 px-4 sm:px-8">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 sm:px-5 py-3 sm:py-4 rounded-xl font-black text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center"
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        {t.visitLive}
                      </a>
                    )}
                    
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 sm:px-5 py-3 sm:py-4 rounded-xl font-black text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center"
                      >
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        {t.viewDemo}
                      </a>
                    )}
                    
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 sm:px-5 py-3 sm:py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center sm:block"
                      >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced Bottom CTA */}
          <div className="text-center mt-16 sm:mt-24 px-4">
            <p className="text-gray-300 mb-8 sm:mb-10 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
              {t.haveProject}
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-black"> {t.buildSomething}</span> {t.together}
            </p>
            <button onClick={openWhatsApp} className="group relative bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-2xl font-black text-lg sm:text-xl overflow-hidden transition-all duration-300 hover:scale-105 pulse-glow-bold shadow-2xl">
              <span className="relative z-10 flex items-center">
                {t.startProject}
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 ml-3 sm:ml-4 group-hover:translate-x-2 group-hover:rotate-12 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsShowcase;