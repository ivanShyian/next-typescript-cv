import {FC, FormEvent, MutableRefObject, useCallback, useEffect, useRef, useState} from 'react'
import {Responsibilities, SimplifiedWork, WorkInterface} from '@/models/Work'
import useTranslation from 'next-translate/useTranslation'
import PhotoIcon from '@/public/icons/photo.svg'
import Image from 'next/image'
import {AdminWorkItemForm} from '@/components/Admin/Work/AdminWorkItemForm'
import readAsDataURL from '@/utils/readAsDataURL'

interface Props {
  workRef: MutableRefObject<{getWorkValues: () => SimplifiedWork} | null>
  imageRef: MutableRefObject<{getImage: () => File | null} | null>
  workItem?: WorkInterface
}

export const AdminWorkItem: FC<Props> = ({workItem, workRef, imageRef}) => {
  const {lang} = useTranslation() as {lang: 'uk' | 'en'}
  const fileInput = useRef<HTMLInputElement>(null)
  const [newTech, changeNewTech] = useState<null | string>(null)
  const [newResp, changeNewResp] = useState<null | string>(null)
  const [editing, changeEditValue] = useState({tech: -1, resp: -1})
  const [values, changeValues] = useState<SimplifiedWork>({
    title: '',
    subtitle: '',
    description: '',
    technologies: [],
    responsibilities: [],
    imageUrl: '',
    position: '',
    duration: ''
  })

  useEffect(() => {
    if (workItem) {
      changeValues((prevState) => {
        const {subtitle, description,imageUrl, __v, ...other}: WorkInterface & {__v?: number} = workItem
        return {
          ...prevState,
          ...other,
          subtitle: subtitle[lang],
          description: description[lang],
          imageUrl: `http://localhost:8080/${imageUrl}`
        }
      })
    }
  }, [workItem, lang])

  const getWorkValues = useCallback(() => values, [values])

  useEffect(() => {
    workRef.current = {getWorkValues}
  }, [workRef, getWorkValues])

  const {technologies, responsibilities, imageUrl, ...formValues} = values

  const handleChangeValue = (key: string, value: string) => {
    changeValues((prevState) => ({
      ...prevState,
      [key]: value
    }))
  }

  const onImageClick = () => {
    if (fileInput && fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleChangeImage = (files: FileList | null) => {
    const fileToLoad = files && files[0]
    if (fileToLoad) {
      readAsDataURL(fileToLoad, (data) => {
        changeValues((prevState) => ({
          ...prevState,
          imageUrl: data as string
        }))
        imageRef.current = {getImage: () => fileToLoad}
      })
    }
  }

  const onTechChange = (e: FormEvent) => {
    e.preventDefault()
    // Has same value in array
    if (typeof newTech === 'string' && !(values.technologies as string[]).includes(newTech)) {
      if (editing.tech !== -1) {
        const techCopy = [...values.technologies]
        techCopy[editing.tech] = newTech
        console.log(techCopy)
        changeValues((prevState) => ({
          ...prevState,
          technologies: techCopy
        }))
      } else {
        changeValues((prevState) => ({
          ...prevState,
          technologies: [...prevState.technologies, newTech as string]
        }))
      }
    }
    changeEditValue({tech: -1, resp: -1})
    changeNewTech(null)
  }
  const onRespChange = (e: FormEvent) => {
    e.preventDefault()
    const hasSimilarValue = (values.responsibilities as Responsibilities[]).findIndex((el) => el[lang] === newResp)
    if (typeof newResp === 'string' && hasSimilarValue === -1) {
      const oppositeLang = lang === 'uk' ? 'en' : 'uk'
      if (editing.resp !== -1) {
        const respCopy = [...values.responsibilities]
        respCopy[editing.resp] = {
          ...respCopy[editing.resp],
          [lang]: newResp
        }
        changeValues((prevState) => ({
          ...prevState,
          responsibilities: respCopy
        }))
      } else {
        changeValues((prevState) => ({
          ...prevState,
          responsibilities: [
            ...prevState.responsibilities,
            {[lang]: newResp, [oppositeLang]: ''}
          ] as Responsibilities[]
        }))
      }
    }
    changeEditValue({tech: -1, resp: -1})
    changeNewResp(null)
  }

  const onItemEdit = (type: 'tech' | 'resp', value: string, idx: number) => {
    type === 'tech' ? changeNewResp(null) : changeNewTech(null)
    const editValue = {
      [type]: idx,
      [type === 'tech' ? 'resp' : 'tech']: -1
    } as {tech: number, resp: number}
    changeEditValue(editValue)
    type === 'tech' ? changeNewTech(value) : changeNewResp(value)
  }

  return (
    <div className="admin-work-item">
      <AdminWorkItemForm values={formValues} onHandleChange={(key: string, value: string) => handleChangeValue(key, value)} />
      <div className="admin-work-item__content work-item-content">
        <div className="work-item-content__image">
          <div className="work-item-content__image_img" onClick={onImageClick}>
            {imageUrl
              ? <Image src={imageUrl} width={150} height={150} objectFit="cover" alt="work image" />
              : <div className="work-item-content__image_placeholder"><PhotoIcon/></div>
             }
            <input
              className="work-item-content__input"
              type="file"
              ref={fileInput}
              onChange={(e) => handleChangeImage(e.target.files)}
            />
          </div>
        </div>
        <div className="work-item-content__lists work-item-lists">
          <div className="work-item-lists__tech">
            <p className="work-item-lists__title">Technologies</p>
            <form onSubmit={onTechChange} className="work-item-lists__form">
              <ul className="work-item-lists__list">
                {technologies.map((tech, key) => (
                  <li
                    className={`work-item-lists__item${editing.tech === key ? '_hidden' : ''}`}
                    key={`${tech}_${key}`}
                    onClick={() => onItemEdit('tech', tech, key)}
                  >{tech}</li>
                ))}
                {newTech !== null && (
                  <li className="work-item-lists__item_form">
                    <input
                      type="text"
                      value={newTech}
                      className="work-item-lists__input"
                      onChange={(e) => changeNewTech(e.target.value)}
                    />
                    <button type="submit" />
                  </li>
                )}
                <li className="work-item-lists__item_add" onClick={() => changeNewTech('')}>Add new +</li>
              </ul>
            </form>
          </div>
          <div className="work-item-lists__resp">
            <p className="work-item-lists__title">Responsibilities</p>
            <form onSubmit={onRespChange} className="work-item-lists__form">
              <ul className="work-item-lists__list">
                {/*TODO Refactor li to li > input*/}
                {responsibilities.map((resp, key) => (
                  <li
                    className={`work-item-lists__item${editing.resp === key ? '_hidden' : ''}`}
                    key={`${resp}_${key}`}
                    onClick={() => onItemEdit('resp', resp[lang], key)}
                  >{resp[lang]}</li>
                ))}
                {newResp !== null && (
                  <li className="work-item-lists__item_form">
                    <input
                      type="text"
                      value={newResp}
                      className="work-item-lists__input"
                      onChange={(e) => changeNewResp(e.target.value)}
                    />
                    <button type="submit" />
                  </li>
                )}
                <li className="work-item-lists__item_add" onClick={() => changeNewResp('')}>Add new +</li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}