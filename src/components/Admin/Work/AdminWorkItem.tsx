import {FC, MutableRefObject, useCallback, useEffect, useRef, useState} from 'react'
import {SimplifiedWork, WorkInterface} from '@/models/Work'
import useTranslation from 'next-translate/useTranslation'
import PhotoIcon from '@/public/icons/photo.svg'
import Image from 'next/image'
import {AdminWorkItemForm} from '@/components/Admin/Work/AdminWorkItemForm'
import readAsDataURL from '@/utils/readAsDataURL'

interface Props {
  workRef: MutableRefObject<any>
  workItem?: WorkInterface
}

export const AdminWorkItem: FC<Props> = ({workItem, workRef}) => {
  const {lang} = useTranslation() as {lang: 'uk' | 'en'}
  const fileInput = useRef<HTMLInputElement>(null)
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
        const {subtitle, description, ...other} = workItem
        return {
          ...prevState,
          ...other,
          subtitle: subtitle[lang],
          description: description[lang]
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
    if (value.length) {
      changeValues((prevState) => ({
        ...prevState,
        [key]: value
      }))
    }
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
      })
    }
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
            <ul className="work-item-lists__list">
              {technologies.map((tech, key) => (
                <li className="work-item-lists__item" key={`${tech}_${key}`}>{tech}</li>
              ))}
              <li className="work-item-lists__item_add">Add new +</li>
            </ul>
          </div>
          <div className="work-item-lists__resp">
            <p className="work-item-lists__title">Responsibilities</p>
            <ul className="work-item-lists__list">
              {responsibilities.map((resp, key) => (
                <li className="work-item-lists__item" key={`${resp}_${key}`}>{resp[lang]}</li>
              ))}
              <li className="work-item-lists__item_add">Add new +</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}