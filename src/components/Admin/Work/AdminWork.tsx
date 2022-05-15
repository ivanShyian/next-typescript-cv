import {FC, MutableRefObject, useRef} from 'react'
import './AdminWork.scss'
import SharedAdminModal from '@/components/Shared/SharedAdminModal'
import {AdminWorkItem} from '@/components/Admin/Work/AdminWorkItem'
import {SimplifiedWork, WorkInterface} from '@/models/Work'
import {RefModal} from '@/models/index'

interface Props {
  setWork: (work: WorkInterface[]) => void
  work: WorkInterface[]
  childFunction: MutableRefObject<RefModal>
  beforeClose: () => void
  workList: WorkInterface[]
  editIndex: number
}

export const AdminWork: FC<Props> = ({beforeClose, childFunction, editIndex, workList}) => {
  const workRef = useRef<{getWorkValues: () => SimplifiedWork}>(null)

  const saveWork = () => {
    if (workRef.current) {
      const values = workRef.current.getWorkValues()
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
        <AdminWorkItem workRef={workRef} workItem={editIndex !== -1 ? workList[editIndex] : undefined} />
      </div>
    </SharedAdminModal>
  )
}