import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'club-management',
    title: 'Club Management System',
    description: 'Complete member management solution with payment processing, event scheduling, and communication tools.',
    image: '/images/projects/club-management.jpg',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    metrics: {
      efficiency: '80%',
      users: '500+',
      satisfaction: '95%'
    },
    demoUrl: '#',
    codeUrl: '#',
    status: 'completed',
    impact: 'Reduced admin workload by 80% and improved member engagement',
    featured: true
  },
  // Add more projects...
]