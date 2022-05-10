import {FC, MutableRefObject} from 'react'
import {Techs} from '@/models/Education'
import {useState} from 'react'
import useTranslation from 'next-translate/useTranslation'
import AdminEducationLearnItem from '@/components/Admin/Education/AdminEducationLearnItem'

interface Props {
  learnList: Techs[]
  newTechRef: MutableRefObject<any>
}

const AdminEducationLearn: FC<Props> = ({learnList}) => {
  const [activeIndex, changeActiveIndex] = useState(-1)
  const {lang} = useTranslation() as { lang: 'uk' | 'en' }

  const isActive = activeIndex !== -1
  const activeCourses = isActive ? learnList[activeIndex].courses : []

  return (
    <div className="modal-learn-content">
      <p className="modal-learn-content__title modal__title">Learning</p>
      <ul className="modal-learn-content__list">
        {learnList.map((l: Techs, idx) => (
          <li className="modal-learn-content__item" key={idx} onClick={() => changeActiveIndex(idx)}>{l.name}</li>
        ))}
        <li className="modal-learn-content__item modal-learn-content__item_new">Add tech +</li>
      </ul>
      <div className="modal-learn-content__courses modal-learn-courses">
        {
          isActive ? (
            <ul className="modal-learn-courses__list">
              {activeCourses?.length &&
                activeCourses.map((course, id) => (
                  <AdminEducationLearnItem course={course} key={id}/>
                ))
              }
              <li className="modal-learn-courses__item learn-item learn-item__add-new">
                <p>Add new course</p>
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