import Image from 'next/image'
import './IndexAbout.scss'
import SharedButton from '@/components/Shared/SharedButton'
import IndexAboutTech from '@/components/Index/IndexAbout/IndexAboutTech'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'

import {useAuthContext} from '@/ctx/auth'
import {connect} from 'react-redux'
import {FC, RefObject, useRef, useState} from 'react'
import AdminAbout from '@/components/Admin/About'
import {ImageInterface, RefModal, StateInterface} from '@/models/index'
import useTranslation from 'next-translate/useTranslation'
import {bindActionCreators, Dispatch} from 'redux'
import {setAbout} from '@/redux/actions'
import {AboutInterface} from '@/models/About'
import {Translate} from 'next-translate'
import {useElementOnScreen} from '@/use/useElementOnScreen'
import imageSource from '@/utils/imageSource'
import Api from '@/api/Api'

const api = new Api()

interface Props {
  about: AboutInterface
  avatar: ImageInterface
  setAbout: (about: AboutInterface) => void
}

const IndexAbout: FC<Props> = ({about, avatar, setAbout}) => {
  const modalRef = useRef<RefModal>(null)
  const {isAdmin} = useAuthContext()
  const {t, lang} = useTranslation('index') as { lang: 'en' | 'uk', t: Translate }
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0
  }) as [RefObject<HTMLDivElement> | null, boolean]

  const handleEditClick = () => {
    if (modalRef.current) {
      return modalRef.current.changeModalVisibility(true)
    }
  }

  const downloadCV = () => {
    return api.downloadCV(about.cvPath)
  }

  return (
    <section id="about" className="index__about section about" ref={containerRef}>
      <div className="about__wrapper container">
        <SharedSectionTitle>{t('aboutTitle')}</SharedSectionTitle>
        <div className="about__skills about-skills">
          <div className="about-skills__image">
            <Image
              src={imageSource(avatar.src)}
              blurDataURL={avatar.base64}
              placeholder="blur"
              objectFit="cover"
              width={200}
              height={200}
              alt="Avatar"
            />
          </div>
          <div className="card about-skills__card">
            <div className="about-skills__card_triangle about-triangle"/>
            <div className="about-skills__card_resume about-resume">
              <div className="about-resume__text" dangerouslySetInnerHTML={{__html: about.text[lang]}}/>
              <div className="about-resume__button-wrapper">
                <div className="about-resume__button">
                  <SharedButton onClick={downloadCV}>{t('downloadCV')}</SharedButton>
                </div>
                {isAdmin && (
                  <div className="about-resume__admin">
                    <SharedButton onClick={handleEditClick}>{t('edit')}</SharedButton>
                  </div>
                )}
              </div>
            </div>
            <div className="about-skills__tech">
              <IndexAboutTech techs={about.techs} aboutVisible={isVisible}/>
              <AboutUploadCv isAdmin={isAdmin}/>
            </div>
            <div className="about-skills__button-wrapper">
              <div className="about-skills__button">
                <SharedButton>{t('downloadCV')}</SharedButton>
              </div>
              {isAdmin && (
                <>
                  <div className="about-skills__admin">
                    <SharedButton onClick={handleEditClick}>{t('edit')}</SharedButton>
                  </div>
                  <AboutUploadCv isAdmin={isAdmin} type="adaptive"/>
                </>
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

const AboutUploadCv: FC<{ isAdmin: boolean, type?: 'desktop' | 'adaptive' }> = ({isAdmin, type = 'desktop'}) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)

  const handleSetFileList = (files: FileList | null) => {
    if (files !== null) setFile(files[0])
  }

  const uploadCV = async() => {
    if (file) {
      await api.postNewCV(file)
    }
  }

  if (!isAdmin) return null
  return (
    <div className={`about-skills__upload_wrapper about-skills__upload_wrapper-${type}`}>
      <div className="about-skills__upload">
        <SharedButton
          onClick={() => fileInput.current?.click()}
        >{file ? 'Cancel' : 'Upload CV'}</SharedButton>
      </div>
      <div className="about-skills__upload_file">
        {file && (
          <>
            <p>{file.name}</p>
            <div className="about-skills__upload_btn">
              <SharedButton onClick={uploadCV}>Upload</SharedButton>
            </div>
          </>
        )}
        <input
          ref={fileInput}
          className="about-skills__upload_input"
          accept="application/pdf"
          id="fileInput"
          type="file"
          onChange={(e) => handleSetFileList(e.target.files)}
        />
      </div>
    </div>
  )
}

type IState = (props: StateInterface) => { about: AboutInterface, avatar: ImageInterface }

const mapStateToProps = (state: StateInterface) => ({
  about: state.about.about,
  avatar: state.config.config.avatar
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAbout: bindActionCreators(setAbout, dispatch)
})

export default connect(mapStateToProps as IState, mapDispatchToProps)(IndexAbout)
