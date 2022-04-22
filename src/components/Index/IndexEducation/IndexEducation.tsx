import {NextPage} from 'next'
import './IndexEducation.scss'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import EducationList from '@/components/Index/IndexEducation/EducationList'

const educationGraduation = [
  {id: 0, title: 'KITZ NAU (Jr. Specialist)', term: '2012-2016', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, pariatur!' },
  {id: 1, title: 'NAU (Bachelor)', term: '2016-2021', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, pariatur!' },
]


const educationWork = [
  {id: 0, title: 'Inrating', term: '2021-2021', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, pariatur!' },
  {id: 1, title: 'Freshdesign', term: '2021-2022', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, pariatur!' },
]

export const IndexEducation: NextPage = () => {
  return (
    <section className='index__education section education'>
      <div className="education__wrapper container">
        <SharedSectionTitle>Education</SharedSectionTitle>
        <div className="education__content">
          <div className="card education__card education__degree typeEducation">
            <EducationList list={educationGraduation} type="educ" />
          </div>
          <div className="card education__card education__work typeLearning">
            <EducationList list={educationWork} type="learn"/>
          </div>
          <div className="card education__card education__work typeLearning">
            <EducationList list={educationWork} type="learn" />
          </div>
        </div>
      </div>
    </section>
  )
}
