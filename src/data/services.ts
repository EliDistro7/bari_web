import { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'web-applications',
    title: 'Custom Web Applications',
    description: 'Tailored web applications built for your specific business needs.',
    features: [
      'Custom business logic',
      'User authentication & authorization',
      'Database design & optimization',
      'API development & integration'
    ],
    icon: 'Code',
    price: {
      starting: 5000,
      currency: 'USD'
    }
  },
  // Add more services...
]