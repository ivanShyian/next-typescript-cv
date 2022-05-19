import {NextPage} from 'next'
import './ContactMeForm.scss'
import { useForm } from 'react-hook-form'
import SharedButton from '@/components/Shared/SharedButton'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Api from '@/api/Api'
import {Email} from '@/models/index'

const api = new Api()

const schema = yup.object({
  name: yup.string().required().min(2),
  email: yup.string().required().email(),
  subject: yup.string().required().min(2),
  message: yup.string().required().min(4)
}).required();

export const ContactMeForm: NextPage = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm<Email>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: Email) => {
    const response = await api.sendEmail(data)
    if (response?.result) reset()
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="contact-form__content">
        <div className="form-control">
          <div className="form-control__heading">
            <label htmlFor="contactName">Name</label>
            <span>{errors.name?.message}</span>
          </div>
          <input
            {...register("name")}
            className={`form-control__input${errors.name ? '_error' : ''}`}
            id="contactName"
            type="text"
            placeholder="Your name..."
          />
        </div>
        <div className="form-control">
          <div className="form-control__heading">
            <label htmlFor="contactEmail">Email</label>
            <span>{errors.email?.message}</span>
          </div>
          <input
            {...register("email")}
            className={`form-control__input${errors.email ? '_error' : ''}`}
            id="contactEmail"
            type="text"
            placeholder="Email address..."
          />
        </div>
        <div className="form-control">
          <div className="form-control__heading">
            <label htmlFor="contactSubject">Subject</label>
            <span>{errors.subject?.message}</span>
          </div>
          <input
            {...register("subject")}
            className={`form-control__input${errors.subject ? '_error' : ''}`}
            id="contactSubject"
            type="text"
            placeholder="Subject..."
          />
        </div>
        <div className="form-control">
          <div className="form-control__heading">
            <label htmlFor="contactText">Message</label>
            <span>{errors.message?.message}</span>
          </div>
          <textarea
            {...register("message")}
            className={`form-control__input${errors.message ? '_error' : ''} form-control__textarea`}
            id="contactText"
            rows={5}
            placeholder="Your message..."
          />
        </div>
        <div className="contact-form__button">
          <SharedButton type="submit">Send</SharedButton>
        </div>
      </div>
    </form>
  )
}
