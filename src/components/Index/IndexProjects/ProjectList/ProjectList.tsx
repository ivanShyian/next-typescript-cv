import {FC} from 'react'
import {ProjectListItem} from '@/models/Project'
import './ProjectList.scss'
import ProjectItem from '@/components/Index/IndexProjects/ProjectList/ProjectItem'
import {useAuthContext} from '@/ctx/auth'
import useTranslation from 'next-translate/useTranslation'


interface Props {
  projects: ProjectListItem[]
  onProjectClick: (projectId: string) => void
  onEditClick: (projectId: string) => void
  onDeleteClick: (projectId: string) => void
  onAdd: () => void
}

export const ProjectList: FC<Props> = ({projects, onProjectClick, onDeleteClick, onEditClick, onAdd}) => {
  const {isAdmin} = useAuthContext()
  const {t} = useTranslation('index')

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
        <div className="project-item project-item__admin card" onClick={onAdd}>
          <span>{t('addProjectItem')}</span>
        </div>
      )}
    </ul>
  )
}
