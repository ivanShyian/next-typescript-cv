import {FC, FormEvent, useRef, useState} from 'react'
import {Tech} from '@/models/About'
import SharedEditDelete from '@/components/Shared/SharedEditDelete'

interface Props {
  onTechRemove: (tech: Tech) => void
  onTechSubmit: (tech: Tech, idx: number) => void
  tech: Tech
  idx: number
}

export const AdminAboutTech: FC<Props> = ({tech, idx, onTechRemove, onTechSubmit}) => {
  const {name, value} = tech
  const [nameCopy, changeName] = useState(name)
  const [valueCopy, changeValue] = useState(value)
  const [readOnly, changeReadOnly] = useState(true)
  const nameInput = useRef<HTMLInputElement>(null)

  const handleEdit = () => {
    changeReadOnly(false)
    if (nameInput.current) {
      nameInput.current.focus()
    }
  }

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (readOnly) return
    onTechSubmit({name: nameCopy, value: valueCopy} as Tech, idx)
    changeReadOnly(true)
  }

  const handleRemove = () => onTechRemove(tech)

  return (
    <li className="modal-about__techs_item about-tech-item">
      <span className="about-tech-item__num">{idx + 1}.</span>
      <form className="about-tech-item__form" onSubmit={(e) => handleChange(e)}>
        <input
          className="about-tech-item__input about-tech-item__input_name"
          type="text"
          ref={nameInput}
          value={nameCopy}
          readOnly={readOnly}
          onChange={(e) => changeName(e.target.value)}
        />
        <input
          className="about-tech-item__input about-tech-item__input_val"
          type="text"
          value={valueCopy}
          readOnly={readOnly}
          onChange={(e) => changeValue(+e.target.value)}
        />
        <button type="submit" className="about-tech-item__form_btn"/>
      </form>
      <div className="about-tech-item__edit">
        <SharedEditDelete
          onEditClick={handleEdit}
          onDeleteClick={handleRemove}
        />
      </div>
    </li>
  )
}