import {NextPage} from 'next'
import './IndexWork.scss'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import FreshDes from '@/public/icons/work-icons/fd.svg'
import Inrating from '@/public/icons/work-icons/inr.svg'
import Vue from '@/public/icons/vuejs.svg'
import Nuxt from '@/public/icons/nuxtjs.svg'

export const IndexWork: NextPage = () => {
  return (
    <section className="index__work section work">
      <div className="work__wrapper container">
        <SharedSectionTitle>Work</SharedSectionTitle>
        <div className="work__content">
          <ul className="work__list">
            <li className="work__item">
              <div className="work__item_img">
                <Inrating />
              </div>
              <div className="work__item_descr card work-card">
                <div className="work-card__content">
                  <div className="work-card__heading">
                    <div className="work-card__heading_left">
                      <p className="work-card__title">Inrating</p>
                      <p className="work-card__subtitle">Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className="work-card__heading_right">
                      <Vue />
                      <span>VueJS developer</span>
                    </div>
                  </div>
                  <p className="work-card__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, rerum?Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus enim fuga molestiae quidem quo reiciendis vitae? At cumque dolorem ex illo incidunt ipsum modi numquam, perspiciatis praesentium vitae, voluptas.</p>
                  <ul className="work-card__respons work-resp__list">
                    <li className="work-resp__link">Work</li>
                    <li className="work-resp__link">Work</li>
                    <li className="work-resp__link">Work</li>
                    <li className="work-resp__link">Work</li>
                    <li className="work-resp__link">Work</li>
                    <li className="work-resp__link">Work</li>
                    <li className="work-resp__link">Work</li>
                  </ul>
                  <div className="work-card__background">2021-2021</div>
                </div>
              </div>
            </li>
            <li className="work__item">
              <div className="work__item_img">
                <FreshDes />
              </div>
              <div className="work__item_descr card work-card">
                <div className="work-card__content">
                  <div className="work-card__heading">
                    <div className="work-card__heading_left">
                      <p className="work-card__title">FreshDesign</p>
                      <p className="work-card__subtitle">Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className="work-card__heading_right nuxt">
                      <Nuxt />
                      <span>Nuxt developer</span>
                    </div>
                  </div>
                  <p className="work-card__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque distinctio dolorem, id odit quas quod. Illo iusto laborum neque qui!Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus enim fuga molestiae quidem quo reiciendis vitae? At cumque dolorem ex illo incidunt ipsum modi numquam, perspiciatis praesentium vitae, voluptas.</p>
                  <ul className="work-card__respons work-resp__list">
                    <li className="work-resp__link">Work</li>
                    <li className="work-resp__link">Work</li>
                    <li className="work-resp__link">Work</li>
                    <li className="work-resp__link">Work</li>
                    <li className="work-resp__link">Work</li>
                    <li className="work-resp__link">Work</li>
                    <li className="work-resp__link">Work</li>
                  </ul>
                </div>
                <div className="work-card__background">2021-2022</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
