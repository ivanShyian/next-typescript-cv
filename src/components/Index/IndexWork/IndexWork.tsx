import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import WorkList from '@/components/Index/IndexWork/WorkList'
import useTranslation from 'next-translate/useTranslation'
import {RefModal, StateInterface} from '@/models/index'
import {bindActionCreators, Dispatch} from 'redux'
import {setWork} from '@/redux/actions'
import {connect} from 'react-redux'
import {FC, useRef, useState} from 'react'
import {WorkInterface} from '@/models/Work'
import AdminWork from '@/components/Admin/Work'
import Api from '@/api/Api'

const api = new Api()

interface Props {
  work: WorkInterface[],
  setWork: (work: WorkInterface[]) => void
}

const IndexWork: FC<Props> = ({work, setWork}) => {
  const [shouldMount, changeMountState] = useState(false)
  const [editIndex, changeEditIndex] = useState<number>(-1)
  const adminModal = useRef<RefModal>(null)
  const {t} = useTranslation('index')

  const onOpenModal = async(editId?: number) => {
    if (typeof editId === "number") {
      await changeEditIndex(editId)
    }
    await changeMountState(true);
    adminModal.current?.changeModalVisibility(true)
  }

  const onModalClose = () => {
    changeEditIndex(-1)
    changeMountState(false)
  }

  const removeItem = (idx: number) => {
    const id = work[idx]._id
    setWork(work.filter((w) => w._id !== id))
    if (id) return api.removeWork(id)
  }

  return (
    <section id="work" className="index__work section work">
      <div className="work__wrapper container">
        <SharedSectionTitle>{t('workTitle')}</SharedSectionTitle>
        <div className="work__content">
          <WorkList workList={work} openAddModal={onOpenModal} removeItem={removeItem} />
        </div>
        {shouldMount && (
          <AdminWork
            setWork={setWork}
            work={work}
            beforeClose={onModalClose}
            childFunction={adminModal}
            editIndex={editIndex}
            workList={work}
          />
        )}
      </div>
    </section>
  )
}

const mapStateToProps = (state: StateInterface) => ({
  work: state.work.work
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setWork: bindActionCreators(setWork, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexWork)
