import {useEffect, useRef, useState} from 'react'

interface Option {
  root: HTMLElement | null
  rootMargin: string
  threshold: number
}

export const useElementOnScreen = (options: Option, selector?: string) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const cbFunction = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(cbFunction, options) as IntersectionObserver
    const current = selector ? document.querySelector(selector) : containerRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [containerRef, options, selector])

  return [containerRef, isVisible]
}
