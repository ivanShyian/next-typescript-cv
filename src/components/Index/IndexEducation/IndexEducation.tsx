import './IndexEducation.scss'

import dynamic from 'next/dynamic'
import {useEffect, useRef, useState, useCallback, FC} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import useTranslation from 'next-translate/useTranslation'

import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import EducationList from '@/components/Index/IndexEducation/EducationList'
const EducationCircles = dynamic(() => import('@/components/Index/IndexEducation/EducationCircles'), {ssr: false})

import {RefModal, StateInterface} from '@/models/index'
import {EducationInterface, School, Techs} from '@/models/Education'
import {setEducation} from '@/redux/actions'
import AdminEducation from '@/components/Admin/Education'

import Api from '@/api/Api'
import EducationModal from '@/components/Index/IndexEducation/EducationModal'
const api = new Api()

interface Props {
  education: EducationInterface
  techList: Techs[]
  setEducation: (education: EducationInterface) => void
}

const IndexEducation: FC<Props> = ({education, techList, setEducation}) => {
  const [circleSizes, changeCircleSizes] = useState<{width: number, height: number}>({width: 0, height: 0})
  const [userModalId, changeUserModalId] = useState<string | null>(null) // user modal
  const [editIndex, changeEditIndex] = useState<number>(-1) // for admin
  const [shouldMount, changeMountValue] = useState<boolean>(false)

  const {t, lang} = useTranslation('index')

  const cardRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const adminModalRef = useRef<RefModal>(null) // admin ref modal

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

  const onCourseClick = useCallback((id: string) => {
    changeUserModalId(id)
  }, [])

  const onUserModalClose = () => {
    changeUserModalId(null)
  }

  const onOpenAdminModal = async() => {
    await changeMountValue(true);
    adminModalRef.current?.changeModalVisibility(true)
  }

  const handleChangeEditIndex = (value: number) => {
    changeEditIndex(value)
    return onOpenAdminModal()
  }

  const beforeAdminModalClose = () => {
    changeEditIndex(-1)
    changeMountValue(false)
  }

  const onAdminModalClose = () => {
    beforeAdminModalClose()
    adminModalRef.current?.changeModalVisibility(false)
  }

  const deleteItem = async(item: School) => {
    setEducation({
      ...education,
      school: education.school.filter((el: School) => el !== item)
    })
    if (item._id) return api.removeSchool(item._id)
  }

  const getTechItemForModal = useCallback(() => {
    if (userModalId) {
      return education.techs.find(tech => tech._id === userModalId)!
    }
    return null
  }, [userModalId, education.techs])

  return (
    <section id="education" className='index__education section education'>
      <div className="education__wrapper container" ref={educationRef}>
        <SharedSectionTitle>{t('educationTitle')}</SharedSectionTitle>
        <div className="education__content">
          <div ref={cardRef} className="card education__card education__degree typeEducation">
            <EducationList
              list={education.school}
              openModal={onOpenAdminModal}
              changeEditIndex={handleChangeEditIndex}
              deleteItem={deleteItem}
            />
          </div>
          <div className="education__courses typeLearning">
            <EducationCircles
              key={`educationCircles_${techList.length || 0}_${lang}`}
              width={circleSizes.width}
              height={circleSizes.height}
              skillList={techList}
              onCourseClick={onCourseClick}
            />
          </div>
        </div>
      </div>
      <EducationModal
        onModalClose={onUserModalClose}
        techItem={getTechItemForModal()}
      />
      {shouldMount && (
        <AdminEducation
          onModalClose={onAdminModalClose}
          childFunction={adminModalRef}
          education={education}
          setEducation={setEducation}
          editIndex={editIndex}
          beforeClose={beforeAdminModalClose}
        />
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
