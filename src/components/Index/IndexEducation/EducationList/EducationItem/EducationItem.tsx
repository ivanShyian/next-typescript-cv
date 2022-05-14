import {Dispatch, FC, SetStateAction} from 'react'
import './EducationItem.scss'
import DegreeIcon from '@/public/icons/education-icons/graduation.svg'
import {School} from '@/models/Education'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  item: School
  isAdmin: boolean
  handleEdit: (item: School) => void
  deleteItem: (school: School) => void
}

export const EducationItem: FC<Props> = ({item, isAdmin, handleEdit, deleteItem}) => {
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
          <span className="education-admin__edit admin-circle-button edit" onClick={() => handleEdit(item)}>e</span>
          <span className="education-admin__remove admin-circle-button remove" onClick={() => deleteItem(item)}>d</span>
        </div>
      )}
    </li>
  )
}
