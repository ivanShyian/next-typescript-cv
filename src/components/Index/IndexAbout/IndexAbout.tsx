import {NextPage} from 'next'
import './IndexAbout.scss'

export const IndexAbout: NextPage = () => {
  return (
    <section className='index__about about'>
      <div className="about__heading">
        <p className="about__heading_text">About me</p>
      </div>
      <div className="about__skills about-skills">
        <div className="about-skills__image">
          <img src="#" alt="image"/>
        </div>
        <div className="about-skills__card">
          <div className="about-skills__card_resume about-resume">
            <p className="about-resume__text">Its me</p>
            <button className="about-resume__cv">Download CV</button>
          </div>
          <div className="about-skills__card_tech about-tech">
            <ul className="about-tech__list">
              <li className="about-tech__item">S</li>
              <li className="about-tech__item">U</li>
              <li className="about-tech__item">P</li>
              <li className="about-tech__item">E</li>
              <li className="about-tech__item">R</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
