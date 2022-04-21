import {FC} from 'react'
import ExperienceItem from '@/components/Index/IndexExperience/ExperienceList/ExperienceItem'
import {Work, Graduation} from '@/models/Experience'

interface Props {
  list: Work[] | Graduation[]
}

export const ExperienceList: FC<Props> = ({list}: Props) => {
  return (
    <div className="experience-list">
      <ul className="experience-list__list">
        {list.map((item: Work | Graduation, idx: number) => (
          <ExperienceItem key={idx} item={item} />
        ))}
      </ul>
    </div>
  )
}
