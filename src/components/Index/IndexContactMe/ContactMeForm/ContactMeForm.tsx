import {NextPage} from 'next'
import './ContactMeForm.scss'
import { useForm } from 'react-hook-form'
import SharedButton from '@/components/Shared/SharedButton'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Api from '@/api/Api'
import {Email} from '@/models/index'
import {useEffect, useState} from 'react'
import useTranslation from 'next-translate/useTranslation'

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

  const {t} = useTranslation('index')

  const [isMessageLoading, changeMessageLoading] = useState(false)
  const [isSuccess, changeSuccessStatus] = useState(false)

  const onSubmit = async (data: Email) => {
    changeMessageLoading(true)
    const response = await api.sendEmail(data)
    if (response?.result) changeSuccessStatus(true)

  }

  useEffect(() => {
    if (isSuccess) {
      reset()
      changeMessageLoading(false)
      setTimeout(() => {
        changeSuccessStatus(false)
      }, 5000)
    }
  }, [isSuccess, reset, changeMessageLoading])

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="contact-form__content">
        <div className="form-control">
          <div className="form-control__heading">
            <label htmlFor="contactName">{t('formName')}</label>
            <span>{errors.name?.message}</span>
          </div>
          <input
            {...register("name")}
            className={`form-control__input${errors.name ? '_error' : ''}`}
            id="contactName"
            type="text"
            placeholder={t('formNamePlaceholder')}
          />
        </div>
        <div className="form-control">
          <div className="form-control__heading">
            <label htmlFor="contactEmail">{t('formEmail')}</label>
            <span>{errors.email?.message}</span>
          </div>
          <input
            {...register("email")}
            className={`form-control__input${errors.email ? '_error' : ''}`}
            id="contactEmail"
            type="text"
            placeholder={t('formEmailPlaceholder')}
          />
        </div>
        <div className="form-control">
          <div className="form-control__heading">
            <label htmlFor="contactSubject">{t('formSubject')}</label>
            <span>{errors.subject?.message}</span>
          </div>
          <input
            {...register("subject")}
            className={`form-control__input${errors.subject ? '_error' : ''}`}
            id="contactSubject"
            type="text"
            placeholder={t('formSubjectPlaceholder')}
          />
        </div>
        <div className="form-control">
          <div className="form-control__heading">
            <label htmlFor="contactText">{t('formText')}</label>
            <span>{errors.message?.message}</span>
          </div>
          <textarea
            {...register("message")}
            className={`form-control__input${errors.message ? '_error' : ''} form-control__textarea`}
            id="contactText"
            rows={5}
            placeholder={t('formTextPlaceholder')}
          />
        </div>
        <div className="contact-form__footer">
          <p className={`contact-form__success${isSuccess ? '_appear' : ''}`}>{t('messageSentSuccess')} &#128539;</p>
          <div className="contact-form__button">
            <SharedButton
              loading={isMessageLoading}
              type="submit"
            >{t('buttonSend')}</SharedButton>
          </div>
        </div>
      </div>
    </form>
  )
}
