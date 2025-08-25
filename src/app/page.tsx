'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Code, 
  Database, 
  Smartphone, 
  Globe, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Users,
  CheckCircle,
  ArrowRight,
  Calendar,
  Star,
  Play,
  Zap,
  Target,
  BarChart3,
  Settings,
  MessageSquare
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ConsultationCTA from '@/components/sections/ConsultationSection';
//import ChallengeAssessment from '@/components/features/ChallengeAssessment';
//import ROICalculator from '@/components/features/ROICalculator';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import PartnersBanner from '@/components/sections/Partner';
import PromoVideo from '@/components/sections/Promo2';

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [assessment, setAssessment] = useState<Record<string, boolean>>({});
  const [specs, setSpecs] = useState({ features: [] });
  const [roiInputs, setRoiInputs] = useState({ hoursPerWeek: '', hourlyRate: '', teamSize: '' });

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Club Management System",
      description: "Complete member management with automated billing and communication",
      impact: "Reduced admin work by 80%, increased member engagement by 60%",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      metrics: { timeReduction: "80%", costSavings: "$2,400/month", satisfaction: "95%" },
      image: "🏢",
      liveUrl: "#",
      status: "completed"
    },
    {
      id: 2,
      title: "Church Communication Platform",
      description: "Streamlined member communications and event management",
      impact: "Streamlined communications for 500+ members",
      tech: ["Next.js", "PostgreSQL", "AWS", "SendGrid"],
      metrics: { timeReduction: "70%", costSavings: "$1,800/month", satisfaction: "92%" },
      image: "⛪",
      liveUrl: "#",
      status: "completed"
    },
    {
      id: 3,
      title: "AI-Powered Analytics Dashboard",
      description: "Real-time business intelligence with predictive insights",
      impact: "Currently in development - 65% complete",
      tech: ["React", "Python", "FastAPI", "OpenAI"],
      metrics: { completion: 65 },
      image: "📊",
      status: "ongoing"
    }
  ];

  const services = [
    { icon: Globe, title: "Web Applications", desc: "Custom web solutions that scale with your business" },
    { icon: Smartphone, title: "Mobile Development", desc: "Cross-platform apps for iOS and Android" },
    { icon: Database, title: "System Integration", desc: "Connect your tools and automate workflows" },
    { icon: BarChart3, title: "Business Intelligence", desc: "Data-driven insights and reporting dashboards" }
  ];

  const challenges = [
    { id: 'manual', label: 'Manual processes taking too much time', solutions: ['automation', 'custom-software'] },
    { id: 'communication', label: 'Poor customer/member communication', solutions: ['web-portal', 'mobile-app'] },
    { id: 'data', label: 'Inefficient data management', solutions: ['database-optimization', 'dashboard'] },
    { id: 'online', label: 'Lack of online presence', solutions: ['website', 'e-commerce'] }
  ];

  const calculateROI = () => {
    const hours = parseFloat(roiInputs.hoursPerWeek) || 0;
    const rate = parseFloat(roiInputs.hourlyRate) || 0;
    const team = parseFloat(roiInputs.teamSize) || 1;
    
    const annualCost = hours * 52 * rate * team;
    const potentialSavings = annualCost * 0.7;
    const projectCost = 25000; // Example project cost
    
    return {
      annualCost: annualCost.toLocaleString(),
      savings: potentialSavings.toLocaleString(),
      breakEven: projectCost > 0 ? Math.ceil(projectCost / (potentialSavings / 12)) : 0
    };
  };

  const roi = calculateROI();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
    <Header />

      {/* Hero Section */}
     <HeroSection />
     <PromoVideo />
    <PartnersBanner />

      {/* Interactive Project Showcase */}
      <ProjectShowcase />
    

      {/* Services Section */}
       <ServicesSection />

    


      {/* Consultation CTA */}
       <ConsultationCTA />

      {/* Footer */}
     <Footer />
    </div>
  );
};

export default Portfolio;