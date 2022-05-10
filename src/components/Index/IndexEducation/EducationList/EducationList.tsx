import {FC} from 'react'
import './EducationList.scss'
import EducationItem from '@/components/Index/IndexEducation/EducationList/EducationItem'
import {useAuthContext} from '@/ctx/auth'
import {School} from '@/models/Experience'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  list: [School]
  openModal: () => void
}

export const EducationList: FC<Props> = ({list, openModal}) => {
  const {t} = useTranslation('index')
  const {isAdmin} = useAuthContext()
  return (
    <div className="education-list">
      <ul className="education-list__list">
        {list.map((item, idx: number) => (
          <EducationItem isAdmin={isAdmin} key={idx} item={item}/>
        ))}
        {isAdmin && (
          <div className="education-list__admin" onClick={openModal}>
            <span>{t('addEducItem')}</span>
          </div>
        )}
      </ul>
    </div>
  )
}
