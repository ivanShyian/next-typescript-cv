import {NextPage} from 'next'
import Image from 'next/image'
import './IndexCutaway.scss'

import {useEffect, useState, useRef} from 'react'
import {useScroll} from '@/use/useScroll'

import image from '@/public/assets/Avatar.png'
import FacebookIcon from '@/public/icons/social-icons/facebook.svg'
import TelegramIcon from '@/public/icons/social-icons/telegram.svg'
import InstagramIcon from '@/public/icons/social-icons/instagram.svg'
import LinkedinIcon from '@/public/icons/social-icons/linkedin.svg'
import GithubIcon from '@/public/icons/social-icons/github.svg'
import DoubleDown from '@/public/icons/double-down.svg'

import SharedButton from '@/components/Shared/SharedButton'
import CutawayParallax from '@/components/Index/IndexCutaway/CutawayParallax'

const subtitleList = [
  'Frontend developer',
  'Node developer',
  'Stop russian aggression',
  'Ukrainian lover'
]

export const IndexCutaway: NextPage = () => {
  const [transformValue, changeTransformValue] = useState(0)
  const [negativeOrder, changeOrderBool] = useState(false)
  const [scrollTo] = useScroll()
  const listItem = useRef(null)

  useEffect(() => {
    let LINE_HEIGHT: number
    if (listItem && listItem.current) {
      const fontSize = window.getComputedStyle(listItem.current, null).getPropertyValue('font-size')
      LINE_HEIGHT = parseInt(fontSize) * 2
    } else {
      LINE_HEIGHT = 19.5 * 2
    }

    const interval = setInterval(() => {
      changeTransformValue((value) => {
        const maxTransformValue = LINE_HEIGHT * (subtitleList.length -1)
        if (value === maxTransformValue) {
          changeOrderBool(true)
          return value - LINE_HEIGHT
        }
        if (value === 0 && negativeOrder) {
          changeOrderBool(false)
          return value + LINE_HEIGHT
        }
        if (value >= 0 && negativeOrder) {
          return value - LINE_HEIGHT
        }
        return value + LINE_HEIGHT
      })
    }, 2674)
    return () => clearInterval(interval)
  }, [transformValue, negativeOrder])

  return (
    <section id="cutaway" className="index__cutaway section cutaway">
      <div className="cutaway__wrapper container">
        <div className="cutaway__image">
          <Image
            className="cutaway__image_img"
            src={image}
            width="175"
            height="175"
            alt="avatar"
          />
        </div>
        <div className="cutaway__name">
          <h2>Ivan Shyian</h2>
        </div>
        <div className="cutaway__subtitle">
          <ul
            style={{transform: `translateY(-${transformValue}px)`}}
            className="cutaway__subtitle_list"
          >
            {subtitleList.map((text: string, idx: number) => (
              <li
                ref={listItem}
                className="cutaway__subtitle_item"
                key={idx}
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div className="cutaway__social">
          <ul className="cutaway__social_list">
            <li className="cutaway__social_link">
              <a href="https://www.facebook.com" rel="noreferrer" target="_blank">
                <FacebookIcon />
              </a>
            </li>
            <li className="cutaway__social_link">
              <a href="https://t.me/vanjke" rel="noreferrer" target="_blank">
                <TelegramIcon />
              </a>
            </li>
            <li className="cutaway__social_link">
              <a href="https://www.linkedin.com/in/ivan-shyian" rel="noreferrer" target="_blank">
                <LinkedinIcon />
              </a>
            </li>
            <li className="cutaway__social_link">
              <a href="https://www.instagram.com/vanjkes" rel="noreferrer" target="_blank">
                <InstagramIcon />
              </a>
            </li>
            <li className="cutaway__social_link">
              <a href="https://github.com/ivanShyian" rel="noreferrer" target="_blank">
                <GithubIcon />
              </a>
            </li>
          </ul>
        </div>
        <div className="cutaway__hire">
          <SharedButton onClick={() => scrollTo('.index__contact', 1200)}>Hire me</SharedButton>
        </div>
        <div className="cutaway__scroll" onClick={() => scrollTo('.index__about', 600)}>
          <DoubleDown />
        </div>
      </div>
      <CutawayParallax />
    </section>
  )
}
