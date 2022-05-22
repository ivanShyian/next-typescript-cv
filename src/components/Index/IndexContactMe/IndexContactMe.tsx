import {NextPage} from 'next'
import './IndexContactMe.scss'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import ContactMeForm from '@/components/Index/IndexContactMe/ContactMeForm'
import Letter from '@/public/icons/letter.svg'
import useTranslation from 'next-translate/useTranslation'

export const IndexContactMe: NextPage = () => {
  const {t, lang} = useTranslation('index')

  return (
    <section className="index__contact section contact">
      <div className="contact__wrapper container">
        <SharedSectionTitle>{t('contactMeTitle')}</SharedSectionTitle>
        <div className="contact__content">
          <div className="contact__base contact-base">
            <div className={`contact__text ${lang}`}>
              <span>{t('contactSubtitleMain')}</span>
              <span>{t('contactSubtitle')} &#128522;</span>
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
