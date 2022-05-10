import {FC, MutableRefObject, useEffect, useState, useTransition} from 'react'
import {School} from '@/models/Education'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  newSchoolRef: MutableRefObject<any>
  schoolList: School[]
  editIndex: number
}

const AdminEducationSchool: FC<Props> = ({newSchoolRef, schoolList, editIndex}) => {
  const [newSchool, changeSchool] = useState({
    name: '',
    description: '',
    degree: '',
    term: ''
  })

  const {lang} = useTranslation() as {lang: 'en' | 'uk'}

  useEffect(() => {
    if (editIndex !== -1) {
      const neededSchool: School = schoolList[editIndex]
      changeSchool({
        ...neededSchool,
        name: neededSchool.name[lang],
        degree: neededSchool.degree[lang],
        description: neededSchool.description[lang],
      })
    }
  }, [editIndex, schoolList, lang])

  const handleSchoolChange = (field: string, value = '') => {
    changeSchool((prevState) => ({
      ...prevState,
      [field]: value
    }))
  }

  useEffect(() => {
    newSchoolRef.current = {getValues: newSchool}
  }, [newSchoolRef, newSchool])

  return (
    <div className="modal-education-content">
      <div className="modal-education-content__title modal__title">Add New School</div>
      <form>
        <div className="form-control">
          <div className="form-control__heading">
            <label htmlFor="">Name</label>
          </div>
          <input
            type="text"
            className="form-control__input"
            placeholder="Name of school..."
            value={newSchool.name}
            onChange={(e) => handleSchoolChange('name', e.target.value)}
          />
        </div>
        <div className="form-control">
          <div className="form-control__heading">
            <label htmlFor="">Description</label>
          </div>
          <input
            type="text"
            className="form-control__input"
            placeholder="Couple words about..."
            value={newSchool.description}
            onChange={(e) => handleSchoolChange('description', e.target.value)}
          />
        </div>
        <div className="form-control">
          <div className="form-control__heading">
            <label htmlFor="">Degree</label>
          </div>
          <input
            type="text"
            className="form-control__input"
            placeholder="Your graduation degree..."
            value={newSchool.degree}
            onChange={(e) => handleSchoolChange('degree', e.target.value)}
          />
        </div>
        <div className="form-control">
          <div className="form-control__heading">
            <label htmlFor="">Term</label>
          </div>
          <input
            type="text"
            className="form-control__input"
            placeholder="Term of your studying..."
            value={newSchool.term}
            onChange={(e) => handleSchoolChange('term', e.target.value)}
          />
        </div>
      </form>
    </div>
  )
}

export default AdminEducationSchool