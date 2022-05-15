import './IndexWork.scss'
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

interface Props {
  work: WorkInterface[],
  setWork: (work: WorkInterface[]) => void
}

const IndexWork: FC<Props> = ({work}) => {
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

  return (
    <section id="work" className="index__work section work">
      <div className="work__wrapper container">
        <SharedSectionTitle>{t('workTitle')}</SharedSectionTitle>
        <div className="work__content">
          <WorkList workList={work} openAddModal={onOpenModal} />
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
