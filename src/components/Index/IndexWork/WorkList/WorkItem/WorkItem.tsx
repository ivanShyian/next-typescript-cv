import {FC} from 'react'
import './WorkItem.scss'
import Image from 'next/image'
import Nuxt from '@/public/icons/nuxtjs.svg'
import Vue from '@/public/icons/vuejs.svg'
import {WorkItem as WorkInterface} from '@/models/Work'

interface Props {
  item: WorkInterface
  isAdmin: boolean
}

export const WorkItem: FC<Props> = ({item, isAdmin}: Props) => {

  const teches = item.tech.map((tech: string, idx: number) => item.tech.length - 1 === idx ? tech : `${tech}, `)
  const positionLogo = item.positionLogo === 'nuxt' ? <Nuxt /> : <Vue />

  return (
    <li className="work__item">
      <div className="work__item_img">
        <Image src={item.workLogo} width={250} alt="work logo" objectFit={"contain"} />
      </div>
      <div className="work__item_card card work-card">
        <div className="work-card__content">
          <div className="work-card__heading">
            <div className="work-card__heading_content">
              <p className="work-card__title">{item.name}</p>
              <div className="work-card__position nuxt">
                {positionLogo}
                <span>{item.position}</span>
              </div>
            </div>
            <p className="work-card__subtitle">{item.subtitle}</p>
          </div>
          <div className="work-card__description_wrapper">
            <div className="work-card__description">
              <p className="work-card__description_text">{item.description}</p>
              <p className="work-card__description_tech">{teches}</p>
            </div>
            <div className="work-card__responsibilities">
              <ul className="work-card__responsibilities_list work-responsibilities__list">
                {item.respons.map((res: string, idx: number) => (
                  <li className="work-resp__link" key={idx}>{res}</li>
                ))}
              </ul>
              <ul className="work-card__responsibilities_tech">
                {item.tech.map((res: string, idx: number) => (
                  <li key={idx}>{res}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="work-card__background">{item.duration}</div>
      </div>
      {isAdmin && (
        <div className="work__item_admin work-admin">
          <div className="work-admin__edit admin-circle-button">
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
