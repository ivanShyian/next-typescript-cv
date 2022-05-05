import {FC} from 'react'
import './EducationList.scss'
import EducationItem from '@/components/Index/IndexEducation/EducationList/EducationItem'
import {Work, Graduation} from '@/models/Experience'
import {useAuthContext} from '../../../../context/auth'

interface Props {
  list: Work[] | Graduation[],
  type: 'educ' | 'learn'
}

export const EducationList: FC<Props> = ({list, type}: Props) => {
  const {isAdmin} = useAuthContext()
  return (
    <div className="education-list">
      <ul className="education-list__list">
        {list.map((item: Work | Graduation, idx: number) => (
          <EducationItem isAdmin={isAdmin} key={idx} item={item} type={type} />
        ))}
        {isAdmin && (
          <div className="education-list__admin">
            <span>Add education item</span>
          </div>
        )}
      </ul>
    </div>
  )
}
