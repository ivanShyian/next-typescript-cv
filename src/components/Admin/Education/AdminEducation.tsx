import './AdminEducation.scss'
import {FC, MutableRefObject, useRef} from 'react'
import SharedAdminModal from '@/components/Shared/SharedAdminModal'
import AdminEducationLearn from '@/components/Admin/Education/AdminEducationLearn'
import AdminEducationSchool from '@/components/Admin/Education/AdminEducationSchool'
import {Course, EducationInterface, School, Techs} from '@/models/Education'
import useTranslation from 'next-translate/useTranslation'
import transformCourseHelper from '@/utils/transformCourseHelper'
import clearRefCourseHelper from '@/utils/clearRefCourseHelper'
import Api from '@/api/Api'


const api = new Api()

interface Props {
  childFunction: MutableRefObject<any>
  education: EducationInterface
  setEducation: (education: EducationInterface) => void
  editIndex: number
  beforeClose?: () => void
}

export const AdminEducation: FC<Props> = ({setEducation, childFunction, education, editIndex, beforeClose}) => {
  const {lang} = useTranslation() as {lang: 'uk' | 'en'}
  const newSchoolRef = useRef(null)
  const newTechRef = useRef(null)

  const tabList = [
    {id: 0, name: 'School', component: <AdminEducationSchool newSchoolRef={newSchoolRef} schoolList={education.school} editIndex={editIndex} />},
    {id: 1, name: 'Courses', component: <AdminEducationLearn newTechRef={newTechRef} postTech={addNewTech} learnList={education.techs} removeTech={removeTech} addCourse={addCourse} onCourseRemove={removeCourse} />}
  ]

  const tabsToShow = editIndex === -1 ? tabList : [tabList[0]]

  const saveToApi = async(): Promise<void> => {
    const schoolRefCurrent = newSchoolRef.current as any
    const techRefCurrent = (newTechRef.current as any)
    if (schoolRefCurrent && childFunction.current.getActiveTab === 0) {
      const oppositeLang = lang === 'en' ? 'uk' : 'en'
      const values = schoolRefCurrent.getValues
      if (!Object.keys(values).some(v => values[v] === '' || values[v] === undefined)) {
        const id = values._id || null
        const type = id ? 'edit' : 'add'
        let data = id ? {...education.school.find((s: School) => s._id === id)} : values
        for (let val in data) {
          if (['description', 'degree', 'name'].includes(val)) {
            const valueToSet = type === 'add'
              ? {[lang]: data[val], [oppositeLang]: ''}
              : {...data[val], [lang]: values[val]}

            data = {...data, [val]: valueToSet}
          }
        }
        const response = await api.addNewSchool({data, type})
        setEducation(response)
      }
    } else if (techRefCurrent && childFunction.current.getActiveTab === 1) {
      if (techRefCurrent.techToAdd.length) {
        await api.addTechs(techRefCurrent.techToAdd)
      }
      if (techRefCurrent.techToExtend.length) {
        await api.extendTechs(techRefCurrent.techToExtend)
      }
      if (techRefCurrent.techToRemove.length) {
        await api.removeTech(techRefCurrent.techToRemove.join(';'))
      }
      if (techRefCurrent.courseToRemove.length) {
        const query = techRefCurrent.courseToRemove.map((tech: Techs) => {
          const value = tech.courses.map((c: Course, idx, array) => array.length === idx+1 ? c._id : `${c._id};`).join('')
          return `${tech._id}=${value}`
        }).join('&')
        await api.removeCourse(query)
      }
    }
  }

  function removeTech(tech: Techs) {
    setEducation({
      ...education,
      techs: education.techs.filter((el: Techs) => el !== tech)
    })
  }


  function addNewTech(tech: Techs) {
    // const response = await api.addNewTech(tech)
    setEducation({
      ...education,
      techs: [...education.techs, tech]
    })
  }

  function addCourse(techMeta: {name: string, _id: string | undefined}, course: any) {
    const {transformedCourse, injection: {techIdx, courseIdx}} = transformCourseHelper(course, techMeta.name, [...education.techs], lang)
    let techsCopy = [...education.techs]
    techsCopy[techIdx].courses = [...techsCopy[techIdx].courses, transformedCourse]

    setEducation({
      ...education,
      techs: techsCopy
    })
    extendTechRef(techMeta, transformedCourse)
  }

  function extendTechRef(techMeta: {name: string, _id: string | undefined}, course: Course) {
    const foundAddIndex = (newTechRef.current as any).techToAdd.findIndex((el: Techs) => el.name === techMeta.name)
    if (foundAddIndex !== -1) {
      return
    }
    const foundIndex = (newTechRef.current as any).techToExtend.findIndex((el: Techs) => el.name === techMeta.name)
    if (foundIndex !== -1) {
      (newTechRef.current as any).techToExtend[foundIndex].courses.push(course)
    } else {
      (newTechRef.current as any).techToExtend.push({_id: techMeta._id, courses: [course]})
    }
  }

  function removeCourse(techMeta: {name: string, _id: string | undefined}, course: Course) {
    const techsCopy = [...education.techs]
    const foundTechIndex = techsCopy.findIndex((tech: Techs) => tech.name === techMeta.name)
    techsCopy[foundTechIndex].courses = techsCopy[foundTechIndex].courses.filter((c: Course) => {
      if (c._id) return c._id !== course._id
      return c.name !== course.name
    })
    setEducation({
      ...education,
      techs: techsCopy
    })
    clearRefCourse(techMeta, course)
  }

  function clearRefCourse(techMeta: {name: string, _id: string | undefined}, course: Course) {
    let isChanged: boolean = false
    if ((newTechRef.current as any).techToExtend.length) {
      const {array, isModified} = clearRefCourseHelper((newTechRef.current as any).techToExtend, techMeta.name, course, 'extend');
      (newTechRef.current as any).techToExtend = array
      isChanged = isModified
    } else if ((newTechRef.current as any).techToAdd.length) {
      const {array, isModified} = clearRefCourseHelper((newTechRef.current as any).techToAdd, techMeta.name, course);
      (newTechRef.current as any).techToAdd = array
      isChanged = isModified
    }
    console.log({isChanged})
    if (!isChanged) {
      const foundIndex = (newTechRef.current as any).courseToRemove.findIndex((tech: Techs) => tech.name === techMeta.name)
      if (foundIndex !== -1) {
        let courseToRemoveCopy = [...(newTechRef.current as any).courseToRemove]
        courseToRemoveCopy[foundIndex].courses = [
          ...courseToRemoveCopy[foundIndex].courses,
          course
        ];
        (newTechRef.current as any).courseToRemove = courseToRemoveCopy
      } else {
        (newTechRef.current as any).courseToRemove = [
          ...(newTechRef.current as any).courseToRemove,
          {name: techMeta.name, _id: techMeta._id, courses: [course]}
        ]
      }
    }
  }
  return (
    <SharedAdminModal
      onSave={saveToApi}
      childFunction={childFunction}
      tabList={tabsToShow}
      beforeClose={beforeClose}
    >
      {tabsToShow}
    </SharedAdminModal>
  )
}
