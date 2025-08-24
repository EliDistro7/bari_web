
export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  tags: string[]
  metrics: {
    efficiency: string
    users: string
    satisfaction: string
  }
  demoUrl?: string
  codeUrl?: string
  status: 'completed' | 'in-development' | 'planning'
  impact: string
  featured: boolean
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  icon: string
  price?: {
    starting: number
    currency: string
  }
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  image?: string
}

export interface AssessmentQuestion {
  id: string
  question: string
  options: string[]
  type: 'single' | 'multiple'
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
  projectType: string
  budget: string
}