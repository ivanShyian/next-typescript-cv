import {FC} from 'react'
import {ProjectListItem} from '@/models/Project'
import './ProjectList.scss'
import ProjectItem from '@/components/Index/IndexProjects/ProjectList/ProjectItem'
import {useAuthContext} from '@/ctx/auth'


interface Props {
  projects: ProjectListItem[]
  onProjectClick: (projectId: string) => void
  onEditClick: (projectId: string) => void
  onDeleteClick: (projectId: string) => void
}

export const ProjectList: FC<Props> = ({projects, onProjectClick, onDeleteClick, onEditClick}) => {
  const {isAdmin} = useAuthContext()
  return (
    <ul className="project-list">
      {projects.map((projectItem: ProjectListItem, idx: number) => (
        <ProjectItem
          isAdmin={isAdmin}
          project={projectItem}
          onProjectClick={onProjectClick}
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
          key={idx}
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
