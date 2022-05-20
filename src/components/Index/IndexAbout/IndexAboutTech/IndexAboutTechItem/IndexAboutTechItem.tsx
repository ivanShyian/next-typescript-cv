import {FC, useEffect, useState} from 'react'
import './IndexAboutTechItem.scss'
import {Tech} from '@/models/About'

interface Props {
  tech: Tech
  aboutVisible: boolean
}

export const IndexAboutTechItem: FC<Props> = ({tech, aboutVisible}) => {
  const [techNumber, changeTechNumber] = useState<number>(0)
  const [techValue, changeTechValue] = useState<number>(0)
  const [notChanged, changeNotChanged] = useState(true)


  useEffect(() => {
    if (notChanged && aboutVisible) {
      changeNotChanged(false)
      changeTechValue(tech.value)
      animateValue(0, tech.value, 1500);
    }
  }, [notChanged, aboutVisible, tech])

  // Thank you <3 https://codepen.io/chriscoyier/pen/xxVBqEg
  const animateValue = (start: number, end: number, duration: number) => {
    let startTimestamp: null | number = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      changeTechNumber(Math.floor(progress * (end - start) + start))
      if (progress < 1) window.requestAnimationFrame(step)
    }
    window.requestAnimationFrame(step)
  }

  return (
    <li className="about-tech-item tech-item">
      <div className="tech-item__heading">
        <span className="tech-item__heading_name">{tech.name}</span>
        <span className="tech-item__heading_value">{techNumber}%</span>
      </div>
      <div className="tech-item__progress tech-progress">
        <div className="tech-progress__indicator" style={{width: `${techValue}%`}}/>
      </div>
    </li>
  )
}
