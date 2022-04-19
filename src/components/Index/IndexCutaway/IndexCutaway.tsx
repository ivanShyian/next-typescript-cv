import {NextPage} from 'next'
import Image from 'next/image'
import './IndexCutaway.scss'
import image from '@/public/assets/Avatar.png'
import {useEffect, useState} from 'react'

const subtitleList = [
  'Frontend developer',
  'Node developer',
  'Stop russian aggression',
  'Ukrainian lover'
]

export const IndexCutaway: NextPage = () => {
  const [transformValue, changeTransformValue] = useState(0)
  const [negativeOrder, changeOrderBool] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      changeTransformValue((value) => {
        const LINE_HEIGHT = 19.5 * 2
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
    }, 1337)
    return () => clearInterval(interval)
  }, [transformValue, negativeOrder])

  return (
    <section className="index__cutaway cutaway">
      <div className="cutaway__image">
        <Image
          className="cutaway__image_img"
          src={image}
          width={500 / 3}
          height={500 / 3}
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
          <li className="cutaway__social_link">Inst</li>
          <li className="cutaway__social_link">Fb</li>
          <li className="cutaway__social_link">Li</li>
          <li className="cutaway__social_link">Tg</li>
          <li className="cutaway__social_link">Mail</li>
        </ul>
      </div>
      <div className="cutaway__hire">
        <button className="cutaway__hire_btn">Hire me</button>
      </div>
      <div className="cutaway__scroll">*Scroll*</div>
    </section>
  )
}
