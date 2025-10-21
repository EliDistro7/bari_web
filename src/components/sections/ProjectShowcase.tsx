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
      portfolioShowcase: "Portfolio",
      masterpiecesText: "Featured Work",
      exploreText: "Explore my collection of digital solutions",
      allProjects: "All",
      completed: "Live",
      inProgress: "In Progress",
      showcases: "Demos",
      live: "Live",
      wip: "WIP",
      demo: "Demo",
      progress: "Progress",
      visitLive: "Visit Site",
      viewDemo: "View Demo",
      haveProject: "Have a project in mind?",
      buildSomething: "Let's build it together",
      startProject: "Start Your Project",
      churchSystemDesc: "Complete church management system with member tracking, event scheduling, donation management, and multi-language support for Swahili congregations.",
      pichazangu: 'Web app for sharing and discovering stunning images by photographers worldwide.',
      mentalHealthDesc: "Static website with SANITY CMS promoting mental health and reproductive health awareness with educational blogs and resources for young people in Tanzania.",
      marketingCompanyDesc: "Professional marketing company website showcasing digital marketing services, branding solutions, and client success stories.",
      chui: "Online platform for Chui Batteries with product catalog, online ordering, and distributor network management.",
      elemi: 'A web profile for Elemi Electrical company showcasing services, projects, and client testimonials.',
      lubricantsDesc: "Online platform for Kechita Restaurant with meals catalog, online ordering.",
      farmImplementsDesc: "Agricultural equipment marketplace connecting farmers with quality farm implements and machinery suppliers.",
      ubuntuAppDesc: "Modern marketing application for Ubuntu O House with client management, campaign tracking, and analytics dashboard.",
      accountingAppDesc: "Comprehensive accounting application for Masatu service providers with invoicing, expense tracking, and financial reporting."
    },
    sw: {
      portfolioShowcase: "Kazi Zangu",
      masterpiecesText: "Kazi Muhimu",
      exploreText: "Angalia mkusanyiko wangu wa suluhisho za kidijitali",
      allProjects: "Zote",
      completed: "Hai",
      inProgress: "Inaendelea",
      showcases: "Maonyesho",
      live: "Hai",
      wip: "Inaendelea",
      demo: "Onyesho",
      progress: "Maendeleo",
      visitLive: "Tembelea",
      viewDemo: "Ona Demo",
      haveProject: "Una project?",
      buildSomething: "Tuunde pamoja",
      startProject: "Anza project yako",
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

  const projects = [
    {
      id: 1,
      title: "KKK Tyombo Church System",
      description: t.churchSystemDesc,
      category: "completed",
      type: "web",
      tech: ["React", "Node.js", "MongoDB"],
      image: "/images/projects/yombo.jpg",
      liveUrl: "https://kkktyombo.org",
      status: language === 'en' ? "1000+ members" : "Waumini 1000+",
      icon: Heart
    },
    {
      id: 2,
      title: "Online Media Storage",
      description: t.pichazangu,
      category: "completed",
      type: "web",
      tech: ["React", "Node.js", "MongoDB"],
      image: "/images/projects/pichazangu.jpg",
      liveUrl: "https://pichazangu.store",
      status: language === 'en' ? "For photographers" : "Kwa wapiga picha",
      icon: Heart
    },
    {
      id: 3,
      title: "Amkakijana Platform",
      description: t.mentalHealthDesc,
      category: "completed",
      type: "web",
      tech: ["React", "Next.js", "Tailwind"],
      image: "/images/projects/amka.jpg",
      liveUrl: "https://amkakijana.org",
      status: language === 'en' ? "5000+ monthly visitors" : "Wageni 5000+ kwa mwezi",
      icon: Heart
    },
    {
      id: 4,
      title: "Future Holders Marketing",
      description: t.marketingCompanyDesc,
      category: "completed",
      type: "web",
      tech: ["React", "Next.js", "Framer Motion"],
      image: "/images/projects/fh.jpg",
      liveUrl: "https://futureholders.pro",
      status: language === 'en' ? "Marketing agency" : "Wakala wa uuzaji",
      icon: TrendingUp
    },
    {
      id: 5,
      title: "Chui Batteries",
      description: t.chui,
      category: "completed",
      type: "web",
      tech: ["React", "WooCommerce", "PHP"],
      image: "/images/projects/chui.jpeg",
      liveUrl: "https://chui-battery-tanzania.com",
      status: language === 'en' ? "Auto batteries" : "Betri za magari",
      icon: Wrench
    },
    {
      id: 6,
      title: "Elemi Electrical",
      description: t.elemi,
      category: "completed",
      type: "web",
      tech: ["React", "Next.js"],
      image: "/images/projects/elemi3.jpg",
      liveUrl: "https://elemi-electrical.vercel.app",
      status: language === 'en' ? "Electrical solutions" : "Suluhisho za umeme",
      icon: Wrench
    },
    {
      id: 7,
      title: "Kechita Foods",
      description: t.lubricantsDesc,
      category: "progress",
      progress: 80,
      type: "web",
      tech: ["React", "WooCommerce", "PHP"],
      image: "/images/projects/kechita.jpg",
      liveUrl: "https://commerce-eta-eight.vercel.app",
      status: language === 'en' ? "Food ordering" : "Kuagiza chakula",
      icon: Wrench
    },
    {
      id: 8,
      title: "FourFreyn Farm Implements",
      description: t.farmImplementsDesc,
      category: "completed",
      type: "web",
      tech: ["WordPress", "WooCommerce"],
      image: "/images/projects/fourfreyn.jpg",
      liveUrl: "https://fourfreyn.com",
      status: language === 'en' ? "Agricultural equipment" : "Vifaa vya kilimo",
      icon: Leaf
    },
    {
      id: 9,
      title: "Ubuntu O House App",
      description: t.ubuntuAppDesc,
      category: "progress",
      type: "app",
      tech: ["React Native", "Firebase"],
      image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400&h=250&fit=crop&auto=format",
      progress: 85,
      status: language === 'en' ? "Marketing platform" : "Jukwaa la uuzaji",
      icon: Home
    },
    {
      id: 10,
      title: "Masatu Accounting",
      description: t.accountingAppDesc,
      category: "progress",
      type: "system",
      tech: ["Vue.js", "Laravel", "MySQL"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&auto=format",
      progress: 70,
      status: language === 'en' ? "Accounting system" : "Mfumo wa uhasibu",
      icon: Calculator
    }
  ];

  const categories = [
    { id: 'all', label: t.allProjects, icon: Rocket, count: projects.length },
    { id: 'completed', label: t.completed, icon: CheckCircle, count: projects.filter(p => p.category === 'completed').length },
    { id: 'progress', label: t.inProgress, icon: Clock, count: projects.filter(p => p.category === 'progress').length }
  ];

  const getTypeIcon = (type: string) => {
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
        .minimal-glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .project-card {
          transition: all 0.3s ease;
        }
        
        .project-card:hover {
          transform: translateY(-4px);
          border-color: rgba(102, 126, 234, 0.3);
        }
        
        .category-btn {
          transition: all 0.3s ease;
        }
        
        .category-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: rgba(102, 126, 234, 0.5);
        }
        
        .project-image {
          transition: transform 0.4s ease;
        }
        
        .project-card:hover .project-image {
          transform: scale(1.05);
        }
        
        .progress-bar {
          background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        }
      `}</style>

      <section id='projects' className="relative py-20 bg-gradient-to-b from-[#020617] via-[#0a0a1a] to-[#020617] overflow-hidden">
        {/* Subtle background effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="minimal-glass px-6 py-2 rounded-full text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                {t.portfolioShowcase}
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.masterpiecesText}
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t.exploreText}
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category-btn minimal-glass px-6 py-3 rounded-lg font-semibold text-sm ${
                    activeCategory === category.id ? 'active text-white' : 'text-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <IconComponent className="w-4 h-4" />
                    <span>{category.label}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-white/15">
                      {category.count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const TypeIcon = getTypeIcon(project.type);
              const ProjectIcon = project.icon;
              return (
                <div
                  key={project.id}
                  className="project-card minimal-glass rounded-xl overflow-hidden"
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="project-image w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur-lg ${
                        project.category === 'completed' ? 'bg-green-500/80 text-white' :
                        'bg-yellow-500/80 text-white'
                      }`}>
                        {project.category === 'completed' ? t.live : t.wip}
                      </span>
                    </div>
                    
                    {/* Icon */}
                    <div className="absolute top-3 left-3 minimal-glass p-2 rounded-lg">
                      <ProjectIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Progress Bar */}
                    {project.progress && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-400">{t.progress}</span>
                          <span className="text-xs font-semibold text-cyan-400">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="progress-bar h-1.5 rounded-full transition-all duration-1000"
                            style={{width: `${project.progress}%`}}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="px-2 py-1 rounded-md text-xs font-medium text-gray-300 bg-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Status */}
                    <p className="text-sm text-cyan-400 font-semibold mb-4">{project.status}</p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center justify-center"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          {t.visitLive}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-300 mb-6 text-lg">
              {t.haveProject}
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-bold"> {t.buildSomething}</span>
            </p>
            <button 
              onClick={openWhatsApp} 
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all inline-flex items-center"
            >
              {t.startProject}
              <Rocket className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsShowcase;