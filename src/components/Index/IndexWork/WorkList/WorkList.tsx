import {FC} from 'react'
import './WorkList.scss'
import WorkItem from '@/components/Index/IndexWork/WorkList/WorkItem'
import {WorkItem as WorkInterface} from '@/models/Work'

interface Props {
  list: WorkInterface[]
}

export const WorkList: FC<Props> = ({list}: Props) => {
  return (
    <ul className="work__list">
      {list.map((item: WorkInterface, idx: number) => (
        <WorkItem item={item} key={idx} />
      ))}
    </ul>
  )
}
