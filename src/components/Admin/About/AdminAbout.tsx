import Modal from 'react-modal'
import './AdminAbout.scss'
import {FC, FormEvent, MutableRefObject, useEffect, useState} from 'react'
import {AboutInterface, Tech} from '@/models/About'
import useTranslation from 'next-translate/useTranslation'
import SharedButton from '@/components/Shared/SharedButton'
import {AdminAboutTech} from '@/components/Admin/About/AdminAboutTech'
import Api from '@/api/Api'

const api = new Api()

interface Props {
  childFunction: MutableRefObject<any>
  setAbout: (about: AboutInterface) => void
  about: AboutInterface
}

export const AdminAbout: FC<Props> = ({childFunction, about, setAbout}) => {
  const {lang} = useTranslation() as {lang: 'uk' | 'en'}
  const [text, changeText] = useState(about.text[lang])
  const [isModalOpen, changeModalVisibility] = useState(false)
  const [aboutCopy, changeCopy] = useState(about)
  const [newTech, changeNewTech] = useState('')
  const [newTechValue, changeNewTechValue] = useState('')

  const handleCloseModal = () => {
    changeModalVisibility(false)
  }

  useEffect(() => {
    childFunction.current = {changeModalVisibility}
  }, [childFunction])

  const handleRemove = (tech: Tech) => {
    changeCopy((prevState) => {
      const filtered = prevState.techs.filter((t) => t !== tech)
      return {
        ...prevState,
        techs: filtered
      } as AboutInterface
    })
  }

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newTech.length && newTechValue.length) {
      changeCopy((prevState) => {
        return {
          ...prevState,
          techs: [
            ...prevState.techs,
            {name: newTech, value: newTechValue}
          ] as Tech[]
        } as AboutInterface
      })
      changeNewTech('')
      changeNewTechValue('')
    }
  }

  const handleEdit = (tech: Tech, idx: number) => {
    changeCopy((prevState) => {
      let techsCopy = [...prevState.techs]
      techsCopy[idx] = tech
      return {
        ...prevState,
        techs: techsCopy
      } as AboutInterface
    })
  }

  const saveToApi = async() => {
    setAbout(aboutCopy)
    await api.changeAbout(aboutCopy)
    handleCloseModal()
  }

  return (
    <Modal
      isOpen={isModalOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={handleCloseModal}
      contentLabel="Admin about"
    >
      <div className="modal-about__content modal-about">
        <div className="modal-about__textarea">
          <textarea value={text} onChange={(e) => changeText(e.target.value)}/>
        </div>
        <div className="modal-about__techs">
          <ul className="modal-about__techs_list">
            {aboutCopy.techs.map((tech, idx) => (
              <AdminAboutTech tech={tech} key={idx} idx={idx} onTechRemove={handleRemove} onTechSubmit={handleEdit}/>
            ))}
          </ul>
          <form onSubmit={handleSave} className="modal-about__techs_input form-control">
            <input value={newTech} onChange={(e) => changeNewTech(e.target.value)} className="form-control__input" type="text" placeholder="Add tech..."/>
            <input value={newTechValue} onChange={(e) => changeNewTechValue(e.target.value)} className="form-control__input value" type="text" placeholder="Value..."/>
            <button className="modal-about__techs_input-btn" type="submit" />
          </form>
        </div>
      </div>
      <div className="modal-about__button">
        <SharedButton onClick={saveToApi}>Save</SharedButton>
      </div>
    </Modal>
  )
}