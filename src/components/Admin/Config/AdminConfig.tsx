import Modal from 'react-modal'
import './AdminConfig.scss'
import { FC } from 'react'
import Image from 'next/image'
import Avatar from '@/public/assets/Avatar.png'
import { useState, useEffect, FC, MutableRefObject, Fragment } from 'react'
import SharedButton from '@/components/Shared/SharedButton'

interface Props {
  childFunction: MutableRefObject<any>
}

Modal.setAppElement('#__next')

const pseudoList = [
  { id: 0, name: 'Instagram' },
  { id: 1, name: 'Twitter' },
  { id: 2, name: 'Telegram' },
  { id: 3, name: 'Facebook' },
]

export const AdminConfig: FC<Props> = ({ childFunction }) => {
  const [isModalOpen, changeModalVisibility] = useState(false)
  const [activeTab, changeActiveTab] = useState(0)
  const [statusList, changeStatusList] = useState([
    { id: 0, name: 'Node' },
    { id: 1, name: 'React' },
    { id: 2, name: 'Vue' }
  ])

  const tabList = [
    { id: 0, name: 'General', component: <ModalGeneralTab statusList={statusList} changeStatusList={changeStatusList}/> },
    { id: 1, name: 'Social', component: <ModalSocialTab /> },
    { id: 2, name: 'Email', component: <ModalEmailTab /> }
  ]

  useEffect(() => {
    childFunction.current = changeModalVisibility
  }, [childFunction])

  return (
    <Modal
      isOpen={isModalOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => changeModalVisibility(false)}
      contentLabel="Example Modal"
    >
      <Fragment>
        <div className="modal__tab">
          <div className="modal__tab_list">
            {tabList.map((item, id) => {
              return <span onClick={() => changeActiveTab(id)} className={`modal__tab_item${activeTab === id ? '-active' : ''}`} key={id}>{item.name}</span>
            })}
          </div>
        </div>
        <div className="modal__content">
          {tabList[activeTab].component}
          <div className="modal__button">
            <SharedButton type="submit">Save</SharedButton>
          </div>
        </div>
      </Fragment>
    </Modal>
  )
}

function ModalGeneralTab({statusList, changeStatusList}: {statusList: any[], changeStatusList: (item: any) => {}}) {
  const [statusValue, changeStatusValue] = useState('')
  
  const appendStatus = (e: any) => {
    e.preventDefault()
    if (statusValue.length === 0) {
      return
    }
    changeStatusList((state: any) => {
      const newArr = [...state]
      newArr.push({id: newArr.length, name: statusValue})
      return newArr
    })
    changeStatusValue('')
  }

  const removeItem = (id: number) => {
    changeStatusList((state: any) => {{
      const newState = [...state]
      return newState.filter((item: any) => item.id !== id)
    }})
  }
  
  return (
    <div className="modal-general">
      <p className="modal__title">General</p>
      <div className="modal-general__image modal-image">
        <form className="modal-image__wrapper">
          <Image src={Avatar} objectFit="contain" alt="avatar" />
          {/* <input type="file" /> */}
        </form>
      </div>
      <div className="modal-general__status modal-status">
        <p className="modal__title">Skill list</p>
        <ul className="modal-status__list">
          {statusList.map((item, id) => {
            return (
              <li className="modal-status__item" key={id}>
                <div>
                  <p><span onClick={() => removeItem(item.id)}>{id + 1}. {item.name}</span></p>
                </div>
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
          <div className="form-control__button">
            <SharedButton type="submit">Append</SharedButton>
          </div>
        </form>
      </div>
    </div>
  )
}

function ModalSocialTab() {
  const listItems = pseudoList.map((item, id) => {
    return (
      <li className="modal-list__item form-control" key={id}>
        <div className="form-control__heading">
          <label htmlFor="">{item.name}</label>
        </div>
        <input className="form-control__input" type="text" />
      </li>
    )
  })
  return (
    <form className="modal-social">
      <div className="modal__content_social">
        <p className="modal__title">Social Medias</p>
        <ul className="modal-social__list modal-list">
          {listItems}
        </ul>
      </div>
    </form>
  )
}

function ModalEmailTab() {
  return (
    <div className="modal__content_mail modal-mail">
      <p className="modal__title">Email Settings</p>
      <div className="modal-list__item form-control">
        <div className="form-control__heading">
          <label htmlFor="">Email receiver</label>
        </div>
        <input className="form-control__input" type="text" />
      </div>
    </div>
  )
}
