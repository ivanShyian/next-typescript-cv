import {NextPage} from 'next'
import './ContactMeForm.scss'
import SharedButton from '@/components/Shared/SharedButton'

export const ContactMeForm: NextPage = () => {
  return (
    <form className="contact-form">
      <div className="contact-form__content">
        <div className="form-control form-control__name">
          <label htmlFor="contactName">Name</label>
          <input id="contactName" type="text" placeholder="Your name..."/>
        </div>
        <div className="form-control">
          <label htmlFor="contactEmail">Email</label>
          <input id="contactEmail" type="text" placeholder="Email address..."/>
        </div>
        <div className="form-control">
          <label htmlFor="contactSubject">Subject</label>
          <input id="contactSubject" type="text" placeholder="Subject..."/>
        </div>
        <div className="form-control">
          <label htmlFor="contactText">Message</label>
          <textarea id="contactText" rows={5} placeholder="Your message..."/>
        </div>
        <div className="contact-form__button">
          <SharedButton type="submit">Submit</SharedButton>
        </div>
      </div>
    </form>
  )
}
