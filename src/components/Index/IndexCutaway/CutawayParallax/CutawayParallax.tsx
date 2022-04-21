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
import {useEffect} from 'react'

export const CutawayParallax: NextPage = () => {

  useEffect(() => {
    window.addEventListener('mousemove', parallax)

    function parallax(e: MouseEvent): void {
      document.querySelectorAll<HTMLElement>('.parallax-icon').forEach((el) => {
        const speed = el.getAttribute('data-speed')
        const x = window.innerWidth - (e.pageX * +speed!)
        const y = window.innerHeight - (e.pageY * +speed!)
        el.style.transform = `translate(${x / 110}px, ${y / 110}px)`
      })
    }

    // return window.removeEventListener('mousemove', parallax)
  }, [])

  return (
    <div className="cutaway-parallax">
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
