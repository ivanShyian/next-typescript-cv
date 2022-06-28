import {FC, useEffect, useState} from 'react'
import './EducationModal.scss'
import Modal from 'react-modal'
import {Techs} from '@/models/Education'
import useTranslation from 'next-translate/useTranslation'
import {Translate} from 'next-translate'

interface Props {
  onModalClose: () => void
  techItem: Techs | null
}

export const EducationModal: FC<Props> = ({techItem, onModalClose}) => {
  const [isModalOpen, changeModalVisibility] = useState(false)
  const {lang, t} = useTranslation() as { lang: 'uk' | 'en', t: Translate }

  useEffect(() => {
    if (techItem) changeModalVisibility(true)
  }, [techItem])

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
      {techItem &&
      (
        <div className="education-modal">
          <div
            className="education-modal__close"
            onClick={handleCloseModal}
          >
            &#10006;
          </div>
          <p className="education-modal__title">{techItem.name}</p>
          <ul className="education-modal__courses">
            {techItem.courses.map((course, idx) => (
              <li key={idx} className="education-modal__course">
                <p className="education-modal__course_title">{course.name}</p>
                <div className="education-modal__course_wrapper">
                  <p className="education-modal__course_background text-heroic">{idx + 1}</p>
                  <div className="education-modal__course_content">
                    <p><b>Description: </b>{course.description[lang]}</p>
                    <p><b>Teacher: </b>{course.teacher}</p>
                    <p><b>Period: </b>{course.learnPeriod}</p>
                    <p><b>Time: </b>{course.totalTime}h</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
      }
    </Modal>
  )
}
