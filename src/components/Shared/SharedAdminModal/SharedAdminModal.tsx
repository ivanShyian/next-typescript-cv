import {FC, Fragment, MutableRefObject, ReactChild, ReactElement, useEffect, useState} from 'react'
import './SharedAdminModal.scss'
import SharedButton from '../SharedButton'
import Modal from 'react-modal'
import {RefModal} from '@/models/index'

interface Props {
  children: ReactChild | {
    id: number
    name: string
    component: ReactElement
  }[]
  onSave: () => void
  childFunction?: MutableRefObject<RefModal>
  c?: () => void
  tabList?: {
    name: string
    [key: string]: any
  }[]
  beforeClose?: (item?: any) => any
}

export const SharedAdminModal: FC<Props> = ({children, onSave, tabList, childFunction, beforeClose}: Props) => {
  const [isModalOpen, changeModalVisibility] = useState(false)
  const [activeTab, changeActiveTab] = useState(0)

  useEffect(() => {
    if (childFunction) {
      childFunction.current = {
        changeModalVisibility,
        getActiveTab: activeTab
      }
    }
  }, [childFunction, activeTab])

  const handleCloseModal = () => {
    if (beforeClose) beforeClose()
    changeModalVisibility(false)
    changeActiveTab(0)
  }

  return (
    <Modal
      isOpen={isModalOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={handleCloseModal}
      contentLabel="Admin config"
    >
      <Fragment>
        {tabList?.length && (
          <div className="modal__tab">
            <div className="modal__tab_list">
              {tabList.map((item, id) => (
                <span onClick={() => changeActiveTab(id)} className={`modal__tab_item${activeTab === id ? '-active' : ''}`} key={id}>{item.name}</span>
              ))}
            </div>
          </div>
        )}
        <div className="modal__content">
          <Fragment>
            {
              Array.isArray(children)
                ? children[activeTab].component
                : children
            }
            <div className="modal__button">
              <SharedButton type="submit" onClick={onSave}>Save</SharedButton>
            </div>
          </Fragment>
        </div>
      </Fragment>
    </Modal>
  )
}