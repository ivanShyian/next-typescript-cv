import {NextPage} from 'next'
import './IndexExperience.scss'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import ExperienceList from '@/components/Index/IndexExperience/ExperienceList'

const experienceGraduation = [
  {id: 0, title: 'KITZ NAU (Jr. Specialist)', term: '2012-2016', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, pariatur!' },
  {id: 1, title: 'NAU (Bachelor)', term: '2016-2021', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, pariatur!' },
]


const experienceWork = [
  {id: 0, title: 'Inrating', term: '2021-2021', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, pariatur!' },
  {id: 1, title: 'Freshdesign', term: '2021-2022', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, pariatur!' },
]

export const IndexExperience: NextPage = () => {
  return (
    <section className='index__experience section experience'>
      <div className="experience__wrapper container">
        <SharedSectionTitle>Experience</SharedSectionTitle>
        <div className="experience__content">
          <div className="card experience__card experience__degree">
            <ExperienceList list={experienceGraduation}/>
          </div>
          <div className="card experience__card experience__work">
            <ExperienceList list={experienceWork}/>
          </div>
        </div>
      </div>
    </section>
  )
}
