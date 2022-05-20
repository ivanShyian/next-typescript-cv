import {FC} from 'react'
import './IndexAboutTech.scss'
import IndexAboutTechItem from '@/components/Index/IndexAbout/IndexAboutTech/IndexAboutTechItem'
import {Tech} from '@/models/About'

interface Props {
  techs: [Tech]
  aboutVisible: boolean
}

export const IndexAboutTech: FC<Props> = ({techs, aboutVisible}: Props) => {
  return (
    <div className="about-tech">
      <ul className="about-tech__list">
        {techs.map((tech: Tech, idx: number) => {
          return (
            <IndexAboutTechItem
              tech={tech}
              key={idx}
              aboutVisible={aboutVisible}
            />
          )
        })}
      </ul>
    </div>
  )
}
