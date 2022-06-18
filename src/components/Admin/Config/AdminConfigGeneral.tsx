import {FC, FormEvent, MutableRefObject, useRef, useState} from 'react'
import NextImage from 'next/image'
import {FieldsList} from '@/models/Config'
import {useRouter} from 'next/router'
import readAsDataURL from '@/utils/readAsDataURL'
import SharedEditDelete from '@/components/Shared/SharedEditDelete'
import {EnUkStringInterface, ImageInterface} from '@/models/index'

interface Props {
  avatar: ImageInterface
  statusList: EnUkStringInterface[]
  nameValue: {en: string, uk: string}
  changeGeneral: (field: FieldsList, newValues: any) => void
  childFunction: MutableRefObject<FileList | null>
}

const HOST = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT

const ModalGeneralTab: FC<Props> = ({avatar, statusList, changeGeneral, nameValue, childFunction}) => {
  const [statusValue, changeStatusValue] = useState('')
  const [editIndex, changeIndex] = useState(-1)
  const [image, changeImage] = useState(`${HOST}/${avatar.src}`)
  const router = useRouter()
  const fileInput = useRef<HTMLInputElement>(null)
  const locale = router.locale as 'en' | 'uk'
  const [nameVal, changeNameVal] = useState(nameValue[locale])

  const onHandleSubmitStatus = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const oppositeLang = locale === 'en' ? 'uk' : 'en' as 'en' | 'uk'
    let data: EnUkStringInterface[]
    if (editIndex !== -1) {
      let statusListCopy = [...statusList]
      statusListCopy[editIndex][locale] = statusValue
      data = statusListCopy
      changeIndex(-1)
    } else {
      const newStatus = {[locale]: statusValue, [oppositeLang]: ''}
      if (statusValue.length === 0) return
      data = [...statusList, newStatus] as EnUkStringInterface[]
    }
    changeGeneral('status', data)
    changeStatusValue('')
  }

  const changeName = (value: string) => {
    if (value.length === 0) return
    changeGeneral('name', {
      ...nameValue,
      [locale]: value
    })
    changeNameVal(value)
  }

  const onHandleEdit = (val: EnUkStringInterface) => {
    let copyOfStatusList = [...statusList]
    const elementIndex = copyOfStatusList.findIndex((el: EnUkStringInterface) => el === val)
    changeIndex(elementIndex)
    changeStatusValue(copyOfStatusList[elementIndex][locale])
  }

  const removeItem = (val: EnUkStringInterface) => {
    let copyOfStatusList = [...statusList]
    const elementIndex = copyOfStatusList.findIndex((el: EnUkStringInterface) => el === val)
    copyOfStatusList.splice(elementIndex, 1)
    changeGeneral('status', copyOfStatusList)
  }

  const openFileInput = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const onHandleChangeImage = (files: FileList | null) => {
    childFunction.current = files
    const fileToLoad = files && files[0]
    if (fileToLoad) {
      readAsDataURL(fileToLoad, (srcData) => {
        changeImage(srcData as any)
      })
    }
  }

  return (
    <div className="modal-general">
      <p className="modal-general__title modal__title">General</p>
      <div className="modal-general__upper">
        <div className="modal-general__image modal-image">
          <form className="modal-image__wrapper" onClick={openFileInput}>
            <NextImage src={image} objectFit="cover" layout="fill" alt="avatar"/>
            <input
              className="modal-image__input"
              type="file"
              ref={fileInput}
              onChange={(e) => onHandleChangeImage(e.target.files)}
            />
          </form>
        </div>
        <div className="modal-general__name modal-name">
          <input
            className="modal-name__input"
            type="text"
            value={nameVal}
            onChange={(e) => changeName(e.target.value)}
          />
        </div>
      </div>
      <div className="modal-general__status modal-status">
        <p className="modal__title">Skill list</p>
        <ul className="modal-status__list">
          {statusList.map((value: {en: string, uk: string}, id) => {
            return (
              <li className="modal-status__item" key={id}>
                <p>{id + 1}. {value[locale]}</p>
                <div className="modal-status__item_edit">
                  <SharedEditDelete
                    onEditClick={() => onHandleEdit(value)}
                    onDeleteClick={() => removeItem(value)}
                  />
                </div>
              </li>
            )
          })}
        </ul>
        <form className="form-control modal-status__input" onSubmit={onHandleSubmitStatus}>
          <input
            placeholder="Type new status here..."
            className="form-control__input"
            type="text"
            value={statusValue}
            onChange={(e) => changeStatusValue(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}

export default ModalGeneralTab
