import {FC} from 'react'
import './IndexAboutTech.scss'
import IndexAboutTechItem from '@/components/Index/IndexAbout/IndexAboutTech/IndexAboutTechItem'
import {Techs, Tech} from '@/models/Techs'

interface Props extends Techs {}

export const IndexAboutTech: FC<Props> = ({techs}: Props) => {
  return (
    <div className="about-tech">
      <ul className="about-tech__list">
        {techs.map((tech: Tech, idx: number) => {
          return <IndexAboutTechItem tech={tech} key={idx} />
        })}
      </ul>
    </div>
  )
}
