import {NextPage} from 'next'
import './IndexWork.scss'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import WorkList from '@/components/Index/IndexWork/WorkList'
import FreshDes from '@/public/assets/coloredFresh.png'
import Inrating from '@/public/assets/coloredInr.png'

const list = [
  {
    id: 0,
    name: 'Inrating',
    workLogo: Inrating, //must be src
    subtitle: 'Social Network with own TV Channel',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis ex ipsum non! Ab doloribus dolorum esse fugit, harum placeat quis sapiente similique suscipit veniam veritatis?',
    position: 'VueJS Developer',
    positionLogo: 'vue', //must be src
    respons: ['Building UI\'s', 'Templates', 'UI Logic', 'Clean coding', 'Refactoring'],
    tech: ['Typescript', 'Javascript', 'VueJS', 'NuxtJS'],
    duration: '2021-2021'
  },
  {
    id: 1,
    name: 'Freshdesign',
    workLogo: FreshDes, //must be src
    subtitle: 'Outsource company',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis ex ipsum non! Ab doloribus dolorum esse fugit, harum placeat quis sapiente similique suscipit veniam veritatis?',
    position: 'NuxtJS Developer',
    positionLogo: 'nuxt', //must be src
    respons: ['Building UI\'s', 'Templates', 'UI Logic', 'Clean coding', 'Refactoring'],
    tech: ['Typescript', 'Javascript', 'VueJS', 'NuxtJS'],
    duration: '2021-2022'
  }
]

export const IndexWork: NextPage = () => {
  return (
    <section id="work" className="index__work section work">
      <div className="work__wrapper container">
        <SharedSectionTitle>Work</SharedSectionTitle>
        <div className="work__content">
          <WorkList list={list} />
        </div>
      </div>
    </section>
  )
}
