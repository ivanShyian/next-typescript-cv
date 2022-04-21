import {FC} from 'react'
import './IndexAboutTechItem.scss'
import {Tech} from '@/models/Techs'

interface Props {
  tech: Tech
}

export const IndexAboutTechItem: FC<Props> = ({tech}: Props) => {
  return (
    <li className="about-tech-item tech-item">
      <div className="tech-item__heading">
        <span className="tech-item__heading_name">{tech.key}</span>
        <span className="tech-item__heading_value">{tech.value}%</span>
      </div>
      <div className="tech-item__progress tech-progress">
        <div className="tech-progress__indicator" style={{width: `${tech.value}%`, backgroundColor: tech.color}}/>
      </div>
    </li>
  )
}
