import {FC} from 'react'
import './WorkList.scss'
import WorkItem from '@/components/Index/IndexWork/WorkList/WorkItem'
import {WorkItem as WorkInterface} from '@/models/Work'
import { useAuthContext } from 'src/context/auth'

interface Props {
  list: WorkInterface[]
}

export const WorkList: FC<Props> = ({list}: Props) => {
  const {isAdmin} = useAuthContext()

  return (
    <ul className="work__list">
      {list.map((item: WorkInterface, idx: number) => (
        <WorkItem item={item} key={idx} isAdmin={isAdmin} />
      ))}
      {isAdmin && (
        <li className="work__item_admin card">
          <span>Add work item</span>
        </li>
      )}
    </ul>
  )
}
