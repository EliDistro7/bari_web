import React, { useState } from 'react';
import { Globe, Smartphone, Database, BarChart3, Zap, Shield, Clock, TrendingUp, X, ExternalLink, MessageCircle, FileText } from 'lucide-react';

const services = [
  { 
    icon: Globe, 
    title: "Web Applications", 
    shortDesc: "Interactive business solutions that run in web browsers",
    desc: "Full-stack web solutions with modern frameworks and scalable architecture",
    features: ["React/Next.js", "Node.js Backend", "Cloud Deployment", "SEO Optimized"],
    gradient: "from-cyan-400 to-blue-500",
    whoNeedsIt: [
      "Growing businesses needing online presence",
      "Companies wanting to automate processes",
      "Startups building their first digital product",
      "Organizations needing customer portals"
    ],
    businessChallenges: [
      "Manual processes eating up time and resources",
      "Poor customer experience due to outdated systems",
      "Difficulty scaling operations efficiently",
      "Need for real-time data and analytics",
      "Competition moving ahead with digital solutions"
    ],
    detailedDescription: `Web applications are interactive software programs that run in web browsers, accessible from any device with internet connectivity. Unlike traditional websites that just display information, web applications allow users to perform complex tasks, process data, and interact with your business in real-time.

**What Makes Web Applications Special:**
• **Real-time Interaction**: Users can input data, get instant responses, and see live updates
• **Cross-platform Access**: Works on desktops, tablets, and mobile devices without separate apps
• **Automatic Updates**: Changes are deployed once and immediately available to all users
• **Cost-effective**: No need to develop separate applications for different platforms

**How Web Applications Transform Your Business:**

**1. Process Automation**
Transform manual, paper-based processes into streamlined digital workflows. From inventory management to customer onboarding, web applications can automate repetitive tasks, reducing errors and freeing up your team for strategic work.

**2. Enhanced Customer Experience**
Provide customers with self-service portals where they can check order status, make payments, schedule appointments, or access their account information 24/7. This reduces support calls and increases customer satisfaction.

**3. Real-time Business Intelligence**
Get instant access to your business data through custom dashboards. Track sales performance, monitor inventory levels, analyze customer behavior, and make data-driven decisions faster than ever.

**4. Scalable Growth**
As your business grows, your web application grows with you. Add new features, integrate with additional systems, and handle more users without the limitations of traditional software.

**Common Use Cases:**
• **E-commerce Platforms**: Custom online stores with advanced features
• **Customer Relationship Management (CRM)**: Track and manage customer interactions
• **Project Management Tools**: Coordinate teams and track progress
• **Booking Systems**: Schedule appointments, reservations, or services
• **Financial Management**: Invoicing, expense tracking, and reporting
• **Learning Management Systems**: Training and educational platforms

**Investment & ROI:**
While the initial investment varies based on complexity, most businesses see ROI within 6-12 months through increased efficiency, reduced operational costs, and new revenue opportunities. The long-term benefits include competitive advantage, improved customer retention, and scalable growth potential.`
  },
  {
    icon: FileText,
    title: "Static Websites",
    shortDesc: "Fast, secure, and cost-effective websites for professional presence",
    desc: "High-performance static websites optimized for speed, security, and search engines",
    features: ["Lightning Fast", "SEO Optimized", "Mobile Responsive", "Easy Maintenance"],
    gradient: "from-green-400 to-blue-500",
    whoNeedsIt: [
      "Small businesses establishing online presence",
      "Professionals showcasing portfolios",
      "Local service providers",
      "Companies needing landing pages"
    ],
    businessChallenges: [
      "High website maintenance costs",
      "Slow loading speeds losing customers",
      "Poor search engine visibility",
      "Security vulnerabilities from complex systems",
      "Need for professional credibility online"
    ],
    detailedDescription: `Static websites are modern, high-performance websites that deliver content directly to users without requiring server-side processing. They represent the perfect solution for businesses that need a professional online presence without the complexity and costs associated with dynamic web applications.

**What Are Static Websites:**
Static websites consist of fixed content files (HTML, CSS, JavaScript) that are served directly to visitors. Unlike dynamic websites that generate content on-the-fly from databases, static sites deliver pre-built pages, resulting in exceptional speed and reliability.

**Key Advantages:**

**1. Blazing Fast Performance**
• Load times under 1 second, improving user experience and search rankings
• No database queries or server processing delays
• Optimized content delivery through global CDN networks
• Better mobile performance on slower connections

**2. Enhanced Security**
• Minimal attack surface with no server-side vulnerabilities
• No databases to hack or server scripts to exploit
• Automatic security updates and monitoring
• Peace of mind for business owners

**3. Cost-Effective Solution**
• Lower hosting costs (often under $10/month)
• Minimal maintenance requirements
• No complex server management needed
• Better ROI compared to traditional websites

**4. Superior SEO Performance**
• Faster loading speeds boost search rankings
• Clean, optimized code structure
• Easy implementation of SEO best practices
• Better mobile optimization scores

**Perfect For:**

**Small to Medium Businesses:**
• Professional service providers (lawyers, doctors, consultants)
• Restaurants and retail stores
• Real estate agents and agencies
• Creative professionals and freelancers

**Marketing Websites:**
• Product landing pages
• Event promotion sites
• Company brochure websites
• Portfolio showcases

**Content-Driven Sites:**
• Blogs and news sites
• Documentation sites
• Educational resources
• Non-profit organizations

**What You Get:**
• **Responsive Design**: Perfect display on all devices
• **Contact Forms**: Integrated inquiry and contact systems
• **Google Analytics**: Track visitor behavior and performance
• **Search Optimization**: Built-in SEO best practices
• **Social Media Integration**: Connect with your social presence
• **Content Management**: Easy-to-use admin panel for updates

**Business Impact:**
Most businesses see immediate improvements in website speed (50-90% faster), search rankings (20-40% improvement), and reduced bounce rates. The combination of better performance and lower costs typically results in 200-300% ROI within the first year.

**Maintenance & Support:**
Unlike complex web applications, static websites require minimal ongoing maintenance. Updates are simple, security is handled automatically, and the risk of downtime is significantly reduced.`
  },
  { 
    icon: Smartphone, 
    title: "Mobile Development", 
    shortDesc: "Native and cross-platform apps for iOS and Android",
    desc: "Native and cross-platform mobile apps for iOS and Android",
    features: ["React Native", "Flutter", "Native iOS/Android", "App Store Ready"],
    gradient: "from-purple-400 to-pink-500",
    whoNeedsIt: [
      "Businesses wanting direct customer engagement",
      "Service providers needing on-the-go solutions",
      "E-commerce companies expanding reach",
      "Organizations with mobile workforce"
    ],
    businessChallenges: [
      "Customers expect mobile-first experiences",
      "Competition has mobile apps while you don't",
      "Difficulty reaching customers on-the-go",
      "Need for push notifications and engagement",
      "Limited accessibility outside office hours"
    ],
    detailedDescription: `Mobile applications are software programs designed specifically for smartphones and tablets, providing users with convenient, on-the-go access to your business services. In today's mobile-first world, having a dedicated mobile app can be the difference between thriving and merely surviving.

**The Mobile Revolution:**
With over 6.8 billion smartphone users worldwide and people spending 90% of their mobile time in apps, mobile applications have become essential for business growth. Your customers are already on their phones – the question is whether you're there with them.

**Types of Mobile Development:**

**1. Native Development**
• **iOS (Swift/Objective-C)**: Optimized for iPhone and iPad users
• **Android (Kotlin/Java)**: Tailored for Google Play Store
• **Best Performance**: Fastest, most responsive user experience
• **Full Platform Access**: Utilize all device features and capabilities

**2. Cross-Platform Development**
• **React Native**: Build once, deploy to both iOS and Android
• **Flutter**: Google's framework for beautiful, fast apps
• **Cost-Effective**: 60-70% cost savings compared to native
• **Faster Time-to-Market**: Single codebase means quicker development

**How Mobile Apps Transform Your Business:**

**1. Direct Customer Connection**
• Push notifications reach customers instantly
• Build stronger brand loyalty through regular interaction
• Provide personalized experiences based on user behavior
• Increase customer lifetime value through engagement

**2. Enhanced User Experience**
• Faster access to your services (no browser needed)
• Offline functionality for core features
• Native device integration (camera, GPS, contacts)
• Intuitive touch-based interactions

**3. New Revenue Opportunities**
• In-app purchases and premium features
• Mobile-specific services and offerings
• Location-based promotions and deals
• Subscription models and recurring revenue

**4. Competitive Advantage**
• Stand out from competitors without mobile presence
• Appear more professional and established
• Capture mobile-first customers
• Build barriers to customer switching

**Industry Applications:**

**Retail & E-commerce:**
• Mobile shopping with easy checkout
• Loyalty programs and digital rewards
• Push notifications for sales and promotions
• Augmented reality for product visualization

**Healthcare & Fitness:**
• Appointment scheduling and reminders
• Telemedicine and remote consultations
• Health tracking and monitoring
• Prescription management

**Food & Hospitality:**
• Online ordering and delivery
• Table reservations and waitlist management
• Digital menus and contactless payment
• Customer feedback and reviews

**Professional Services:**
• Client portals and document sharing
• Service booking and scheduling
• Real-time project updates
• Mobile workforce management

**Financial Services:**
• Account management and transactions
• Investment tracking and trading
• Insurance claims and processing
• Budgeting and expense tracking

**Development Process:**
1. **Strategy & Planning**: Define goals and user requirements
2. **UI/UX Design**: Create intuitive, attractive interfaces
3. **Development**: Build with latest technologies and best practices
4. **Testing**: Ensure quality across all devices and scenarios
5. **App Store Submission**: Handle all submission requirements
6. **Launch & Marketing**: Support your app launch strategy
7. **Ongoing Maintenance**: Updates, bug fixes, and new features

**Investment & Returns:**
Mobile app development typically ranges from $15,000-$100,000+ depending on complexity. However, successful apps often generate 5-10x their development cost through increased sales, customer retention, and operational efficiency. Many businesses see payback within 12-18 months.

**Success Metrics:**
• Increased customer engagement (50-200% improvement)
• Higher conversion rates (2-3x mobile web)
• Improved customer retention (25-30% increase)
• New revenue streams and business opportunities`
  },
  { 
    icon: Database, 
    title: "System Integration", 
    shortDesc: "Connect different software systems for seamless data flow",
    desc: "Connect disparate systems and automate complex business workflows",
    features: ["API Integration", "Database Design", "Workflow Automation", "Legacy Migration"],
    gradient: "from-emerald-400 to-cyan-500",
    whoNeedsIt: [
      "Companies using multiple software systems",
      "Businesses with manual data entry",
      "Organizations with legacy systems",
      "Growing companies needing automation"
    ],
    businessChallenges: [
      "Data silos preventing complete business view",
      "Manual data entry causing errors and delays",
      "Inefficient workflows between departments",
      "Legacy systems not talking to new software",
      "Lack of real-time information for decisions"
    ],
    detailedDescription: `System Integration is the process of connecting different software applications, databases, and systems to work together as a unified whole. Instead of having isolated tools that don't communicate, system integration creates a seamless digital ecosystem where information flows automatically between all your business systems.

**The Integration Challenge:**
Most businesses use 10-15 different software tools: CRM systems, accounting software, inventory management, email marketing platforms, payment processors, and more. Without integration, these systems become data silos, forcing employees to manually transfer information, leading to errors, delays, and frustration.

**What System Integration Solves:**

**1. Data Silos Elimination**
• Centralize information from all systems
• Create single source of truth for business data
• Enable 360-degree view of customers and operations
• Eliminate duplicate data entry and inconsistencies

**2. Process Automation**
• Automate workflows between different systems
• Trigger actions based on data changes
• Reduce manual intervention and human errors
• Speed up business processes dramatically

**3. Real-time Information Flow**
• Instant data synchronization across systems
• Up-to-date information for better decision making
• Real-time reporting and analytics
• Immediate alerts and notifications

**Common Integration Scenarios:**

**Sales & Marketing Integration:**
• CRM ↔ Email Marketing: Sync contacts and campaign results
• Website ↔ CRM: Automatically capture leads
• E-commerce ↔ Inventory: Real-time stock updates
• Payment ↔ Accounting: Automatic transaction recording

**Operations Integration:**
• ERP ↔ Warehouse Management: Streamlined order fulfillment
• HR ↔ Payroll: Automatic employee data sync
• Project Management ↔ Time Tracking: Seamless billing
• Customer Support ↔ CRM: Complete customer history

**Financial Integration:**
• Bank ↔ Accounting: Automatic transaction import
• POS ↔ Inventory: Real-time sales updates
• Billing ↔ CRM: Automated invoice generation
• Expense ↔ Accounting: Streamlined reporting

**Types of Integration:**

**1. API Integration**
• Connect systems through Application Programming Interfaces
• Real-time data exchange between applications
• Scalable and secure connection methods
• Industry-standard protocols and formats

**2. Database Integration**
• Direct database connections for high-volume data transfer
• Data warehousing and business intelligence
• Master data management across systems
• Historical data migration and synchronization

**3. Middleware Solutions**
• Enterprise Service Bus (ESB) for complex integrations
• Message queuing for reliable data transfer
• Transformation engines for data format conversion
• Monitoring and management of integration flows

**4. Workflow Automation**
• Business process automation across systems
• Rule-based decision making and routing
• Exception handling and error recovery
• Audit trails and compliance reporting

**Business Benefits:**

**Operational Efficiency:**
• 50-80% reduction in manual data entry
• 40-60% faster process completion times
• 90% reduction in data entry errors
• Significant time savings for employees

**Better Decision Making:**
• Real-time access to complete business information
• Automated reporting and dashboards
• Predictive analytics based on integrated data
• Faster response to market changes

**Cost Savings:**
• Reduced labor costs from automation
• Lower error correction expenses
• Decreased system maintenance overhead
• Better resource utilization

**Scalability:**
• Easy addition of new systems and applications
• Flexible architecture that grows with business
• Reduced complexity of managing multiple systems
• Future-proof integration platform

**Integration Process:**

1. **Assessment**: Analyze current systems and integration needs
2. **Architecture Design**: Plan optimal integration approach
3. **Development**: Build connections and data transformation logic
4. **Testing**: Ensure reliable data flow and error handling
5. **Deployment**: Implement integration with minimal disruption
6. **Monitoring**: Ongoing performance monitoring and optimization
7. **Maintenance**: Updates and support as systems evolve

**ROI and Investment:**
System integration projects typically cost $25,000-$200,000 depending on complexity but deliver 300-500% ROI through operational efficiency, reduced errors, and better decision making. Most organizations see payback within 12-24 months and continue to benefit for years as their integrated systems scale with business growth.`
  },
  { 
    icon: BarChart3, 
    title: "Business Intelligence", 
    shortDesc: "Transform data into actionable insights with custom dashboards",
    desc: "Transform raw data into actionable insights with custom dashboards",
    features: ["Real-time Analytics", "Custom Dashboards", "Data Visualization", "Reporting Tools"],
    gradient: "from-pink-400 to-purple-500",
    whoNeedsIt: [
      "Data-driven decision makers",
      "Companies with multiple data sources",
      "Businesses needing performance tracking",
      "Organizations wanting competitive advantage"
    ],
    businessChallenges: [
      "Drowning in data but lacking insights",
      "Manual reporting taking too much time",
      "Unable to spot trends and opportunities",
      "Decision making based on gut feeling",
      "Competitive disadvantage from slow analysis"
    ],
    detailedDescription: `Business Intelligence (BI) transforms your raw business data into meaningful, actionable insights that drive better decision-making and business growth. Instead of drowning in spreadsheets and disconnected reports, BI provides a clear, visual understanding of your business performance in real-time.

**The Data Problem:**
Modern businesses generate massive amounts of data from sales systems, customer interactions, financial transactions, marketing campaigns, and operational processes. However, most of this valuable information remains trapped in different systems, making it impossible to see the complete picture or make informed decisions quickly.

**What is Business Intelligence:**
Business Intelligence is a technology-driven process that combines data collection, data warehousing, and data analysis to present business information in user-friendly formats such as reports, dashboards, charts, and graphs. It transforms complex data into clear, actionable insights.

**Core Components:**

**1. Data Collection & Integration**
• Gather data from all business systems (CRM, ERP, marketing tools, etc.)
• Clean and standardize data for accurate analysis
• Create unified data warehouse or data lake
• Ensure data quality and consistency

**2. Data Analysis & Processing**
• Statistical analysis to identify patterns and trends
• Predictive analytics for forecasting
• Comparative analysis against benchmarks
• Real-time data processing for current insights

**3. Visualization & Reporting**
• Interactive dashboards with key performance indicators
• Automated report generation and distribution
• Mobile-friendly views for on-the-go access
• Drill-down capabilities for detailed analysis

**4. Self-Service Analytics**
• User-friendly tools for non-technical team members
• Drag-and-drop report builders
• Custom filter and view options
• Collaborative features for team insights

**Business Applications:**

**Sales Performance:**
• Revenue tracking and forecasting
• Sales pipeline analysis and conversion rates
• Territory and rep performance comparison
• Customer acquisition cost and lifetime value
• Product performance and profitability analysis

**Marketing Intelligence:**
• Campaign performance and ROI measurement
• Customer segmentation and behavior analysis
• Lead generation and conversion tracking
• Social media engagement and reach metrics
• Marketing attribution and channel effectiveness

**Financial Analytics:**
• Profit and loss analysis with drill-down capabilities
• Cash flow forecasting and budget variance
• Cost center analysis and expense tracking
• Financial ratios and key performance indicators
• Automated financial reporting and compliance

**Operations Intelligence:**
• Supply chain visibility and optimization
• Inventory levels and turnover analysis
• Production efficiency and quality metrics
• Resource utilization and capacity planning
• Process performance and bottleneck identification

**Customer Intelligence:**
• Customer satisfaction and loyalty metrics
• Churn prediction and retention strategies
• Support ticket analysis and resolution times
• Product usage patterns and feature adoption
• Cross-sell and upsell opportunities

**Key Benefits:**

**Faster Decision Making:**
• Real-time access to critical business metrics
• Instant alerts when KPIs go outside normal ranges
• Quick identification of problems and opportunities
• Reduced time from question to answer (hours vs. days)

**Improved Accuracy:**
• Eliminate manual data compilation errors
• Standardized calculations and definitions
• Single source of truth for all business metrics
• Automated data validation and quality checks

**Increased Profitability:**
• Identify most profitable products, customers, and channels
• Optimize pricing strategies based on data insights
• Reduce costs through operational efficiency
• Discover new revenue opportunities

**Competitive Advantage:**
• Faster response to market changes
• Better understanding of customer needs
• Data-driven product development
• Optimized business processes

**Enhanced Collaboration:**
• Shared dashboards for team alignment
• Consistent metrics across departments
• Collaborative analysis and insights sharing
• Improved communication with stakeholders

**BI Implementation Process:**

1. **Requirements Gathering**: Understand your specific analytical needs
2. **Data Assessment**: Evaluate current data sources and quality
3. **Architecture Design**: Plan optimal BI infrastructure
4. **Data Integration**: Connect and consolidate data sources
5. **Dashboard Development**: Create custom visualizations and reports
6. **User Training**: Ensure team can effectively use BI tools
7. **Ongoing Optimization**: Continuous improvement and expansion

**Technology Stack:**
• **Data Warehousing**: Amazon Redshift, Google BigQuery, Snowflake
• **Analytics Platforms**: Power BI, Tableau, Looker
• **Custom Dashboards**: React-based solutions, D3.js visualizations
• **Data Pipeline**: Apache Airflow, Azure Data Factory
• **Real-time Processing**: Apache Kafka, Stream Analytics

**ROI and Business Impact:**
Organizations implementing BI solutions typically see:
• 20-30% improvement in decision-making speed
• 15-25% increase in operational efficiency
• 10-15% revenue growth through better insights
• 200-400% ROI within 18-24 months
• Significant competitive advantages in their markets

**Investment Levels:**
• **Starter Package**: $15,000-$50,000 (basic dashboards and reporting)
• **Professional**: $50,000-$150,000 (advanced analytics and predictions)
• **Enterprise**: $150,000+ (comprehensive BI platform with AI/ML)

The key is starting with high-impact, quick-win analyses and gradually expanding your BI capabilities as you see results and identify additional opportunities.`
  }
];

