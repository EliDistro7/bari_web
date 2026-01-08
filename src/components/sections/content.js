 // Enhanced translation object
 import { Zap, ArrowRight, Play, CheckCircle, Sparkles, Code2, Rocket, Globe, Smartphone, Monitor, Server, Star } from 'lucide-react';
 
  export const content = {
    en: {
      role: "Full-Stack Developer",
      tagline: "I DEVELOP",
      subtitle: "Digital Experiences",
      transform: "that transform businesses",
      impact: "drive measurable impact",
      concept: "From concept to deployment, engineered for excellence.",
      cta: "Start Your Project",
      portfolio: "View Portfolio",
      projects: "Projects",
      years: "Years", 
      clients: "Happy Clients",
      services: [
        {
          title: "Web Applications",
          subtitle: "Modern, scalable web solutions",
          icon: <Globe className="w-6 h-6" />,
          theme: "cyan",
          description: "React • Next.js • TypeScript",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center&auto=format",
          alt: "Modern web application interface"
        },
        {
          title: "Mobile Applications", 
          subtitle: "Cross-platform mobile experiences",
          icon: <Smartphone className="w-6 h-6" />,
          theme: "purple",
          description: "React Native • Flutter • Swift",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center&auto=format",
          alt: "Mobile app development workspace"
        },
        {
          title: "Static Websites",
          subtitle: "Lightning-fast, SEO-optimized sites", 
          icon: <Monitor className="w-6 h-6" />,
          theme: "emerald",
          description: "JAMstack • Gatsby • Hugo",
          image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop&crop=center&auto=format",
          alt: "Beautiful website design mockup"
        },
        {
          title: "Backend Systems",
          subtitle: "Robust server-side architecture",
          icon: <Server className="w-6 h-6" />,
          theme: "orange",
          description: "Node.js • Python • PostgreSQL",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=center&auto=format",
          alt: "Server infrastructure and data center"
        }
      ]
    },
    sw: {
      role: "Software Developer",
      tagline: "NATENGENEZA",
      subtitle: "Uzoefu wa Kidijitali",
      transform: "kwa ajili ya biashara",
      impact: "kuleta athari halisi",
      concept: "Kutoka wazo hadi utekelezaji",
      cta: "Anza Project yako",
      portfolio: "Ona Kazi Zangu",
      projects: "Miradi",
      years: "Miaka",
      clients: "Wateja Wenye Furaha",
      services: [
        {
          title: "Web Apps",
          subtitle: "Software za kisasa",
          icon: <Globe className="w-6 h-6" />,
          theme: "cyan",
          description: "React • Next.js • TypeScript",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center&auto=format",
          alt: "Kiolesura cha programu ya kisasa ya mtandao"
        },
        {
          title: "Mobile Apps", 
          subtitle: "Mobile apps za kisasa",
          icon: <Smartphone className="w-6 h-6" />,
          theme: "purple",
          description: "React Native • Flutter • Swift",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center&auto=format",
          alt: "Mazingira ya kutengeneza programu za simu"
        },
        {
          title: "Websites",
          subtitle: "Tovuti za haraka, ziliounganishwa na Search Engines", 
          icon: <Monitor className="w-6 h-6" />,
          theme: "emerald",
          description: "NextJs • ReactJs • WordPress",
          image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop&crop=center&auto=format",
          alt: "Muundo wa kuvutia tovuti"
        },
        {
          title: "Backend Systems",
          subtitle: "Mifumo imara upande wa servers",
          icon: <Server className="w-6 h-6" />,
          theme: "orange",
          description: "Node.js • Python • PostgreSQL",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=center&auto=format",
          alt: "Miundombinu ya server na kanzidata"
        }
      ]
    }
  };