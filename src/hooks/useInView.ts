import { useInView as useInViewOriginal } from 'react-intersection-observer'

export function useInView(options?: Parameters<typeof useInViewOriginal>[0]) {
  return useInViewOriginal({
    triggerOnce: true,
    threshold: 0.1,
    ...options,
  })
}