type Service = typeof services[number];

const benefits = [
  { icon: Zap, title: "Fast Delivery", desc: "MVP in 4-6 weeks" },
  { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security" },
  { icon: Clock, title: "24/7 Support", desc: "Ongoing maintenance" },
  { icon: TrendingUp, title: "Scalable Solutions", desc: "Growth-ready architecture" }
];


const ServicesSection = () => {

  const openWhatsApp = () => {
    const message = "Hi! I'm interested in learning more about your development services. Could you please provide more information?";
    const url = `https://wa.me/255765762688?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  const closeModal = () => setSelectedService(null);

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <>
      <style jsx>{`
        .floating-3d-service {
          animation: floatService 10s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        
        @keyframes floatService {
          0%, 100% { 
            transform: translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg); 
          }
          25% { 
            transform: translateY(-12px) translateZ(15px) rotateX(5deg) rotateY(8deg); 
          }
          50% { 
            transform: translateY(-18px) translateZ(8px) rotateX(-3deg) rotateY(-5deg); 
          }
          75% { 
            transform: translateY(-8px) translateZ(20px) rotateX(8deg) rotateY(3deg); 
          }
        }
        
        .service-card-3d {
          transform-style: preserve-3d;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .service-card-3d:hover {
          transform: translateY(-25px) rotateY(12deg) rotateX(8deg) scale(1.03);
          box-shadow: 
            0 35px 70px rgba(0, 0, 0, 0.4),
            0 0 50px rgba(102, 126, 234, 0.3),
            0 0 100px rgba(118, 75, 162, 0.2);
          border-color: rgba(102, 126, 234, 0.4);
        }
        
        .service-icon-3d {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        
        .service-card-3d:hover .service-icon-3d {
          transform: scale(1.15) rotateY(15deg);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }
        
        .feature-badge {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .feature-badge:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }
        
        .benefit-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .benefit-card:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }
        
        .pulse-glow-service {
          animation: pulseGlowService 5s ease-in-out infinite;
        }
        
        @keyframes pulseGlowService {
          0%, 100% { 
            box-shadow: 0 0 15px rgba(102, 126, 234, 0.3);
            opacity: 1;
          }
          50% { 
            box-shadow: 0 0 30px rgba(118, 75, 162, 0.5);
            opacity: 0.9;
          }
        }
        
        .neon-text-service {
          text-shadow: 0 0 10px rgba(102, 126, 234, 0.4);
        }

        .modal-overlay {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
        }

        .modal-content {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-content::-webkit-scrollbar {
          width: 8px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background: rgba(102, 126, 234, 0.5);
          border-radius: 4px;
        }

        .whatsapp-float {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>

      <section id="services" className="relative py-24 overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* 3D Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="serviceGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="url(#serviceGridGradient)" strokeWidth="0.5" opacity="0.6"/>
              </pattern>
              <linearGradient id="serviceGridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
                <stop offset="50%" style={{stopColor: '#764ba2', stopOpacity: 0.8}} />
                <stop offset="100%" style={{stopColor: '#f093fb', stopOpacity: 0.6}} />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#serviceGrid)" />
          </svg>
        </div>
        
        {/* Floating 3D Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-24 h-24 opacity-8 floating-3d-service">
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 transform rounded-2xl shadow-2xl" 
                 style={{transform: 'rotateX(40deg) rotateY(30deg) rotateZ(15deg)'}}></div>
          </div>
          
          <div className="absolute top-1/3 right-24 w-20 h-20 opacity-10 floating-3d-service" style={{animationDelay: '2s'}}>
            <div className="w-full h-20 bg-gradient-to-br from-purple-400 to-pink-400 transform rounded-xl shadow-2xl" 
                 style={{transform: 'rotateX(25deg) rotateY(-45deg) rotateZ(30deg)'}}></div>
          </div>
          
          <div className="absolute bottom-32 left-1/4 w-16 h-16 opacity-12 floating-3d-service" style={{animationDelay: '4s'}}>
            <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-cyan-400 transform rounded-lg shadow-2xl" 
                 style={{transform: 'rotateX(-15deg) rotateY(50deg) rotateZ(-20deg)'}}></div>
          </div>
          
          {/* Code Elements */}
          <div className="absolute top-1/4 left-16 text-cyan-400 opacity-20 text-3xl floating-3d-service pulse-glow-service">&lt;/&gt;</div>
          <div className="absolute top-2/3 right-20 text-purple-400 opacity-20 text-2xl floating-3d-service pulse-glow-service" style={{animationDelay: '1s'}}>{ '{ }' }</div>
          <div className="absolute bottom-1/4 right-1/3 text-pink-400 opacity-20 text-xl floating-3d-service pulse-glow-service" style={{animationDelay: '3s'}}>[ ]</div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="benefit-card px-6 py-3 rounded-full">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold text-sm uppercase tracking-wider">
                  Premium Services
                </span>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 neon-text-service">
              SOLUTIONS THAT
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                SCALE WITH YOU
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              From concept to deployment, I provide 
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold"> end-to-end development services</span> that transform your business
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-20">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card-3d rounded-3xl p-8 shadow-2xl cursor-pointer"
                style={{animationDelay: `${index * 0.15}s`}}
                onClick={() => setSelectedService(service)}
              >
                {/* Service Icon */}
                <div className={`service-icon-3d w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-8 shadow-xl`}>
                  <service.icon className="w-10 h-10 text-white drop-shadow-lg" />
                </div>

                {/* Service Title & Description */}
                <h3 className="text-2xl font-bold text-white mb-4 neon-text-service">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  {service.shortDesc}
                </p>
                <p className="text-gray-500 mb-6 leading-relaxed text-xs">
                  {service.desc}
                </p>

                {/* Feature Tags */}
                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 2).map((feature, featureIndex) => (
                    <div key={featureIndex} className="feature-badge px-3 py-2 rounded-lg">
                      <span className="text-white text-xs font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                  {service.features.length > 2 && (
                    <div className="text-cyan-400 text-xs">
                      +{service.features.length - 2} more
                    </div>
                  )}
                </div>

                {/* Learn More Button */}
                <button className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-400 px-4 py-2 rounded-lg font-medium text-sm border border-cyan-400/30 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-purple-600/30 transition-all flex items-center justify-center">
                  Learn More
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card rounded-2xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-xl flex items-center justify-center`}>
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-gray-400 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-300 mb-8 text-lg font-light">
              Ready to transform your business with 
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold"> cutting-edge technology</span>?
            </p>
            <button 
              onClick={openWhatsApp}
              className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 pulse-glow-service"
            >
              <span className="relative z-10 flex items-center">
                Discuss Your Project
                <MessageCircle className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* WhatsApp Float Button */}
        <div className="whatsapp-float">
          <button
            onClick={openWhatsApp}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
            title="Chat with us on WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Service Detail Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 modal-overlay flex items-center justify-center p-4">
            <div className="modal-content rounded-3xl p-8 max-w-4xl w-full shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${selectedService.gradient} rounded-2xl flex items-center justify-center mr-6 shadow-xl`}>
                    <selectedService.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white neon-text-service">
                      {selectedService.title}
                    </h2>
                    <p className="text-cyan-400 text-lg">
                      {selectedService.shortDesc}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              {/* Who Needs It Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Zap className="w-6 h-6 mr-3 text-cyan-400" />
                  Who Needs This Service?
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedService.whoNeedsIt.map((item, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mr-3"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Challenges Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-purple-400" />
                  Business Challenges We Solve
                </h3>
                <div className="space-y-3">
                  {selectedService.businessChallenges.map((challenge, index) => (
                    <div key={index} className="flex items-start text-gray-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-emerald-400" />
                  Key Features & Technologies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedService.features.map((feature, index) => (
                    <div key={index} className="feature-badge px-4 py-2 rounded-lg">
                      <span className="text-white font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-pink-400" />
                  Complete Guide & Benefits
                </h3>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  {selectedService.detailedDescription.split('\n').map((paragraph, index) => {
                    if (paragraph.trim() === '') return null;
                    
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h4 key={index} className="text-xl font-bold text-white mt-6 mb-3">
                          {paragraph.replace(/\*\*/g, '')}
                        </h4>
                      );
                    }
                    
                    if (paragraph.startsWith('•')) {
                      return (
                        <div key={index} className="flex items-start ml-4">
                          <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span>{paragraph.substring(2)}</span>
                        </div>
                      );
                    }
                    
                    return (
                      <p key={index} className="leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700">
                <button
                  onClick={openWhatsApp}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Discuss This Service
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  View Other Services
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ServicesSection;