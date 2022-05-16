import {FC, FormEvent, MutableRefObject, useEffect, useRef} from 'react'
import {Course, MetaTech, SimplifiedCourse, TechRef, Techs} from '@/models/Education'
import {useState} from 'react'
import useTranslation from 'next-translate/useTranslation'
import AdminEducationLearnItem from '@/components/Admin/Education/AdminEducationLearnItem'

interface Props {
  learnList: Techs[]
  newTechRef: MutableRefObject<TechRef>
  postTech: (tech: Techs) => void
  removeTech: (tech: Techs) => void
  addCourse: (techMeta: MetaTech, course: SimplifiedCourse) => void
  onCourseRemove: (techMeta: MetaTech, course: SimplifiedCourse) => void
}

const AdminEducationLearn: FC<Props> = ({learnList, newTechRef, postTech, removeTech, addCourse, onCourseRemove}) => {
  const [activeIndex, changeActiveIndex] = useState<number>(-1)
  const [addNewTech, changeAddNewTechValue] = useState<boolean>(false)
  const [addNewCourse, changeAddNewCourse] = useState<boolean>(false)
  const techInput = useRef<HTMLInputElement>(null)
  const [newTech, changeNewTech] = useState<string>('')

  const isActive = activeIndex !== -1
  const activeCourses = isActive ? learnList[activeIndex].courses : []

  const handleAddNewTech = () => {
    if (addNewTech) {
      return setTimeout(() => techInput.current && techInput.current.focus(), 100)
    }
    changeAddNewTechValue(true)
    setTimeout(() => techInput.current && techInput.current.focus(), 100)
  }

  useEffect(() => {
    newTechRef.current = {
      techToAdd: [],
      techToExtend: [],
      techToRemove: [],
      courseToRemove: []
    }
  }, [newTechRef])

  const onAddNewTech = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newTech.length && !Object.keys(learnList).some((val: any) => learnList[val].name === newTech)) {
      const tech = {name: newTech, courses: []}
      newTechRef.current?.techToAdd.push(tech)
      postTech(tech)
      changeNewTech('')
      changeAddNewTechValue(false)
    }
  }

  const handleRemove = (e: MouseEvent, itemToRemove: Techs) => {
    e.stopPropagation()
    changeActiveIndex(-1)
    const foundIndex = newTechRef.current?.techToAdd.findIndex((tech: Techs) => tech === itemToRemove)
    if (!newTechRef.current) return
    if (foundIndex !== -1) {
      newTechRef.current.techToAdd = newTechRef.current.techToAdd.filter((tech: Techs) => tech !== itemToRemove)
    } else if (itemToRemove._id) {
      newTechRef.current.techToRemove.push(itemToRemove._id)
    }
    removeTech(itemToRemove)
  }

  const onTechExtend = (techMeta: MetaTech, course: any) => {
    addCourse(techMeta, {...course})
    if (addNewCourse) changeAddNewCourse(false)
  }

  return (
    <div className="modal-learn-content">
      <p className="modal-learn-content__title modal__title">Learning</p>
      <ul className="modal-learn-content__list">
        {learnList.map((l: Techs, idx) => (
          <li
            className={`modal-learn-content__item${idx === activeIndex ? ' active' : ''}`}
            key={idx}
            onClick={() => changeActiveIndex(idx)}
          >
            <p className="modal-learn-content__item_text">{l.name}</p>
            <span
              onClick={(e) => handleRemove((e as any), learnList[idx])}
              className="modal-learn-content__item_remove"
            >x</span>
          </li>
        ))}
        {addNewTech && (
          <li className="modal-learn-content__item">
            <form onSubmit={(e) => onAddNewTech(e)}>
              <input
                ref={techInput}
                type="text"
                className="modal-learn-content__item_input"
                value={newTech}
                onChange={(e) => changeNewTech(e.target.value)}
              />
              <span
                onClick={() => changeAddNewTechValue(false)}
                className="modal-learn-content__item_remove"
              >x</span>
              <button className="modal-learn-content__item_btn" type="submit" />
            </form>
          </li>
        )}
        <li className="modal-learn-content__item modal-learn-content__item_new" onClick={handleAddNewTech}>Add tech +</li>
      </ul>
      <div className="modal-learn-content__courses modal-learn-courses">
        {
          isActive ? (
            <ul className="modal-learn-courses__list">
              {activeCourses &&
                activeCourses.map((course, id) => (
                 <AdminEducationLearnItem
                    course={course}
                    key={id}
                    techMeta={{name: learnList[activeIndex].name, _id: learnList[activeIndex]._id}}
                    onCourseRemove={onCourseRemove}
                    onTechExtend={onTechExtend}
                  />
                ))
              }
              {addNewCourse && (
                <AdminEducationLearnItem
                  techMeta={{name: learnList[activeIndex].name, _id: learnList[activeIndex]._id}}
                  onCourseRemove={onCourseRemove}
                  onTechExtend={onTechExtend}
                />
              )}
              <li className="modal-learn-courses__item learn-item learn-item__add-new">
                <p onClick={() => changeAddNewCourse(true)}>Add new course</p>
              </li>
            </ul>
          ) : (
            <p className="modal-learn-courses__no-item">Choose an item above</p>
          )
        }
      </div>
    </div>
  )
}

export default AdminEducationLearn