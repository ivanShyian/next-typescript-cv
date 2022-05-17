import {FC, MutableRefObject, useRef} from 'react'
import './AdminWork.scss'
import SharedAdminModal from '@/components/Shared/SharedAdminModal'
import {AdminWorkItem} from '@/components/Admin/Work/AdminWorkItem'
import {SimplifiedWork, Update, WorkInterface} from '@/models/Work'
import {EnUkStringInterface, RefModal} from '@/models/index'
import useTranslation from 'next-translate/useTranslation'
import transformWorkHelper from '@/utils/transformWorkHelper'
import Api from '@/api/Api'

interface Props {
  setWork: (work: WorkInterface[]) => void
  work: WorkInterface[]
  childFunction: MutableRefObject<RefModal>
  beforeClose: () => void
  workList: WorkInterface[]
  editIndex: number
}

const api = new Api()

export const AdminWork: FC<Props> = ({beforeClose, childFunction, editIndex, workList}) => {
  const workRef = useRef<{getWorkValues: () => SimplifiedWork} | null>(null)
  const imageRef = useRef<{getImage: () => File | null} | null>(null)
  const {lang} = useTranslation() as {lang: 'en' | 'uk'}

  const saveWork = () => {
    if (!workRef.current) return
    let performedData: SimplifiedWork = workRef.current.getWorkValues()
    const image = imageRef.current?.getImage()
    // @TODO Add react-hook-form with yup
    const someFieldIsEmpty = Object.keys(performedData).some(v => !performedData[v as keyof SimplifiedWork]?.length)
    console.log(performedData)
    if (someFieldIsEmpty) return
    const transformedWork = transformWorkHelper(performedData, workList, editIndex, lang, image)
    return saveToApi(transformedWork, editIndex)
  }

  const saveToApi = async(data: WorkInterface, idx: number) => {
    console.log({idx})
    if (idx === -1) {
      const {imageUrl, ...spread} = data
      return api.addNewWork({...spread, image: imageUrl})
    }
    let updatedKeys: Update | {[key: string]: any} = {}
    for (let key in data) {
      const incomingDataKey = data[key as keyof WorkInterface]
      const workListDataKey = workList[idx][key as keyof WorkInterface]
      if (['description', 'subtitle'].includes(key)) {
        for (let code in incomingDataKey as EnUkStringInterface) {
          if (
            typeof incomingDataKey !== 'undefined'
            && typeof workListDataKey !== 'undefined'
            && (incomingDataKey as EnUkStringInterface)[code as keyof EnUkStringInterface] !== (workListDataKey as EnUkStringInterface)[code as keyof EnUkStringInterface]
          ) {
            updatedKeys = {
              ...updatedKeys,
              [key]: incomingDataKey
            }
          }
        }
      } else if (incomingDataKey !== workListDataKey) {
        updatedKeys = {
          ...updatedKeys,
          [key]: incomingDataKey
        }
      }
    }
    if (Object.keys(updatedKeys).length) {
      if (updatedKeys.imageUrl) delete Object.assign(updatedKeys, {image: updatedKeys.imageUrl}).imageUrl
      return api.updateWork({...updatedKeys, _id: data._id} as Update)
    }
  }

  return (
    <SharedAdminModal
      onSave={saveWork}
      childFunction={childFunction}
      beforeClose={beforeClose}
    >
      <div className="admin-work">
        <div className="modal__title admin-work__title">Add Work</div>
        <AdminWorkItem
          workRef={workRef}
          imageRef={imageRef}
          workItem={editIndex !== -1 ? workList[editIndex] : undefined}
        />
      </div>
    </SharedAdminModal>
  )
}