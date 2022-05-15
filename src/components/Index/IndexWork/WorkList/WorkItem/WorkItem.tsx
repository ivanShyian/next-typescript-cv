import {FC, ReactElement} from 'react'
import './WorkItem.scss'
import Image from 'next/image'
import VueIcon from '@/public/icons/parallax-icons/vue.svg'
import ReactIcon from '@/public/icons/parallax-icons/react.svg'
import NodeIcon from '@/public/icons/parallax-icons/node.svg'
import JavascriptIcon from '@/public/icons/parallax-icons/js.svg'
import TypescriptIcon from '@/public/icons/parallax-icons/ts.svg'
import NuxtIcon from '@/public/icons/parallax-icons/nuxt.svg'
import NextIcon from '@/public/icons/parallax-icons/next.svg'
import {WorkInterface} from '@/models/Work'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  workItem: WorkInterface
  openEditModal: (editId?: number) => void
  index: number
  isAdmin: boolean
}

const logoByTech: {
  [key: string]: ReactElement
} = {
  Javascript: <JavascriptIcon />,
  Typescript: <TypescriptIcon />,
  React: <ReactIcon />,
  Vue: <VueIcon />,
  Node: <NodeIcon />,
  Next: <NextIcon className="next" />,
  Nuxt:  <NuxtIcon/>
}

export const WorkItem: FC<Props> = ({workItem, isAdmin, openEditModal, index}) => {
  const {lang} = useTranslation() as {lang: 'uk' | 'en'}

  const technologies = workItem.technologies.map((tech: string, idx: number, array: string[]) => array.length - 1 === idx ? tech : `${tech}, `)

  return (
    <li className="work__item">
      <div className="work__item_img">
        <Image src={workItem.imageUrl} layout="fill" alt="work logo" objectFit={"contain"} />
      </div>
      <div className="work__item_card card work-card">
        <div className="work-card__content">
          <div className="work-card__heading">
            <div className="work-card__heading_content">
              <p className="work-card__title">{workItem.title}</p>
              <div className="work-card__position nuxt">
                {logoByTech[workItem.technologies[0]]}
                <span>{workItem.position}</span>
              </div>
            </div>
            <p className="work-card__subtitle">{workItem.subtitle[lang]}</p>
          </div>
          <div className="work-card__description_wrapper">
            <div className="work-card__description">
              <p className="work-card__description_text">{workItem.description[lang]}</p>
              <p className="work-card__description_tech">{technologies}</p>
            </div>
            <div className="work-card__responsibilities">
              <ul className="work-card__responsibilities_list work-responsibilities__list">
                {workItem.responsibilities.map((res: {en: string, uk: string}, idx: number) => (
                  <li className="work-resp__link" key={idx}>{res[lang]}</li>
                ))}
              </ul>
              <ul className="work-card__responsibilities_tech">
                {workItem.technologies.map((res: string, idx: number) => (
                  <li key={idx}>{res}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="work-card__background">{workItem.duration}</div>
      </div>
      {isAdmin && (
        <div className="work__item_admin work-admin">
          <div className="work-admin__edit admin-circle-button" onClick={() => openEditModal(index)}>
            <span>e</span>
          </div>
          <div className="work-admin__remove admin-circle-button remove">
            <span>d</span>
          </div>
        </div>
      )}
    </li>
  )
}
