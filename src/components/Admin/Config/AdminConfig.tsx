import Modal from 'react-modal'
import './AdminConfig.scss'
import Image from 'next/image'
import Avatar from '@/public/assets/Avatar.png'
import {useState, useEffect, FC, MutableRefObject, Fragment, SetStateAction, Dispatch} from 'react'
import SharedButton from '@/components/Shared/SharedButton'
import {ConfigType, useConfigContext} from '../../../context/config'

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
  const {
    config,
    setConfig
  }: {config: ConfigType, setConfig: (config: ConfigType) => void} = useConfigContext()

  const changeStatusList = (newStatusList: any) => {
    setConfig({...config, status: newStatusList})
    // @TODO PUT API HERE
  }

  const tabList = [
    { id: 0, name: 'General', component: <ModalGeneralTab statusList={config.status} changeStatusList={changeStatusList}/> },
    { id: 1, name: 'Social', component: <ModalSocialTab linksList={config.links}/> },
    { id: 2, name: 'Email', component: <ModalEmailTab emailReceiver={config.emailReceiver}/> }
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

type StatusListItem = {en: string, uk: string}
type ChangeStatusType  = Dispatch<SetStateAction<StatusListItem[]>>

function ModalGeneralTab({statusList, changeStatusList}: {statusList: StatusListItem[], changeStatusList: ChangeStatusType}) {
  const [statusValue, changeStatusValue] = useState('')
  
  const appendStatus = (e: any) => {
    e.preventDefault()
    if (statusValue.length === 0) return
    //@TODO ADD LANG HERE
    changeStatusList([...statusList, {en: statusValue, uk: statusValue}])
    changeStatusValue('')
  }

  const removeItem = (val: {en: string, uk: string}) => {
    let copyOfStatusList = [...statusList]
    const elementIndex = copyOfStatusList.findIndex((el: {en: string, uk: string}) => el === val)
    copyOfStatusList.splice(elementIndex, 1)
    changeStatusList(copyOfStatusList)
  }

  return (
    <div className="modal-general">
      <p className="modal__title">General</p>
      <div className="modal-general__image modal-image">
        <form className="modal-image__wrapper">
          <Image src={Avatar} objectFit="contain" alt="avatar" />
          {/*@TODO ADD FILE READER HERE*/}
          {/* <input type="file" /> */}
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

function ModalSocialTab({linksList}: {linksList: any[]}) {
  const listItems = linksList.map((item, id) => {
    return (
      <li className="modal-list__item form-control" key={id}>
        <div className="form-control__heading">
          <label htmlFor="">{item.en.name}</label>
        </div>
        <input className="form-control__input" type="text" readOnly={false} placeholder={item.en.value} />
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

function ModalEmailTab({emailReceiver}: {emailReceiver: string}) {
  return (
    <div className="modal__content_mail modal-mail">
      <p className="modal__title">Email Settings</p>
      <div className="modal-list__item form-control">
        <div className="form-control__heading">
          <label htmlFor="">Email receiver</label>
        </div>
        <input className="form-control__input" type="text" placeholder={emailReceiver} />
      </div>
    </div>
  )
}
