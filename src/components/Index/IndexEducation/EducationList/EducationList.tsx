import {Dispatch, FC, SetStateAction} from 'react'
import './EducationList.scss'
import EducationItem from '@/components/Index/IndexEducation/EducationList/EducationItem'
import {useAuthContext} from '@/ctx/auth'
import {School} from '@/models/Education'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  list: School[]
  changeEditIndex: (value: number) => void
  deleteItem: (school: School) => void
  openModal: () => void
}

export const EducationList: FC<Props> = ({list, openModal, changeEditIndex, deleteItem}) => {
  const {t} = useTranslation('index')
  const {isAdmin} = useAuthContext()

  const handleEdit = (item: School) => {
    const foundIndex = list.findIndex((school: School) => school === item)
    changeEditIndex(foundIndex)
  }

  return (
    <div className="education-list">
      <ul className="education-list__list">
        {list.map((item, idx: number) => (
          <EducationItem
            isAdmin={isAdmin}
            key={idx}
            item={item}
            handleEdit={handleEdit}
            deleteItem={deleteItem}
          />
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
