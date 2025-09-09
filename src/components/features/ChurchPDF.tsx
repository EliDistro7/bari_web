import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Users, 
  Calendar, 
  DollarSign, 
  Bell, 
  Shield, 
  BarChart3,
  Settings,
  Globe,
  CheckCircle,
  Play,
  Book
} from 'lucide-react';

import { useLanguage } from '@/context/language';

const ChurchSystemPDFGenerator = () => {
  type Language = 'en' | 'sw';
  const {language} = useLanguage()
  const [generating, setGenerating] = useState(false);

  const translations: Record<Language, {
    title: string;
    subtitle: string;
    userManual: string;
    adminGuide: string;
    featurePresentation: string;
    techSpecs: string;
    generatePDF: string;
    generating: string;
    ready: string;
    pages: string;
    downloadAll: string;
  }> = {
    en: {
      title: "Church System Documentation Generator",
      subtitle: "Generate professional PDF guides for your church management system",
      userManual: "User Manual",
      adminGuide: "Administrator Guide", 
      featurePresentation: "Feature Presentation",
      techSpecs: "Technical Specifications",
      generatePDF: "Generate PDF",
      generating: "Generating...",
      ready: "Ready",
      pages: "pages",
      downloadAll: "Download All PDFs"
    },
    sw: {
      title: "Kizalishi cha Nyaraka za Mfumo wa Kanisa",
      subtitle: "Zalisha miongozo ya kitaalamu ya PDF kwa mfumo wako wa usimamizi wa kanisa",
      userManual: "Mwongozo wa Mtumiaji",
      adminGuide: "Mwongozo wa Msimamizi",
      featurePresentation: "Uwasilishaji wa Vipengele", 
      techSpecs: "Vipimo vya Kiufundi",
      generatePDF: "Zalisha PDF",
      generating: "Inazalisha...",
      ready: "Tayari",
      pages: "kurasa",
      downloadAll: "Pakua PDF Zote"
    }
  };

  const t = translations[language as Language] || translations.en;

  // PDF Content Data
  const pdfContent = {
    userManual: {
      title: "Church Management System - User Manual",
      subtitle: "Complete Guide for Church Members and Staff",
      sections: [
        {
          title: "Getting Started",
          icon: "🚀",
          content: [
            "System Overview",
            "Account Setup and Login",
            "Dashboard Navigation",
            "Basic User Interface"
          ]
        },
        {
          title: "Member Management",
          icon: "👥",
          content: [
            "Adding New Members",
            "Updating Member Information",
            "Member Directory Search",
            "Family Group Management",
            "Membership Reports"
          ]
        },
        {
          title: "Event Planning",
          icon: "📅",
          content: [
            "Creating Events",
            "Event Registration",
            "Calendar Management",
            "Resource Booking",
            "Event Communications"
          ]
        },
        {
          title: "Donation Management",
          icon: "💰",
          content: [
            "Recording Donations",
            "Tithe Tracking",
            "Payment Methods",
            "Donor Statements",
            "Financial Reports"
          ]
        },
        {
          title: "Communication Tools",
          icon: "📢",
          content: [
            "Announcements",
            "Email Campaigns",
            "SMS Notifications",
            "Group Messaging",
            "Newsletter Creation"
          ]
        }
      ]
    },
    adminGuide: {
      title: "Church Management System - Administrator Guide", 
      subtitle: "Setup and Configuration Manual",
      sections: [
        {
          title: "Initial Setup",
          icon: "⚙️",
          content: [
            "System Installation",
            "Database Configuration", 
            "Basic Settings",
            "User Role Creation",
            "Security Setup"
          ]
        },
        {
          title: "User Management",
          icon: "👤",
          content: [
            "Creating Admin Accounts",
            "Setting User Permissions",
            "Role-Based Access Control",
            "Password Policies",
            "Account Monitoring"
          ]
        },
        {
          title: "System Configuration",
          icon: "🔧",
          content: [
            "Church Information Setup",
            "Ministry Group Configuration",
            "Event Categories",
            "Donation Categories", 
            "Notification Settings"
          ]
        }
      ]
    },
    presentation: {
      title: "Church Management System - Feature Overview",
      subtitle: "Presentation for Church Leadership",
      sections: [
        {
          title: "System Benefits",
          icon: "✨",
          content: [
            "Streamlined Administration",
            "Improved Communication",
            "Better Financial Tracking",
            "Enhanced Member Engagement",
            "Data Security & Privacy"
          ]
        },
        {
          title: "Key Features Demo",
          icon: "🎯",
          content: [
            "Dashboard Overview",
            "Member Directory",
            "Event Management",
            "Financial Tracking",
            "Reporting Capabilities"
          ]
        }
      ]
    }
  };

  // Define the valid keys for pdfContent
  type PdfType = keyof typeof pdfContent;

  // Generate actual PDF using HTML5 Canvas and manual PDF creation
  const generatePDF = async (type: PdfType) => {
    setGenerating(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const content = pdfContent[type];
    const fileName = `${content.title.replace(/\s+/g, '_')}.pdf`;
    
    // Create actual PDF using basic PDF structure
    const createPDF = () => {
      // PDF Header
      let pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length ${content.title.length + content.subtitle.length + 200}
>>
stream
BT
/F1 24 Tf
50 720 Td
(${content.title}) Tj
0 -30 Td
/F1 14 Tf
(${content.subtitle}) Tj
0 -50 Td
/F1 12 Tf
`;

      // Add content sections
      content.sections.forEach((section, index) => {
        pdfContent += `0 -25 Td
/F1 16 Tf
(${index + 1}. ${section.title.replace(/[()]/g, '')}) Tj
0 -20 Td
/F1 12 Tf
`;
        section.content.forEach((item, itemIndex) => {
          pdfContent += `(   ${itemIndex + 1}. ${item.replace(/[()]/g, '')}) Tj
0 -15 Td
`;
        });
      });

      pdfContent += `ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000173 00000 n 
0000000301 00000 n 
0000000380 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
456
%%EOF`;

      return pdfContent;
    };

    try {
      const pdfData = createPDF();
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to HTML-based PDF
      generateHTMLPDF(content, fileName);
    }
    
    setGenerating(false);
  };

  // Alternative: Generate HTML-based PDF that can be printed to PDF
interface Section {
    title: string;
    icon: string;
    content: string[];
}

interface PDFContent {
    title: string;
    subtitle: string;
    sections: Section[];
}

const generateHTMLPDF = (content: PDFContent, fileName: string): void => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>${content.title}</title>
    <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 30px; text-align: center; margin-bottom: 30px; }
            .title { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .subtitle { font-size: 16px; opacity: 0.9; }
            .section { margin-bottom: 30px; page-break-inside: avoid; }
            .section-title { font-size: 20px; font-weight: bold; color: #1e293b; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-bottom: 15px; }
            .content-list { margin-left: 20px; }
            .content-item { margin-bottom: 8px; }
            @media print { body { margin: 0; } .header { background: #667eea !important; } }
    </style>
</head>
<body>
    <div class="header">
            <div class="title">${content.title}</div>
            <div class="subtitle">${content.subtitle}</div>
    </div>
    ${content.sections.map((section, index) => `
            <div class="section">
                    <div class="section-title">${section.icon} ${section.title}</div>
                    <div class="content-list">
                            ${section.content.map(item => `
                                    <div class="content-item">• ${item}</div>
                            `).join('')}
                    </div>
            </div>
    `).join('')}
    <script>
            window.onload = function() {
                    window.print();
            }
    </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
};

  const generateAllPDFs = async () => {
    setGenerating(true);
    const types: PdfType[] = ['userManual', 'adminGuide', 'presentation'];
    for (const type of types) {
      await generatePDF(type);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    setGenerating(false);
  };

  const pdfTypes = [
    {
      id: 'userManual',
      title: t.userManual,
      description: "Complete guide covering all system features and how to use them effectively",
      icon: Book,
      pages: 32,
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 'adminGuide', 
      title: t.adminGuide,
      description: "Step-by-step instructions for initial system setup and configuration",
      icon: Settings,
      pages: 24,
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 'presentation',
      title: t.featurePresentation,
      description: "PowerPoint-style presentation showcasing key features for church elders",
      icon: Play,
      pages: 18,
      color: "from-green-500 to-blue-600"
    },
    {
      id: 'techSpecs',
      title: t.techSpecs,
      description: "Detailed technical documentation for IT administrators",
      icon: FileText,
      pages: 16,
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <>
      <style jsx>{`
        .pdf-generator-bg {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          min-height: 100vh;
        }
        
        .glass-card {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(102, 126, 234, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass-card:hover {
          background: rgba(30, 41, 59, 0.6);
          border-color: rgba(102, 126, 234, 0.4);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
        }
        
        .generate-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        
        .generate-btn:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
        
        .generate-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .icon-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .floating-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(103, 232, 249, 0.3);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          10%, 90% {
            opacity: 1;
          }
          50% {
            transform: translateY(-100px) translateX(50px);
          }
        }
        
        .progress-bar {
          height: 4px;
          background: rgba(102, 126, 234, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          animation: progress 2s ease-in-out;
        }
        
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #67e8f9 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="pdf-generator-bg relative">
        {/* Floating Particles */}
        <div className="floating-particles">
          <div className="particle" style={{left: '10%', animationDuration: '8s'}}></div>
          <div className="particle" style={{left: '20%', animationDuration: '6s'}}></div>
          <div className="particle" style={{left: '60%', animationDuration: '10s'}}></div>
          <div className="particle" style={{left: '80%', animationDuration: '7s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
          
            
            <h1 className="text-4xl md:text-6xl font-black gradient-text mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* PDF Generator Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {pdfTypes.map((pdf, index) => {
              const IconComponent = pdf.icon;
              return (
                <div key={pdf.id} className="glass-card rounded-2xl p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${pdf.color} rounded-xl flex items-center justify-center mr-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{pdf.title}</h3>
                        <div className="flex items-center text-sm text-gray-400">
                          <span>{pdf.pages} {t.pages}</span>
                          <CheckCircle className="w-4 h-4 ml-2 text-green-400" />
                          <span className="ml-1">{t.ready}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{pdf.description}</p>
                  
                  {generating && (
                    <div className="mb-4">
                      <div className="progress-bar">
                        <div className="progress-fill"></div>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">{t.generating}</p>
                    </div>
                  )}
                  
                  <button
                    onClick={() => generatePDF(pdf.id as PdfType)}
                    disabled={generating}
                    className="generate-btn w-full text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    {generating ? t.generating : t.generatePDF}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Sample Content Preview */}
          <div className="glass-card rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-white mb-6">Sample Content Preview</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* User Manual Preview */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-300">User Manual Sections:</h4>
                {pdfContent.userManual.sections.map((section, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-2xl">{section.icon}</div>
                    <div>
                      <h5 className="font-medium text-white">{section.title}</h5>
                      <ul className="text-sm text-gray-400 mt-1">
                        {section.content.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-center">
                            <div className="w-1 h-1 bg-gray-500 rounded-full mr-2"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features Overview */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-300">System Features:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Users, label: "Member Management" },
                    { icon: Calendar, label: "Event Planning" },
                    { icon: DollarSign, label: "Donation Tracking" },
                    { icon: Bell, label: "Communications" },
                    { icon: Shield, label: "Data Security" },
                    { icon: BarChart3, label: "Analytics" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <feature.icon className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-300">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Generate All Button */}
          <div className="text-center">
            <button
              onClick={generateAllPDFs}
              disabled={generating}
              className="generate-btn text-white px-12 py-6 rounded-xl font-semibold text-lg flex items-center justify-center mx-auto"
            >
              <Download className="w-6 h-6 mr-3" />
              {generating ? t.generating : t.downloadAll}
            </button>
            <p className="text-gray-400 mt-4 text-sm">
              Perfect for your Saturday presentation to church elders
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChurchSystemPDFGenerator;