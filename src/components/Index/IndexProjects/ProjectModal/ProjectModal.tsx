import {FC, useEffect, useState} from 'react'
import './ProjectModal.scss'
import {Project} from '@/models/Project'
import Modal from 'react-modal'
import useTranslation from 'next-translate/useTranslation'
import {ProjectModalCarousel} from '@/components/Index/IndexProjects/ProjectModal/ProjectModalCarousel'
import {ImageInterface} from '@/models/index'

interface Props {
  chosenProject: Project | null
  onModalClose: () => void
}

export const ProjectModal: FC<Props> = ({chosenProject, onModalClose}) => {
  const [isModalOpen, changeModalVisibility] = useState(false)
  const {lang} = useTranslation() as {lang: 'uk' | 'en'}

  useEffect(() => {
    if (chosenProject) changeModalVisibility(true)
  }, [chosenProject])

  const handleCloseModal = () => {
    changeModalVisibility(false)
    onModalClose()
  }

  return (
    <Modal
      isOpen={isModalOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={handleCloseModal}
      contentLabel="Example Modal"
    >
      {chosenProject && (
        <div className="project-modal">
          <div className="project-modal__heading">
            <p className="project-modal__title">{chosenProject.title}</p>
            <p className="project-modal__subtitle">{chosenProject.subtitle[lang]}</p>
          </div>
          <ProjectModalCarousel imageList={chosenProject.images as ImageInterface[]} />
          <div className="project-modal__content">
            <p className="project-modal__description">{chosenProject.description[lang]}</p>
            <div className="project-modal__footer">
              <ul className="project-modal__list">
                {chosenProject.technologies.map((tech, idx, array) => (
                  <li key={idx} className="project-modal__list_item">{tech}{array.length - 1 === idx ? '' : ','}</li>
                ))}
              </ul>
              <a
                href={chosenProject.link}
                rel="noreferrer"
                className="project-modal__link"
                target="_blank"
              >Project link</a>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}