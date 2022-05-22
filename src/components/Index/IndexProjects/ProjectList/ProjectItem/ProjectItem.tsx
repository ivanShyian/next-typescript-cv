import {FC} from 'react'
import Image from 'next/image'
import {ProjectListItem} from '@/models/Project'
import './ProjectItem.scss'
import FindIcon from '@/public/icons/find.svg'
import useTranslation from 'next-translate/useTranslation'
import SharedEditDelete from '@/components/Shared/SharedEditDelete'

interface Props {
  project: ProjectListItem,
  isAdmin: boolean
  onProjectClick: (projectId: string) => void
  onEditClick: (projectId: string) => void
  onDeleteClick: (projectId: string) => void
}

const HOST = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT

export const ProjectItem: FC<Props> = ({project, onProjectClick, isAdmin, onDeleteClick, onEditClick}: Props) => {
  const {lang} = useTranslation() as {lang: 'uk' | 'en'}
  return (
    <div className="card project-item">
      <div className="project-item__wrapper project-wrapper">
        <div className="project-wrapper__content project-content">
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
        <Image
          src={`${HOST as string}/${project.mainImage as string}`}
          blurDataURL="/assets/image-placeholder.png"
          placeholder="blur"
          layout="fill"
          objectFit={'cover'}
          alt={'project image'}
        />
      </div>
    </div>
  )
}
