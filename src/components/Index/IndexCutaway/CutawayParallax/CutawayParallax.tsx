import {NextPage} from 'next'

import './CutawayParallax.scss'

import JsIcon from '@/public/icons/parallax-icons/js.svg'
import TsIcon from '@/public/icons/parallax-icons/ts.svg'
import NuxtIcon from '@/public/icons/parallax-icons/nuxt.svg'
import NextIcon from '@/public/icons/parallax-icons/next.svg'
import VueIcon from '@/public/icons/parallax-icons/vue.svg'
import ReactIcon from '@/public/icons/parallax-icons/react.svg'
import NodeIcon from '@/public/icons/parallax-icons/node.svg'
import MongoIcon from '@/public/icons/parallax-icons/mongodb.svg'
import FirebaseIcon from '@/public/icons/parallax-icons/firebase.svg'
import {RefObject, useEffect} from 'react'
import {useElementOnScreen} from '@/use/useElementOnScreen'

export const CutawayParallax: NextPage = () => {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0
  }) as [RefObject<HTMLDivElement> | null, boolean]

  useEffect(() => {
    if (isVisible && window.innerWidth > 767) window.addEventListener('mousemove', parallax)
    else if (window.innerWidth > 767) window.removeEventListener('mousemove', parallax)

    function parallax(e: MouseEvent): void {
      document.querySelectorAll<HTMLElement>('.parallax-icon').forEach((el) => {
        const target = e.target as HTMLDivElement
        if ([
          'cutaway-parallax', 'cutaway__wrapper container', 'cutaway__scroll', 'cutaway__social_link', 'cutaway__social_list',
          'aside__wrapper',
          'navigation__nav nav', 'nav__list', 'nav__item',
          'logo', 'shared-button'
          ].includes(target.className)
        ) {
          const speed = el.getAttribute('data-speed')
          const x = window.innerWidth - (e.pageX * +speed!)
          const y = window.innerHeight - (e.pageY * +speed!)
          el.style.transform = `translate(${x / 110}px, ${y / 110}px)`
        }
      })
    }
    return () => window.removeEventListener('mousemove', parallax)
  }, [isVisible])

  return (
    <div className="cutaway-parallax" ref={containerRef}>
      <JsIcon className="parallax-icon cutaway-parallax__js" data-speed="6"/>
      <TsIcon className="parallax-icon cutaway-parallax__ts" data-speed="7"/>
      <NextIcon className="parallax-icon cutaway-parallax__next" data-speed="2"/>
      <NuxtIcon className="parallax-icon cutaway-parallax__nuxt" data-speed="3"/>
      <VueIcon className="parallax-icon cutaway-parallax__vue" data-speed="4"/>
      <ReactIcon className="parallax-icon cutaway-parallax__react" data-speed="3"/>
      <NodeIcon className="parallax-icon cutaway-parallax__node" data-speed="4"/>
      <MongoIcon className="parallax-icon cutaway-parallax__mongo" data-speed="6"/>
      <FirebaseIcon className="parallax-icon cutaway-parallax__firebase" data-speed="7"/>
    </div>
  )
}
