import './IndexEducation.scss'

import dynamic from 'next/dynamic'
import {useEffect, useRef, useState, useCallback, FC} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import useTranslation from 'next-translate/useTranslation'

import Modal from 'react-modal'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import EducationList from '@/components/Index/IndexEducation/EducationList'
const EducationCircles = dynamic(() => import('@/components/Index/IndexEducation/EducationCircles'), {ssr: false})

import {StateInterface} from '@/models/index'
import {Course, EducationInterface, Techs} from '@/models/Experience'
import {setEducation} from '@/redux/actions'
import {useAuthContext} from '@/ctx/auth'
import AdminEducation from '@/components/Admin/Education'

//
// const educationGraduation = [
//   {id: 0, title: 'KITZ NAU (Jr. Specialist)', term: '2012-2016', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, pariatur!' },
//   {id: 1, title: 'NAU (Bachelor)', term: '2016-2021', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, pariatur!' },
// ]

// const skillList = [
//   {id: 0, name: 'Typescript'},
//   {id: 1, name: 'VueJS'},
//   {id: 2, name: 'ReactJS'},
//   {id: 3, name: 'Node'},
//   {id: 4, name: 'NextJS'},
//   {id: 5, name: 'Express'},
//   {id: 6, name: 'Javascript'},
//   {id: 7, name: 'NuxtJS'},
//   {id: 8, name: 'D3JS'}
// ]

interface Props {
  education: EducationInterface
  techList: Techs[]
  setEducation: (education: EducationInterface) => void
}

const IndexEducation: FC<Props> = ({education, techList}) => {
  const [circleSizes, changeCircleSizes] = useState({width: 0, height: 0})
  const [isModalOpen, changeModalState] = useState(false) // user modal
  const [educationCopy, changeEducationCopy] = useState(education)
  const {isAdmin} = useAuthContext()
  const {t, lang} = useTranslation('index')

  const cardRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const adminModalRef = useRef(null) // admin ref modal

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
    // open modal
    return changeModalState(true)
  }, [changeModalState])

  const onOpenAdminModal = () => {
    if (adminModalRef.current) {
      (adminModalRef.current as any).changeModalVisibility(true)
    }
  }

  const handleCloseModal = () => changeModalState(false)

  return (
    <section id="education" className='index__education section education'>
      <div className="education__wrapper container" ref={educationRef}>
        <SharedSectionTitle>{t('educationTitle')}</SharedSectionTitle>
        <div className="education__content">
          <div ref={cardRef} className="card education__card education__degree typeEducation">
            <EducationList list={educationCopy.school} openModal={onOpenAdminModal} />
          </div>
          <div className="education__courses typeLearning">
            <EducationCircles
              key={lang}
              width={circleSizes.width}
              height={circleSizes.height}
              skillList={techList}
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
        modal
      </Modal>
      {isAdmin && (
        <AdminEducation  childFunction={adminModalRef} />
      )}
    </section>
  )
}

const mapStatToProps = (state: StateInterface) => ({
  education: state.education.education,
  techList: state.education.techList
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setEducation: bindActionCreators(setEducation, dispatch)
})

export default connect(mapStatToProps, mapDispatchToProps)(IndexEducation)