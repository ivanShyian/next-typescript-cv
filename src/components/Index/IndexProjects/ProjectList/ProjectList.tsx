import {FC} from 'react'
import {Project} from '@/models/Project'
import './ProjectList.scss'
import ProjectItem from '@/components/Index/IndexProjects/ProjectList/ProjectItem'


interface Props {
  projects: Project[]
  onProjectClick: (id: number | string) => void
}

export const ProjectList: FC<Props> = ({projects, onProjectClick}) => {
  return (
    <ul className="project-list">
      {projects.map((pr: Project, idx: number) => (
        <ProjectItem
          project={pr}
          key={idx}
          onClick={onProjectClick}
        />
      ))}
    </ul>
  )
}
