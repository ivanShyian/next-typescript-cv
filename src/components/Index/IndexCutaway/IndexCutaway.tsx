import './IndexCutaway.scss'
import {ConfigInterface} from '@/models/Config'

import Image from 'next/image'
import {useEffect, useState, useRef, FC} from 'react'
import {useScroll} from '@/use/useScroll'
import useTranslation from 'next-translate/useTranslation'
import {connect} from 'react-redux'

import SharedButton from '@/components/Shared/SharedButton'
import CutawayParallax from '@/components/Index/IndexCutaway/CutawayParallax'
import CutawaySocial from '@/components/Index/IndexCutaway/CutawaySocial'
import {Translate} from 'next-translate'
import {StateInterface} from '@/models/index'


const IndexCutaway: FC<{ config: ConfigInterface }> = ({config: {status, links, name, avatar}}) => {
  const [transformValue, changeTransformValue] = useState(0)
  const [negativeOrder, changeOrderBool] = useState(false)
  const [scrollTo] = useScroll()
  const {t, lang} = useTranslation('index') as {t: Translate, lang: 'uk' | 'en'}
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
        const maxTransformValue = LINE_HEIGHT * (status.length - 1)
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
  }, [transformValue, negativeOrder, status.length])

  const subtitleList = status.map((item, idx) => {
    return (
      <li
        ref={listItem}
        className="cutaway__subtitle_item"
        key={idx}
      >
        {item[lang]}
      </li>
    )
  })

  return (
    <section id="cutaway" className="index__cutaway section cutaway">
      <div className="cutaway__wrapper container">
        <div className="cutaway__image">
          {/*@TODO Optimize src*/}
          <Image
            className="cutaway__image_img"
            src={`http://localhost:8080/${avatar}`}
            width="175"
            height="175"
            quality="100"
            objectFit="cover"
            alt="avatar"
          />
        </div>
        <div className={`cutaway__name ${lang}`}>
          {/*@TODO SET LANG*/}
          <h2>{name[lang]}</h2>
        </div>
        <div className={`cutaway__subtitle ${lang}`}>
          <ul
            style={{transform: `translateY(-${transformValue}px)`}}
            className="cutaway__subtitle_list"
          >
            {subtitleList}
          </ul>
        </div>
        <CutawaySocial links={links}/>
        <div className="cutaway__hire">
          <SharedButton onClick={() => scrollTo('.index__contact', 1200)}>{t('hire')}</SharedButton>
        </div>
        <div className="cutaway__scroll" onClick={() => scrollTo('.index__about', 600)}>
          <div className="field">
            <div className="mouse" />
          </div>
        </div>
      </div>
      <CutawayParallax/>
    </section>
  )
}

const mapStateToProps = (state: StateInterface) => ({
  config: state.config.config as ConfigInterface
})

export default connect(mapStateToProps, {})(IndexCutaway)