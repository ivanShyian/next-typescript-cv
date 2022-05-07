import Modal from 'react-modal'
import './AdminConfig.scss'
import Image from 'next/image'
import Avatar from '@/public/assets/Avatar.png'
import {useState, useEffect, FC, MutableRefObject, Fragment, SetStateAction, Dispatch, useRef} from 'react'
import SharedButton from '@/components/Shared/SharedButton'
import {connect} from 'react-redux'
import {setConfig} from '../../../redux/actions/config'
import {bindActionCreators} from 'redux'

interface NameValue {
  name: string
  value: string
}

interface ConfigInterface {
  links: [{
    en: NameValue,
    uk: NameValue
  }],
  status: [{
    en: string,
    uk: string
  }],
  avatar: string,
  _id: string,
  emailReceiver: string
}

interface Props {
  childFunction: MutableRefObject<any>
  config: ConfigType
  setConfig: any
}

type ConfigType = ConfigInterface
type StatusListItem = {en: string, uk: string}
type ChangeStatusType  = Dispatch<SetStateAction<StatusListItem[]>>

Modal.setAppElement('#__next')

const AdminConfig: FC<Props> = ({ config, setConfig, childFunction }) => {
  const [isModalOpen, changeModalVisibility] = useState(false)
  const [activeTab, changeActiveTab] = useState(0)

  const changeStatusList = (newStatusList: any) => {
    setConfig(({...config, status: newStatusList}))
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

function ModalGeneralTab({statusList, changeStatusList}: {statusList: StatusListItem[], changeStatusList: ChangeStatusType}) {
  const [statusValue, changeStatusValue] = useState('')
  const [image, changeImage] = useState(Avatar)
  const fileInput = useRef<HTMLInputElement>(null)
  
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

  const openFileInput = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const onHandleChangeImage = (files: FileList | null) => {
    const fileToLoad = files && files[0]
    if (fileToLoad) {
      const fileReader = new FileReader()
      fileReader.onload = function(loadedEvent) {
        const srcData = loadedEvent.target!.result
        changeImage(srcData as any)
      }
      fileReader.readAsDataURL(fileToLoad)
    }
  }

  return (
    <div className="modal-general">
      <p className="modal__title">General</p>
      <div className="modal-general__image modal-image">
        <form className="modal-image__wrapper" onClick={openFileInput}>
          <Image src={image} objectFit="cover" layout="fill" alt="avatar"/>
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

const mapStateToProps = (state: any) => ({
  config: state.config.config
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    setConfig: bindActionCreators(setConfig, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminConfig)
