import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useAnimation, AnimationControls } from 'framer-motion'

interface UseScrollAnimationOptions {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}

export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): [React.RefCallback<HTMLElement>, AnimationControls] {
  const { threshold = 0.1, triggerOnce = true, rootMargin = '0px' } = options
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  })

  useEffect(() => {
    if (inView) {
      controls.start('animate')
    } else if (!triggerOnce) {
      controls.start('initial')
    }
  }, [controls, inView, triggerOnce])

  return [ref, controls]
}