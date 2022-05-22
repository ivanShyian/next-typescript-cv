import {FC} from 'react'
import './WorkList.scss'
import WorkItem from '@/components/Index/IndexWork/WorkList/WorkItem'
import {WorkInterface} from '@/models/Work'
import { useAuthContext } from 'src/context/auth'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  workList: WorkInterface[]
  openAddModal: (editId?: number) => void
  removeItem: (index: number) => void
}

export const WorkList: FC<Props> = ({workList, openAddModal, removeItem}) => {
  const {isAdmin} = useAuthContext()
  const {t} = useTranslation('index')
  return (
    <ul className="work__list">
      {workList.map((item: WorkInterface, idx: number) => (
        <WorkItem workItem={item} key={idx} index={idx} isAdmin={isAdmin} openEditModal={openAddModal} removeItem={removeItem} />
      ))}
      {isAdmin && (
        <li className="work__item_admin card" onClick={() => openAddModal()}>
          <span>{t('addWorkItem')}</span>
        </li>
      )}
    </ul>
  )
}
