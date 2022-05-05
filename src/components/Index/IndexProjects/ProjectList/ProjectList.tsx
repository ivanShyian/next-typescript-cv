import {FC} from 'react'
import {Project} from '@/models/Project'
import './ProjectList.scss'
import ProjectItem from '@/components/Index/IndexProjects/ProjectList/ProjectItem'
import {useAuthContext} from '../../../../context/auth'


interface Props {
  projects: Project[]
  onProjectClick: (id: number | string) => void
}

export const ProjectList: FC<Props> = ({projects, onProjectClick}) => {
  const {isAdmin} = useAuthContext()
  return (
    <ul className="project-list">
      {projects.map((pr: Project, idx: number) => (
        <ProjectItem
          project={pr}
          key={idx}
          onClick={onProjectClick}
        />
      ))}
      {isAdmin && (
        <div className="project-item project-item__admin card">
          <span>Add new project!</span>
        </div>
      )}
    </ul>
  )
}
