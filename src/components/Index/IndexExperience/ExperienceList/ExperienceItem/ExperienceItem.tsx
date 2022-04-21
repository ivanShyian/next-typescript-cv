import {FC} from 'react'
import './ExperienceItem.scss'
import DegreeIcon from '@/public/icons/graduation.svg'
import {Work, Graduation} from '@/models/Experience'

interface Props {
  item: Work | Graduation
}

export const ExperienceItem: FC<Props> = ({item}: Props) => {
  return (
    <li className="experience-item">
      <div className="experience-item__icon">
        <DegreeIcon />
      </div>
      <div className="experience-item__content">
        <p className="experience-item__term">{item.term}</p>
        <p className="experience-item__title">{item.title}</p>
        <p className="experience-item__text">{item.text}</p>
      </div>
    </li>
  )
}
