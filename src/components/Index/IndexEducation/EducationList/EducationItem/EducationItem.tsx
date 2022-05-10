import {FC} from 'react'
import './EducationItem.scss'
import DegreeIcon from '@/public/icons/education-icons/graduation.svg'
import {School} from '@/models/Experience'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  item: School
  isAdmin: boolean
}

export const EducationItem: FC<Props> = ({item, isAdmin}) => {
  const {lang} = useTranslation() as {lang: 'uk' | 'en'}

  return (
    <li className="education-item">
      <div className="education-item__icon">
        <DegreeIcon />
      </div>
      <div className="education-item__content">
        <p className="education-item__term">{item.term}</p>
        <p className={`education-item__title ${lang}`}>
          <span>{item.name[lang]}</span>
          <span>({item.degree[lang]})</span>
        </p>
        <p className="education-item__text">{item.description[lang]}</p>
      </div>
      {isAdmin && (
        <div className="education-item__admin education-admin">
          <span className="education-admin__edit admin-circle-button edit">e</span>
          <span className="education-admin__remove admin-circle-button remove">d</span>
        </div>
      )}
    </li>
  )
}
