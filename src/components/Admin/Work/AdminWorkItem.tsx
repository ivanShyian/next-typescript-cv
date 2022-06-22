import {FC, FormEvent, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Responsibilities, SimplifiedWork, WorkInterface} from '@/models/Work'
import useTranslation from 'next-translate/useTranslation'
import PhotoIcon from '@/public/icons/photo.svg'
import Image from 'next/image'
import {AdminWorkItemForm} from '@/components/Admin/Work/AdminWorkItemForm'
import readAsDataURL from '@/utils/readAsDataURL'
import {AdminWorkListItem} from '@/components/Admin/Work/AdminWorkListItem'
import {EnUkStringInterface} from '@/models/index'

interface Props {
  workRef: MutableRefObject<{getWorkValues: SimplifiedWork} | null>
  imageRef: MutableRefObject<{getImage: () => File | null} | null>
  workItem?: WorkInterface
}

const HOST = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT

export const AdminWorkItem: FC<Props> = ({workItem, workRef, imageRef}) => {
  const {lang} = useTranslation() as {lang: 'uk' | 'en'}
  const fileInput = useRef<HTMLInputElement>(null)
  const [newTech, changeNewTech] = useState<string>('')
  const [newResp, changeNewResp] = useState<string>('')
  const [values, changeValues] = useState<SimplifiedWork>({
    title: '',
    subtitle: '',
    description: '',
    technologies: [],
    responsibilities: [],
    imageUrl: {},
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
          imageUrl: {
            ...imageUrl,
            src: `${HOST}/${imageUrl.src}`
          }
        }
      })
    }
  }, [workItem, lang])

  const getWorkValues = useMemo(() => values, [values])

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
          imageUrl: {
            ...prevState.imageUrl,
            src: data as string
          }
        }))
        imageRef.current = {getImage: () => fileToLoad}
      })
    }
  }

  const onTechAdd = (e: FormEvent) => {
    e.preventDefault()
    if (!(values.technologies as string[]).includes(newTech)) {
      changeValues((prevState) => ({
        ...prevState,
        technologies: [...prevState.technologies, newTech as string]
      }))
      changeNewTech('')
    }
  }
  const onRespAdd = (e: FormEvent) => {
    e.preventDefault()
    const hasSimilarValue = (values.responsibilities as Responsibilities[]).findIndex((el) => el[lang] === newResp)
    if (hasSimilarValue === -1) {
      const oppositeLang = lang === 'uk' ? 'en' : 'uk'
      changeValues((prevState) => ({
        ...prevState,
        responsibilities: [
          ...prevState.responsibilities,
          {[lang]: newResp, [oppositeLang]: ''}
        ] as Responsibilities[]
      }))
      changeNewResp('')
    }
  }

  const onListInputChange = (idx: number, value: string, field: 'technologies' | 'responsibilities') => {
    const listCopy = [...values[field]]
    listCopy[idx] = field === 'responsibilities'
      ?  {...listCopy[idx] as EnUkStringInterface, [lang]: value}
      : value

    changeValues((prevState) => ({
      ...prevState,
      [field]: listCopy
    }))
  }

  return (
    <div className="admin-work-item">
      <AdminWorkItemForm values={formValues} onHandleChange={(key: string, value: string) => handleChangeValue(key, value)} />
      <div className="admin-work-item__content work-item-content">
        <div className="work-item-content__image">
          <div className="work-item-content__image_img" onClick={onImageClick}>
            {imageUrl.src
              ? <Image src={imageUrl.src as string} width={150} height={150} objectFit="cover" alt="work image" />
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
              <ul className="work-item-lists__list">
                {technologies.map((tech, key) => (
                  <AdminWorkListItem
                    className="work-item-lists__item"
                    index={key}
                    value={tech}
                    onInputEnter={(...args) => onListInputChange(...args, 'technologies')}
                    key={key}
                  />
                ))}
                <li className="work-item-lists__item_add">
                  <form onSubmit={onTechAdd} className="work-item-lists__form">
                    <input
                      type="text"
                      value={newTech}
                      placeholder="Add new+"
                      className="work-item-lists__input list-input"
                      onChange={(e) => changeNewTech(e.target.value)}
                    />
                    <button type="submit" />
                  </form>
                </li>
              </ul>
          </div>
          <div className="work-item-lists__resp">
            <p className="work-item-lists__title">Responsibilities</p>
              <ul className="work-item-lists__list">
                {responsibilities.map((resp, key) => (
                  <AdminWorkListItem
                    className="work-item-lists__item"
                    index={key}
                    value={resp[lang]}
                    onInputEnter={(...args) => onListInputChange(...args, 'responsibilities')}
                    key={key}
                  />
                ))}
                <li className="work-item-lists__item_add">
                  <form onSubmit={onRespAdd} className="work-item-lists__form">
                    <input
                      type="text"
                      placeholder="Add new+"
                      value={newResp}
                      className="work-item-lists__input list-input"
                      onChange={(e) => changeNewResp(e.target.value)}
                    />
                    <button type="submit" />
                  </form>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
