type Options = (selector: string, duration?: number) => void

export const useScroll = () => {
  const scrollTo: Options = (selector, duration = 600) => {
    const scrolled = document.documentElement.scrollTop
    const offsetHeight = (document.querySelector(selector) as HTMLDivElement).getBoundingClientRect()

    const yPosition = scrolled + offsetHeight.top
    const startY = window.scrollY
    const difference = yPosition - startY
    const startTime = performance.now()

    const step = () => {
      const progress = (performance.now() - startTime) / duration
      const amount = easeOutCubic(progress)
      window.scrollTo({ top: startY + amount * difference })

      if (progress < 0.99) window.requestAnimationFrame(step)
    }
    step()
  }

  const easeOutCubic = (t: number) => {
    return --t * t * t + 1
  }

  return [scrollTo]
}
