import {NextPage} from 'next'
import dynamic from 'next/dynamic'

import './IndexEducation.scss'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import EducationList from '@/components/Index/IndexEducation/EducationList'
import {useEffect, useRef, useState} from 'react'
const EducationCircles = dynamic(() => import('@/components/Index/IndexEducation/EducationCircles'), {ssr: false})

const educationGraduation = [
  {id: 0, title: 'KITZ NAU (Jr. Specialist)', term: '2012-2016', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, pariatur!' },
  {id: 1, title: 'NAU (Bachelor)', term: '2016-2021', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, pariatur!' },
]

const skillList = [
  {name: 'Typescript'},
  {name: 'VueJS'},
  {name: 'ReactJS'},
  {name: 'Node'},
  {name: 'NextJS'},
  {name: 'Express'},
  {name: 'Javascript'},
  {name: 'NuxtJS'},
  {name: 'D3JS'}
]

export const IndexEducation: NextPage = () => {
  const [circleSizes, changeCircleSizes] = useState({width: 0, height: 0})

  const cardRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cardCurrent = cardRef.current
    const educationCurrent = educationRef.current
    if (cardCurrent && educationCurrent) {
      const CARD_MARGIN = 30
      changeCircleSizes({
        width: educationCurrent.clientWidth - (cardCurrent.clientWidth + CARD_MARGIN),
        height: cardCurrent.clientHeight
      })
    }
  }, [cardRef, educationRef])

  return (
    <section id="education" className='index__education section education'>
      <div className="education__wrapper container" ref={educationRef}>
        <SharedSectionTitle>Education</SharedSectionTitle>
        <div className="education__content">
          <div ref={cardRef} className="card education__card education__degree typeEducation">
            <EducationList list={educationGraduation} type="educ" />
          </div>
          <div className="education__courses typeLearning">
            <EducationCircles
              width={circleSizes.width}
              height={circleSizes.height}
              skillList={skillList}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
