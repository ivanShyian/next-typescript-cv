import {FC} from 'react'
import './EducationItem.scss'
import DegreeIcon from '@/public/icons/education-icons/graduation.svg'
import BrainIcon from '@/public/icons/education-icons/brain.svg'
import {Work, Graduation} from '@/models/Experience'

interface Props {
  item: Work | Graduation,
  type: 'educ' | 'learn'
}

export const EducationItem: FC<Props> = ({item, type}: Props) => {
  return (
    <li className="education-item">
      <div className="education-item__icon">
        {type === 'educ' ? <DegreeIcon /> : <BrainIcon /> }
      </div>
      <div className="education-item__content">
        <p className="education-item__term">{item.term}</p>
        <p className="education-item__title">{item.title}</p>
        <p className="education-item__text">{item.text}</p>
      </div>
    </li>
  )
}
