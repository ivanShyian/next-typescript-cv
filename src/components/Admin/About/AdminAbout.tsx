import './AdminAbout.scss'
import {FC, FormEvent, MutableRefObject, useEffect, useState} from 'react'
import {AboutInterface, Tech} from '@/models/About'
import useTranslation from 'next-translate/useTranslation'
import {AdminAboutTech} from '@/components/Admin/About/AdminAboutTech'
import Api from '@/api/Api'
import SharedAdminModal from '@/components/Shared/SharedAdminModal'
import {RefModal} from '@/models/index'

const api = new Api()

interface Props {
  childFunction: MutableRefObject<RefModal>
  setAbout: (about: AboutInterface) => void
  about: AboutInterface
}

export const AdminAbout: FC<Props> = ({childFunction, about, setAbout}) => {
  const {lang} = useTranslation() as {lang: 'uk' | 'en'}
  const [text, changeText] = useState(about.text[lang])
  const [aboutCopy, changeCopy] = useState({...about})
  const [newTech, changeNewTech] = useState('')
  const [newTechValue, changeNewTechValue] = useState('')

  useEffect(() => {
    changeText(about.text[lang])
  }, [about, lang])

  const handleCloseModal = () => {
    if (childFunction.current) {
      childFunction.current.changeModalVisibility(false)
    }
  }

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
    let data = {...aboutCopy}
    if (aboutCopy.text[lang] !== text) data.text[lang] = text
    const response = await api.changeAbout(data)
    if (response?.result) setAbout(response.result)
    handleCloseModal()
  }

  return (
    <SharedAdminModal
      onSave={saveToApi}
      childFunction={childFunction}
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
    </SharedAdminModal>
  )
}
