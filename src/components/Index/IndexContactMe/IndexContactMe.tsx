import {NextPage} from 'next'
import './IndexContactMe.scss'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import ContactMeForm from '@/components/Index/IndexContactMe/ContactMeForm'
import Letter from '@/public/icons/letter.svg'

export const IndexContactMe: NextPage = () => {
  return (
    <section className="index__contact section contact">
      <div className="contact__wrapper container">
        <SharedSectionTitle>Contact me</SharedSectionTitle>
        <div className="contact__content">
          <div className="contact__base contact-base">
            <div className="contact__text">
              <span>Lets talk about everything</span>
              <span>Just write me an email &#128522;</span>
            </div>
            <div className="contact__image">
              <Letter />
            </div>
          </div>
          <div className="card contact__form">
            <ContactMeForm />
          </div>
        </div>
      </div>
    </section>
  )
}
