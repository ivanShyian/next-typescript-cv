import {FC} from 'react'
import {Project} from '@/models/Project'
import './ProjectItem.scss'

interface Props {
  project: Project
}

export const ProjectItem: FC<Props> = ({project}) => {
  return (
    <div className="card project-item">
      <p>{project.name}</p>
    </div>
  )
}
