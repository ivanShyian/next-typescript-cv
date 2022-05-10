import {FC, useEffect, useState} from 'react'
import {Course} from '@/models/Education'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  course: Course
}

const AdminEducationLearnItem: FC<Props> = ({course}) => {
  const [courseCopy, changeCourseCopy] = useState({
    name: '',
    description: '',
    learnPeriod: '',
    teacher: '',
    totalTime: 0
  })

  const {lang} = useTranslation() as {lang: 'uk' | 'en'}

  useEffect(() => {
    if (course) {
      const {description, ...other} = course
      changeCourseCopy((prevState) => ({
        ...prevState,
        ...other,
        description: description[lang]
      }))
    }
  }, [lang, course])

  const handleChange = (field: string, value = '') => {
    changeCourseCopy((prevState) => ({
      ...prevState,
      [field]: value
    }))
  }

  return (
    <li className="modal-learn-courses__item learn-item">
      <div className="learn-item__form">
        <label htmlFor="" className="learn-item__label">Name:</label>
        <input
          type="text"
          className="learn-item__input"
          value={courseCopy.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>
      <div className="learn-item__form">
        <label htmlFor="" className="learn-item__label">Descr:</label>
        <textarea
          className="learn-item__input"
          value={courseCopy.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>
      <div className="learn-item__form">
        <label htmlFor="" className="learn-item__label">Period:</label>
        <input
          type="text"
          className="learn-item__input"
          value={courseCopy.learnPeriod}
          onChange={(e) => handleChange('learnPeriod', e.target.value)}
        />
      </div>
      <div className="learn-item__form">
        <label htmlFor="" className="learn-item__label">Teacher:</label>
        <input
          type="text"
          className="learn-item__input"
          value={courseCopy.teacher}
          onChange={(e) => handleChange('teacher', e.target.value)}
        />
      </div>
      <div className="learn-item__form">
        <label htmlFor="" className="learn-item__label">Time:</label>
        <input
          type="text"
          className="learn-item__input"
          value={courseCopy.totalTime}
          onChange={(e) => handleChange('totalTime', e.target.value)}
        />
      </div>
    </li>
  )
}

export default AdminEducationLearnItem