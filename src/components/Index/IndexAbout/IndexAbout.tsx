import Image from 'next/image'
import './IndexAbout.scss'
import SharedButton from '@/components/Shared/SharedButton'
import IndexAboutTech from '@/components/Index/IndexAbout/IndexAboutTech'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'

import {useAuthContext} from '@/ctx/auth'
import {connect} from 'react-redux'
import {FC, MutableRefObject, useRef} from 'react'
import AdminAbout from '@/components/Admin/About'
import {StateInterface} from '@/models/index'
import useTranslation from 'next-translate/useTranslation'
import {bindActionCreators, Dispatch} from 'redux'
import {setAbout} from '@/redux/actions'
import {AboutInterface} from '@/models/About'

interface Props {
  about: any
  avatar: string
  setAbout: (about: AboutInterface) => void
}

const IndexAbout: FC<Props> = ({about, avatar, setAbout}) => {
  const modalRef = useRef<MutableRefObject<any>>(null)
  const {isAdmin} = useAuthContext()
  const {t, lang} = useTranslation('index')

  const handleEditClick = () => {
    if (modalRef.current) {
      console.log(modalRef.current)
      return (modalRef as any).current.changeModalVisibility(true)
    }
  }

  return (
    <section id="about" className="index__about section about">
      <div className="about__wrapper container">
        <SharedSectionTitle>{t('aboutTitle')}</SharedSectionTitle>
        <div className="about__skills about-skills">
          <div className="about-skills__image">
            <Image src={`http://localhost:8080/${avatar}`} width={200} height={200} alt="Avatar"/>
          </div>
          <div className="card about-skills__card">
            <div className="about-skills__card_triangle about-triangle" />
            <div className="about-skills__card_resume about-resume">
              <p className="about-resume__text">{about.text[lang]}</p>
              <div className="about-resume__button-wrapper">
                <div className="about-resume__button">
                  <SharedButton>{t('downloadCV')}</SharedButton>
                </div>
                {isAdmin && (
                  <div className="about-resume__admin">
                    <SharedButton onClick={handleEditClick}>{t('edit')}</SharedButton>
                  </div>
                )}
              </div>
            </div>
            <div className="about-skills__tech">
              <IndexAboutTech techs={about.techs} />
            </div>
            <div className="about-skills__button-wrapper">
              <div className="about-skills__button">
                <SharedButton>{t('downloadCV')}</SharedButton>
              </div>
              {isAdmin && (
                <div className="about-skills__admin">
                  <SharedButton onClick={handleEditClick}>{t('edit')}</SharedButton>
                </div>
              )}
            </div>
          </div>
        </div>
        {isAdmin && (
          <AdminAbout childFunction={modalRef} about={about} setAbout={setAbout}/>
        )}
      </div>
    </section>
  )
}

const mapStateToProps = (state: StateInterface) => ({
  about: state.about.about,
  avatar: state.config.config.avatar
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAbout: bindActionCreators(setAbout, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexAbout)