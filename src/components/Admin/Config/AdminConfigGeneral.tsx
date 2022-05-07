import {FC, MutableRefObject, useEffect, useRef, useState} from 'react'
import NextImage from 'next/image'
import {StatusListItem, FieldsList} from '@/models/Config'

interface Props {
  avatar: string
  statusList: StatusListItem[]
  changeGeneral: (field: FieldsList, newValues: any) => void
  childFunction: MutableRefObject<any>
}

const ModalGeneralTab: FC<Props> = ({avatar, statusList, changeGeneral, childFunction}) => {
  const [statusValue, changeStatusValue] = useState('')
  const [image, changeImage] = useState(`http://localhost:8080/${avatar}`)
  const fileInput = useRef<HTMLInputElement>(null)

  const appendStatus = (e: any) => {
    e.preventDefault()
    if (statusValue.length === 0) return
    //@TODO ADD LANG HERE
    changeGeneral('status', [...statusList, {en: statusValue, uk: statusValue}])
    changeStatusValue('')
  }

  const removeItem = (val: {en: string, uk: string}) => {
    let copyOfStatusList = [...statusList]
    const elementIndex = copyOfStatusList.findIndex((el: {en: string, uk: string}) => el === val)
    copyOfStatusList.splice(elementIndex, 1)
    changeGeneral('status', copyOfStatusList)
  }

  const openFileInput = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  useEffect(() => {
    console.log(avatar)
  }, [avatar])

  const onHandleChangeImage = (files: FileList | null) => {
    childFunction.current = files

    const fileToLoad = files && files[0]
    if (fileToLoad) {
      const fileReader = new FileReader()
      fileReader.onload = function(loadedEvent) {
        const srcData = loadedEvent.target!.result
        changeImage(srcData as any)
        // changeGeneral('avatar', srcData)
      }
      fileReader.readAsDataURL(fileToLoad)
    }
  }

  // const onHandleChangeImage = (files: FileList | null) => {
  //   const img = new Image()
  //   img.setAttribute('crossOrigin', 'anonymous')
  //   img.onload = function() {
  //     return imageToBase64(this as HTMLImageElement)
  //   }
  //   img.src = url
  // }
  //
  // const imageToBase64 = (img: HTMLImageElement) => {
  //   // Create an empty canvas element
  //   const canvas = document.createElement('canvas') as HTMLCanvasElement
  //   canvas.width = img.width
  //   canvas.height = img.height
  //
  //   // Copy the image contents to the canvas
  //   const ctx = canvas.getContext('2d')
  //   ctx!.drawImage(img, 0, 0)
  //
  //   // Get the data-URL formatted image
  //   // Firefox supports PNG and JPEG. You could check img.src to
  //   // guess the original format, but be aware the using "image/jpg"
  //   // will re-encode the image.
  //   const dataURL = canvas.toDataURL('image/png')
  //
  //   return dataURL.replace(/^data:image\/(png|jpg);base64,/, "")
  // }

  return (
    <div className="modal-general">
      <p className="modal__title">General</p>
      <div className="modal-general__image modal-image">
        <form className="modal-image__wrapper" onClick={openFileInput}>
          <NextImage src={image} objectFit="cover" layout="fill" alt="avatar"/>
          <input className="modal-image__input" type="file" ref={fileInput} onChange={(e) => onHandleChangeImage(e.target.files)}/>
        </form>
      </div>
      <div className="modal-general__status modal-status">
        <p className="modal__title">Skill list</p>
        <ul className="modal-status__list">
          {statusList.map((value: {en: string, uk: string}, id) => {
            return (
              <li className="modal-status__item" key={id}>
                {/*@TODO ADD LANG HERE*/}
                <p onClick={() => removeItem(value)}>{id + 1}. {value.en}</p>
              </li>
            )
          })}
        </ul>
        <form className="form-control form-control_inside" onSubmit={appendStatus}>
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