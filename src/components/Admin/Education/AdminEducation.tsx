import './AdminEducation.scss'
import {FC, MutableRefObject, useRef, useState} from 'react'
import SharedAdminModal from '@/components/Shared/SharedAdminModal'
import AdminEducationLearn from '@/components/Admin/Education/AdminEducationLearn'
import AdminEducationSchool from '@/components/Admin/Education/AdminEducationSchool'
import {EducationInterface} from '@/models/Education'

interface Props {
  childFunction: MutableRefObject<any>
  education: EducationInterface
  setEducation: (education: EducationInterface) => void
  beforeClose: () => void
  editIndex: number
}

export const AdminEducation: FC<Props> = ({childFunction, education, beforeClose, editIndex}) => {
  const [educationCopy, changeEducation] = useState({...education})
  const newSchoolRef = useRef(null)
  const newTechRef = useRef(null)

  const tabList = [
    {id: 0, name: 'School', component: <AdminEducationSchool newSchoolRef={newSchoolRef} schoolList={educationCopy.school} editIndex={editIndex} />},
    {id: 1, name: 'Courses', component: <AdminEducationLearn newTechRef={newTechRef} learnList={educationCopy.techs} />}
  ]

  const tabsToShow = editIndex === -1 ? tabList : [tabList[0]]

  const saveToApi = (): void => {
    if (newSchoolRef.current) {
      const values = (newSchoolRef.current as any).getValues
    }
    // if (childFunction.current) {
    //   childFunction.current.changeModalVisibility(false)
    // }
  }

  return (
    <SharedAdminModal
      onSave={saveToApi}
      childFunction={childFunction}
      beforeClose={beforeClose}
      tabList={tabsToShow}>
      {tabsToShow}
    </SharedAdminModal>
  )
}
