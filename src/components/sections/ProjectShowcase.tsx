import React, { useState } from 'react';
import { ExternalLink, Github, Play, Clock, CheckCircle, Sparkles, Code2, Smartphone, Globe, Database, Rocket } from 'lucide-react';

const ProjectsShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Template project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "ChurchConnect Pro",
      description: "Complete church management system with member tracking, event scheduling, and donation management.",
      category: "completed",
      type: "web",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=400&h=250&fit=crop&auto=format",
      liveUrl: "https://churchconnect.vercel.app",
      githubUrl: "https://github.com/yourusername/churchconnect",
      status: "Live with 500+ active users"
    },
    {
      id: 2,
      title: "EcoTrack Mobile",
      description: "Environmental impact tracking app with carbon footprint calculator and sustainability goals.",
      category: "progress",
      type: "app",
      tech: ["React Native", "Firebase", "Charts.js"],
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop&auto=format",
      progress: 75,
      status: "Beta testing phase"
    },
    {
      id: 3,
      title: "InvestPro Dashboard",
      description: "Real-time investment portfolio management with advanced analytics and risk assessment.",
      category: "draft",
      type: "web",
      tech: ["Next.js", "Python", "PostgreSQL", "D3.js"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&auto=format",
      demoUrl: "https://investpro-demo.vercel.app",
      status: "Showcase demo available"
    },
    {
      id: 4,
      title: "HealthSync System",
      description: "Hospital management system with patient records, appointment scheduling, and billing.",
      category: "completed",
      type: "system",
      tech: ["Vue.js", "Laravel", "MySQL", "Docker"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop&auto=format",
      liveUrl: "https://healthsync.com",
      status: "Serving 3 hospitals"
    },
    {
      id: 5,
      title: "AI Content Generator",
      description: "Smart content creation tool with AI-powered writing assistance and SEO optimization.",
      category: "progress",
      type: "web",
      tech: ["React", "OpenAI API", "Express", "Redis"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&auto=format",
      progress: 60,
      status: "MVP in development"
    },
    {
      id: 6,
      title: "CryptoWallet Pro",
      description: "Secure cryptocurrency wallet with multi-chain support and DeFi integration.",
      category: "draft",
      type: "app",
      tech: ["Flutter", "Web3", "Solidity", "AWS"],
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=250&fit=crop&auto=format",
      demoUrl: "https://cryptowallet-demo.vercel.app",
      status: "Concept demonstration"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Rocket, count: projects.length },
    { id: 'completed', label: 'Completed', icon: CheckCircle, count: projects.filter(p => p.category === 'completed').length },
    { id: 'progress', label: 'In Progress', icon: Clock, count: projects.filter(p => p.category === 'progress').length },
    { id: 'draft', label: 'Showcases', icon: Sparkles, count: projects.filter(p => p.category === 'draft').length }
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
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .project-card-3d:hover {
          transform: translateY(-20px) rotateY(10deg) rotateX(8deg) scale(1.02);
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.4),
            0 0 40px rgba(102, 126, 234, 0.3),
            0 0 80px rgba(118, 75, 162, 0.2);
          border-color: rgba(102, 126, 234, 0.4);
        }
        
        .category-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .category-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        
        .category-btn:hover:not(.active) {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
        }
        
        .tech-badge {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
          border: 1px solid rgba(102, 126, 234, 0.3);
        }
        
        .progress-bar {
          background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        }
        
        .project-image {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
        }
        
        .project-card-3d:hover .project-image {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .image-overlay {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .project-card-3d:hover .image-overlay {
          opacity: 1;
        }
        
        @keyframes pulseGlowSoft {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
            opacity: 1;
          }
          50% { 
            box-shadow: 0 0 40px rgba(118, 75, 162, 0.4);
            opacity: 0.9;
          }
        }
        
        .neon-text-soft {
          text-shadow: 0 0 8px rgba(102, 126, 234, 0.3);
        }
      `}</style>

      <section id='projects' className="relative py-24 overflow-hidden">
        {/* 3D Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* 3D Grid Background */}
        <div className="absolute inset-0 opacity-15">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="projectGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="url(#projectGridGradient)" strokeWidth="0.5" opacity="0.4"/>
              </pattern>
              <linearGradient id="projectGridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
                <stop offset="50%" style={{stopColor: '#764ba2', stopOpacity: 0.8}} />
                <stop offset="100%" style={{stopColor: '#f093fb', stopOpacity: 0.6}} />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#projectGrid)" />
          </svg>
        </div>
        
        {/* Floating 3D Geometric Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-28 h-28 opacity-8 floating-3d-slow">
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 transform rounded-lg shadow-2xl" 
                 style={{transform: 'rotateX(35deg) rotateY(45deg) rotateZ(10deg)'}}></div>
          </div>
          
          <div className="absolute top-1/4 right-24 w-20 h-20 opacity-12 floating-3d-slow" style={{animationDelay: '3s'}}>
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 transform rounded-xl shadow-2xl" 
                 style={{transform: 'rotateX(45deg) rotateY(-30deg) rotateZ(25deg)'}}></div>
          </div>
          
          <div className="absolute bottom-24 left-1/3 w-24 h-24 opacity-10 floating-3d-slow" style={{animationDelay: '6s'}}>
            <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-cyan-400 transform rounded-lg shadow-2xl" 
                 style={{transform: 'rotateX(-20deg) rotateY(60deg) rotateZ(-15deg)'}}></div>
          </div>
          
          {/* Code symbols */}
          <div className="absolute top-1/3 left-12 text-cyan-400 opacity-20 text-4xl floating-3d-slow pulse-glow-soft">{'<>'}</div>
          <div className="absolute top-2/3 right-16 text-purple-400 opacity-20 text-3xl floating-3d-slow pulse-glow-soft" style={{animationDelay: '2s'}}>{ '{}' }</div>
          <div className="absolute bottom-1/3 right-1/3 text-pink-400 opacity-20 text-2xl floating-3d-slow pulse-glow-soft" style={{animationDelay: '4s'}}>( )</div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="category-btn px-6 py-3 rounded-full">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold text-sm uppercase tracking-wider">
                  Portfolio Showcase
                </span>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 neon-text-soft">
              DIGITAL
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                MASTERPIECES
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Explore my collection of 
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold"> innovative solutions</span> - 
              from production applications to experimental showcases
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category-btn px-6 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                    activeCategory === category.id ? 'active text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5" />
                    <span>{category.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeCategory === category.id ? 'bg-white/20' : 'bg-white/10'
                    }`}>
                      {category.count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const TypeIcon = getTypeIcon(project.type);
              return (
                <div
                  key={project.id}
                  className="project-card-3d rounded-3xl p-8 shadow-2xl"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {/* Project Image */}
                  <div className="relative mb-6 rounded-xl overflow-hidden project-image">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 image-overlay flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <TypeIcon className="w-6 h-6 text-white" />
                        <span className="text-white font-semibold">{project.type.toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                        project.category === 'completed' ? 'bg-green-500/80 text-white' :
                        project.category === 'progress' ? 'bg-yellow-500/80 text-white' :
                        'bg-blue-500/80 text-white'
                      }`}>
                        {project.category === 'completed' ? 'Live' : 
                         project.category === 'progress' ? 'WIP' : 'Demo'}
                      </span>
                    </div>
                  </div>

                  {/* Project Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-3 neon-text-soft">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Progress Bar (for WIP projects) */}
                  {project.progress && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Progress</span>
                        <span className="text-sm font-semibold text-white">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="progress-bar h-2 rounded-full transition-all duration-500"
                          style={{width: `${project.progress}%`}}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="tech-badge px-3 py-1 rounded-lg text-xs font-medium text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Status */}
                  <p className="text-sm text-gray-500 mb-6">{project.status}</p>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Live
                      </a>
                    )}
                    
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        View Demo
                      </a>
                    )}
                    
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <p className="text-gray-300 mb-8 text-lg font-light">
              Have a project in mind? Let's 
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold"> build something amazing</span> together.
            </p>
            <button className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 pulse-glow-soft">
              <span className="relative z-10 flex items-center">
                Start Your Project
                <Rocket className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsShowcase;