import {NextPage} from 'next'
import Image from 'next/image'
import './IndexAbout.scss'
import SharedButton from '@/components/Shared/SharedButton'
import IndexAboutTech from '@/components/Index/IndexAbout/IndexAboutTech'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'

import avatar from '@/public/assets/Avatar.png'

const techs = [
  {id: 0, key: 'Javascript, Typescript', value: 85, color: 'darkorange'},
  {id: 0, key: 'Vue, Nuxt', value: 80, color: 'aqua'},
  {id: 0, key: 'React, Next', value: 60, color: 'FD6060FF'},
  {id: 0, key: 'Node, Express', value: 70, color: 'blue'},
  {id: 0, key: 'Mongo, Mongoose, Firebase', value: 75, color: 'red'},
  {id: 0, key: 'Tailwind, Bootstrap', value: 85, color: ''},
]

export const IndexAbout: NextPage = () => {
  return (
    <section className="index__about section about">
      <div className="about__wrapper container">
        <SharedSectionTitle>About Me</SharedSectionTitle>
        <div className="about__skills about-skills">
          <div className="about-skills__image">
            <Image src={avatar} width={200} height={200} alt="Avatar"/>
          </div>
          <div className="card about-skills__card">
            <div className="about-skills__card_triangle about-triangle" />
            <div className="about-skills__card_resume about-resume">
              <p className="about-resume__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, aspernatur at autem consequatur culpa cum debitis dicta dolor dolorem ea esse facilis fugit illo ipsum laboriosam libero magni maiores molestiae necessitatibus pariatur provident quam sit vel. Alias animi consectetur eaque excepturi, iste maxime molestiae nam quo recusandae soluta? Atque cupiditate exercitationem, id laboriosam magni molestiae molestias necessitatibus placeat quia quo recusandae repudiandae sint ullam vel vero! Alias autem beatae culpa dolorem eaque eligendi eos eum illum ipsam iusto labore magni, obcaecati possimus qui, quo, rerum ullam vero voluptatibus. Ad adipisci facere libero nemo numquam reiciendis saepe? Esse fuga numquam unde?</p>
              <div className="about-resume__button">
                <SharedButton>Download CV</SharedButton>
              </div>
            </div>
            <div className="about-skills__tech">
              <IndexAboutTech techs={techs} />
            </div>
            <div className="about-skills__button">
              <SharedButton>Download CV</SharedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
