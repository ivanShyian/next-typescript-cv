import {NextPage} from 'next'
import dynamic from 'next/dynamic'

import './IndexEducation.scss'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import EducationList from '@/components/Index/IndexEducation/EducationList'
import {useEffect, useRef, useState, useCallback} from 'react'
import Modal from 'react-modal'
const EducationCircles = dynamic(() => import('@/components/Index/IndexEducation/EducationCircles'), {ssr: false})

const educationGraduation = [
  {id: 0, title: 'KITZ NAU (Jr. Specialist)', term: '2012-2016', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, pariatur!' },
  {id: 1, title: 'NAU (Bachelor)', term: '2016-2021', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, pariatur!' },
]

const skillList = [
  {id: 0, name: 'Typescript'},
  {id: 1, name: 'VueJS'},
  {id: 2, name: 'ReactJS'},
  {id: 3, name: 'Node'},
  {id: 4, name: 'NextJS'},
  {id: 5, name: 'Express'},
  {id: 6, name: 'Javascript'},
  {id: 7, name: 'NuxtJS'},
  {id: 8, name: 'D3JS'}
]

export const IndexEducation: NextPage = () => {
  const [circleSizes, changeCircleSizes] = useState({width: 0, height: 0})
  const [isModalOpen, changeModalState] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cardCurrent = cardRef.current
    const educationCurrent = educationRef.current
    if (cardCurrent && educationCurrent) {
      const isDesktop = document.documentElement.clientWidth > 1170
      const CARD_MARGIN = 0
      const width = isDesktop ? educationCurrent.clientWidth - (cardCurrent.clientWidth + CARD_MARGIN) : educationCurrent.clientWidth
      const height = cardCurrent.clientHeight * 1.5
      changeCircleSizes({
        width,
        height
      })
    }
  }, [cardRef, educationRef])

  const onCourseClick = useCallback((id: string | number) => {
    console.log(id)
    // Start loader
    // When loading complete - open modal
    return changeModalState(true)
  }, [changeModalState])


  const handleCloseModal = () => changeModalState(false)

  return (
    <section id="education" className='index__education section education'>
      <div className="education__wrapper container" ref={educationRef}>
        <SharedSectionTitle>Education</SharedSectionTitle>
        <div className="education__content">
          <div ref={cardRef} className="card education__card education__degree typeEducation">
            <EducationList list={educationGraduation} type="educ" />
          </div>
          <div className="education__courses typeLearning">
            <EducationCircles
              width={circleSizes.width}
              height={circleSizes.width}
              skillList={skillList}
              onCourseClick={onCourseClick}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={handleCloseModal}
        contentLabel="Example Modal"
      >
        <h2>Hello</h2>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </section>
  )
}
