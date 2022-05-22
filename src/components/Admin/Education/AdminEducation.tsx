import './AdminEducation.scss'
import {FC, MutableRefObject, useCallback, useMemo, useRef} from 'react'
import SharedAdminModal from '@/components/Shared/SharedAdminModal'
import useTranslation from 'next-translate/useTranslation'
import transformCourseHelper from '@/utils/transformCourseHelper'
import clearRefCourseHelper from '@/utils/clearRefCourseHelper'
import Api from '@/api/Api'
import {EnUkStringInterface, RefModal} from '@/models/index'
import {
  Course,
  EducationInterface,
  MetaTech,
  School,
  SimplifiedCourse,
  SimplifiedSchool,
  TechRef,
  Techs
} from '@/models/Education'
import dynamic from 'next/dynamic'
const AdminEducationLearn = dynamic(() => import('@/components/Admin/Education/AdminEducationLearn'))
const AdminEducationSchool = dynamic(() => import('@/components/Admin/Education/AdminEducationSchool'))

const api = new Api()

interface Props {
  childFunction: MutableRefObject<RefModal>
  education: EducationInterface
  setEducation: (education: EducationInterface) => void
  editIndex: number
  beforeClose?: () => void
}

export const AdminEducation: FC<Props> = ({setEducation, childFunction, education, editIndex, beforeClose}) => {
  const {lang} = useTranslation() as {lang: 'uk' | 'en'}
  const newSchoolRef = useRef<{getValues: SimplifiedSchool} | null>(null)
  const newTechRef = useRef<TechRef>(null)

  const removeTech = useCallback((tech: Techs) => {
    setEducation({
      ...education,
      techs: education.techs.filter((el: Techs) => el !== tech)
    })
  }, [education, setEducation])

  const addNewTech = useCallback((tech: Techs) => {
    setEducation({
      ...education,
      techs: [...education.techs, tech]
    })
  }, [education, setEducation])

  const addCourse = useCallback((techMeta: MetaTech, course: any) => {
    const {transformedCourse, injection: {techIdx, courseIdx}} = transformCourseHelper(course, techMeta.name, [...education.techs], lang)
    let techsCopy = [...education.techs]
    techsCopy[techIdx].courses = [...techsCopy[techIdx].courses, transformedCourse]

    setEducation({
      ...education,
      techs: techsCopy
    })
    extendTechRef(techMeta, transformedCourse)
  }, [education, lang, setEducation])


  const removeCourse = useCallback((techMeta: MetaTech, course: SimplifiedCourse) => {
    const techsCopy = [...education.techs]
    const foundTechIndex = techsCopy.findIndex((tech: Techs) => tech._id === techMeta._id)
    techsCopy[foundTechIndex].courses = techsCopy[foundTechIndex].courses.filter((c: Course) => {
      if (c._id) return c._id !== course._id
      return c.name !== course.name
    })
    setEducation({
      ...education,
      techs: techsCopy
    })
    clearRefCourse(techMeta, course)
  }, [education, setEducation])

  const tabList = useMemo(() => ([
    {id: 0, name: 'School', component: <AdminEducationSchool newSchoolRef={newSchoolRef} schoolList={education.school} editIndex={editIndex} />},
    {id: 1, name: 'Courses', component: <AdminEducationLearn newTechRef={newTechRef} postTech={addNewTech} learnList={education.techs} removeTech={removeTech} addCourse={addCourse} onCourseRemove={removeCourse} />}
  ]), [
    newSchoolRef,
    newTechRef,
    education,
    editIndex,
    addNewTech,
    removeTech,
    addCourse,
    removeCourse
  ])

  const tabsToShow = editIndex === -1 ? tabList : [tabList[0]]

  const saveToApi = async(): Promise<void> => {
    if (newSchoolRef.current && childFunction.current?.getActiveTab === 0) {
      const oppositeLang = lang === 'en' ? 'uk' : 'en'
      const values = newSchoolRef.current.getValues
      if (!Object.keys(values).some((v) => values[v as keyof SimplifiedSchool] === '' || values[v as keyof SimplifiedSchool] === undefined)) {
        const id = values._id || null
        const type = id ? 'edit' : 'add'
        let data = id ? {...education.school.find((s: School) => s._id === id)} : values
        for (let val in data) {
          if (['description', 'degree', 'name'].includes(val)) {
            const emptyOppositeLang = {[lang]: data[val as keyof School], [oppositeLang]: ''}
            const filledOppositeLang = {...(data[val as keyof School] as EnUkStringInterface), [lang]: values[val as keyof SimplifiedSchool]}
            data = {...data, [val]: type === 'add' ? emptyOppositeLang : filledOppositeLang}
          }
        }
        const response = await api.addNewSchool({data: data as School, type})
        setEducation(response)
      }
    } else if (newTechRef.current && childFunction.current?.getActiveTab === 1) {
      if (newTechRef.current.techToAdd.length) {
        await api.addTechs(newTechRef.current.techToAdd)
      }
      if (newTechRef.current.techToExtend.length) {
        await api.extendTechs(newTechRef.current.techToExtend)
      }
      if (newTechRef.current.techToRemove.length) {
        await api.removeTech(newTechRef.current.techToRemove.join(';'))
      }
      if (newTechRef.current.courseToRemove.length) {
        const query = newTechRef.current.courseToRemove.map((tech: Techs) => {
          const value = tech.courses.map((c: Course, idx, array) => array.length === idx+1 ? c._id : `${c._id};`).join('')
          return `${tech._id}=${value}`
        }).join('&')
        await api.removeCourse(query)
      }
    }
  }

  function extendTechRef(techMeta: MetaTech, course: Course) {
    const foundAddIndex = newTechRef.current?.techToAdd.findIndex((el: Techs) => el.name === techMeta.name)
    if (foundAddIndex !== -1) {
      return
    }
    const foundIndex = newTechRef.current?.techToExtend.findIndex((el) => el._id === techMeta._id)
    if (foundIndex !== -1) {
      newTechRef.current?.techToExtend[foundIndex as number].courses.push(course)
    } else {
      const data: Techs = {
        name: techMeta.name,
        courses: [course]
      }
      if (techMeta._id) data._id = techMeta._id
      newTechRef.current?.techToExtend.push(data)
    }
  }

  function clearRefCourse(techMeta: MetaTech, course: SimplifiedCourse) {
    let isChanged: boolean = false
    if (newTechRef.current?.techToExtend.length) {
      const {array, isModified} = clearRefCourseHelper(newTechRef.current?.techToExtend, techMeta.name, course, 'extend')
      newTechRef.current.techToExtend = array
      isChanged = isModified
    } else if (newTechRef.current?.techToAdd.length) {
      const {array, isModified} = clearRefCourseHelper(newTechRef.current.techToAdd, techMeta.name, course)
      newTechRef.current.techToAdd = array
      isChanged = isModified
    }
    if (!isChanged) {
      const foundIndex = newTechRef.current?.courseToRemove.findIndex((tech: Techs) => tech.name === techMeta.name)
      if (foundIndex !== -1) {
        let courseToRemoveCopy = [...newTechRef.current!.courseToRemove]
        courseToRemoveCopy[foundIndex as number].courses = [
          ...courseToRemoveCopy[foundIndex as number].courses,
          course
        ] as Course[]
        newTechRef.current!.courseToRemove = courseToRemoveCopy
      } else if (newTechRef.current) {
        newTechRef.current.courseToRemove = [
          ...newTechRef.current.courseToRemove,
          {
            name: techMeta.name,
            _id: techMeta._id,
            courses: [course]
          }
        ] as Techs[]
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
