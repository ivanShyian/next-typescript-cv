import {FC} from 'react'
import Image from 'next/image'
import {Project} from '@/models/Project'
import './ProjectItem.scss'
import avatar from '@/public/assets/Avatar.png'
import FindIcon from '@/public/icons/find.svg'

interface Props {
  project: Project
}

export const ProjectItem: FC<Props> = ({project}) => {
  return (
    <div className="card project-item">
      <div className="project-item__wrapper project-wrapper">
        <div className="project-wrapper__content project-content">
          <div className="project-content__heading">
            <p className="project-content__title">{project.name}</p>
            <p className="project-content__subtitle">{project.subtitle}</p>
          </div>
          <div className="project-content__button">
            <FindIcon />
          </div>
        </div>
      </div>
      <div className="project-item__background">
        <Image src={avatar} objectFit={'cover'} alt={'project image'}/>
      </div>
    </div>
  )
}
