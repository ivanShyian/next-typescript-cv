import {FC} from 'react'
import Image from 'next/image'
import {ProjectListItem} from '@/models/Project'
import './ProjectItem.scss'
import useTranslation from 'next-translate/useTranslation'
import SharedEditDelete from '@/components/Shared/SharedEditDelete'
import imageSource from '@/utils/imageSource'
import FindIcon from '@/public/icons/find.svg'
import WorkIcon from '@/public/icons/navigation-icons/briefcase.svg'

interface Props {
  project: ProjectListItem,
  isAdmin: boolean
  onProjectClick: (projectId: string) => void
  onEditClick: (projectId: string) => void
  onDeleteClick: (projectId: string) => void
}

export const ProjectItem: FC<Props> = ({project, onProjectClick, isAdmin, onDeleteClick, onEditClick}: Props) => {
  const {lang} = useTranslation() as {lang: 'uk' | 'en'}

  return (
    <div className="card project-item">
      <div className="project-item__wrapper project-wrapper">
        <div className="project-wrapper__content project-content">
          <ProjectItemBookmark
            isWork={project.isWork}
            className="project-item__work-item-adaptive"
          />
          <div className="project-content__heading">
            <p className="project-content__title">{project.title}</p>
            <p className="project-content__subtitle">{project.subtitle[lang]}</p>
          </div>
          <div className="project-content__button" onClick={() => onProjectClick(project._id!)}>
            <FindIcon />
          </div>
          {isAdmin && (
            <div className="project-content__admin">
              <SharedEditDelete
                onEditClick={() => onEditClick(project._id!)}
                onDeleteClick={() => onDeleteClick(project._id!)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="project-item__background">
        <ProjectItemBookmark
          isWork={project.isWork}
        />
        <Image
          src={imageSource(project.mainImage.src)}
          blurDataURL={project.mainImage.base64}
          placeholder="blur"
          layout="fill"
          objectFit={'cover'}
          alt={'project image'}
        />
      </div>
    </div>
  )
}

const ProjectItemBookmark: FC<{isWork: boolean | undefined, className?: string}> = ({isWork, className}) => {
  if (!isWork) {
    return null
  }

  return (
    <div className={`project-item__work-item ${className}`}>
      <div className="project-item__work-item-wrapper">
        <WorkIcon />
      </div>
    </div>
  )
}
