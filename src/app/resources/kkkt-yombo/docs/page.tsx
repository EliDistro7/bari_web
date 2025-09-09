'use client';

import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Play, 
  Star, 
  Calendar, 
  Users, 
  BookOpen, 
  Shield, 
  Database, 
  Bell,
  Globe,
  ChevronDown,
  ExternalLink,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

import { useLanguage } from '@/context/language';
import ChurchSystemPDFGenerator from '@/components/features/ChurchPDF';
import PasswordProtection from '@/components/PasswordProtection';
import { useRouter } from 'next/navigation';

type Resource = {
  title: string;
  description: string;
  type: string;
  size: string;
  pages: string;
  status: 'ready' | 'coming-soon';
};

type Translation = {
  title: string;
  subtitle: string;
  churchSystem: string;
  systemDescription: string;
  features: string;
  documentation: string;
  downloads: string;
  presentation: string;
  lastUpdated: string;
  downloadPdf: string;
  viewDemo: string;
  comingSoon: string;
  backToHome: string;
  systemFeatures: string[];
  resources: Resource[];
  protectionTitle: string;
  protectionDescription: string;
};

type Language = 'en' | 'sw';

const ResourcesPageContent = () => {
  const {language} = useLanguage();
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const translations: Record<Language, Translation> = {
    en: {
      title: "Resources & Documentation",
      subtitle: "Comprehensive guides and documentation for church management systems",
      churchSystem: "Church Management System",
      systemDescription: "Complete digital solution for modern church administration and member management",
      features: "Key Features",
      documentation: "Documentation",
      downloads: "Downloads",
      presentation: "Presentation Ready",
      lastUpdated: "Last Updated",
      downloadPdf: "Download PDF Guide",
      viewDemo: "View Live Demo",
      comingSoon: "Coming Soon",
      backToHome: "Back to Home",
      protectionTitle: "Confidential Church Documentation",
      protectionDescription: "This documentation contains sensitive church management information and is restricted to authorized personnel only.",
      systemFeatures: [
        "Member Management & Directory",
        "Event Planning & Scheduling",
        "Donation & Tithe Tracking",
        "Communication System",
        "Financial Reports & Analytics",
        "Attendance Monitoring",
        "Ministry Group Management",
        "Secure Data Protection"
      ],
      resources: [
        {
          title: "Church System User Manual",
          description: "Complete guide covering all system features and how to use them effectively",
          type: "PDF Guide",
          size: "2.4 MB",
          pages: "32 pages",
          status: "ready"
        },
        {
          title: "Administrator Setup Guide", 
          description: "Step-by-step instructions for initial system setup and configuration",
          type: "PDF Guide",
          size: "1.8 MB", 
          pages: "24 pages",
          status: "ready"
        },
        {
          title: "Feature Overview Presentation",
          description: "PowerPoint presentation showcasing key features for church elders",
          type: "PPT Slides",
          size: "5.2 MB",
          pages: "18 slides", 
          status: "ready"
        },
        {
          title: "Technical Specifications",
          description: "Detailed technical documentation for IT administrators",
          type: "PDF Document",
          size: "1.2 MB",
          pages: "16 pages",
          status: "coming-soon"
        }
      ]
    },
    sw: {
      title: "Rasilimali na Nyaraka",
      subtitle: "Miongozo kamili na nyaraka za mifumo ya usimamizi wa kanisa",
      churchSystem: "Mfumo wa Usimamizi wa Kanisa",
      systemDescription: "Suluhisho kamili la kidijitali kwa utawala wa kisasa wa kanisa na usimamizi wa wanachama",
      features: "Vipengele Muhimu",
      documentation: "Nyaraka",
      downloads: "Pakua",
      presentation: "Tayari kwa Uwasilishaji",
      lastUpdated: "Imesasishwa Mwisho",
      downloadPdf: "Pakua Mwongozo PDF",
      viewDemo: "Ona Onyesho la Moja kwa Moja",
      comingSoon: "Inakuja Hivi Karibuni",
      backToHome: "Rudi Nyumbani",
      protectionTitle: "Nyaraka za Siri za Kanisa",
      protectionDescription: "Nyaraka hizi zina taarifa nyeti za usimamizi wa kanisa na zimewekewa vikwazo kwa wafanyakazi walioidhinishwa tu.",
      systemFeatures: [
        "Usimamizi wa Wanachama na Saraka",
        "Kupanga Matukio na Ratiba",
        "Kufuatilia Michango na Zaka",
        "Mfumo wa Mawasiliano",
        "Ripoti za Kifedha na Uchanganuzi",
        "Kufuatilia Mahudhurio",
        "Usimamizi wa Vikundi vya Huduma",
        "Ulinzi Salama wa Data"
      ],
      resources: [
        {
          title: "Mwongozo wa Mtumiaji wa Mfumo wa Kanisa",
          description: "Mwongozo kamili unaofunika vipengele vyote vya mfumo na jinsi ya kuvitumia kwa ufanisi",
          type: "Mwongozo PDF",
          size: "2.4 MB",
          pages: "kurasa 32",
          status: "ready"
        },
        {
          title: "Mwongozo wa Usanidi wa Msimamizi",
          description: "Maelekezo ya hatua kwa hatua ya usanidi wa awali wa mfumo na usanidi",
          type: "Mwongozo PDF", 
          size: "1.8 MB",
          pages: "kurasa 24",
          status: "ready"
        },
        {
          title: "Uwasilishaji wa Muhtasari wa Vipengele",
          description: "Uwasilishaji wa PowerPoint unaoonyesha vipengele muhimu kwa wazee wa kanisa",
          type: "Slaidi za PPT",
          size: "5.2 MB",
          pages: "slaidi 18",
          status: "ready"
        },
        {
          title: "Vipimo vya Kiufundi",
          description: "Nyaraka za kina za kiufundi kwa wasimamizi wa IT",
          type: "Nyaraka za PDF",
          size: "1.2 MB", 
          pages: "kurasa 16",
          status: "coming-soon"
        }
      ]
    }
  };

  const t = translations[language as Language] || translations.en;

  const toggleSection = (section: string): void => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleDownload = (resourceTitle: string) => {
    // In a real implementation, this would trigger the actual file download
    alert(`Downloading: ${resourceTitle}`);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen "
    style={{background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'}}>
      {/* Back Button */}
      <div className="p-4">
        <button
          onClick={handleBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-all duration-300 group glass-effect rounded-lg"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          {t.backToHome}
        </button>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <ChurchSystemPDFGenerator />
      </div>
    </div>
  );
};

const ProtectedResourcesPage = () => {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Confidential Church Documentation",
      description: "This documentation contains sensitive church management information and is restricted to authorized personnel only."
    },
    sw: {
      title: "Nyaraka za Siri za Kanisa", 
      description: "Nyaraka hizi zina taarifa nyeti za usimamizi wa kanisa na zimewekewa vikwazo kwa wafanyakazi walioidhinishwa tu."
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <PasswordProtection
      title={t.title}
      description={t.description}
      sessionKey="church-docs-access"
      maxAttempts={3}
      lockoutDuration={15}
    >
      <ResourcesPageContent />
    </PasswordProtection>
  );
};

export default ProtectedResourcesPage;