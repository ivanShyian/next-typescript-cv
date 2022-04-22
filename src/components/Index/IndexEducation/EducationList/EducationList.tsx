import {FC} from 'react'
import EducationItem from '@/components/Index/IndexEducation/EducationList/EducationItem'
import {Work, Graduation} from '@/models/Experience'

interface Props {
  list: Work[] | Graduation[],
  type: 'educ' | 'learn'
}

export const EducationList: FC<Props> = ({list, type}: Props) => {
  return (
    <div className="education-list">
      <ul className="education-list__list">
        {list.map((item: Work | Graduation, idx: number) => (
          <EducationItem key={idx} item={item} type={type} />
        ))}
      </ul>
    </div>
  )
}
