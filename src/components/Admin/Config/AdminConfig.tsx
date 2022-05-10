import './AdminConfig.scss'

import {useState, FC, MutableRefObject, useRef, ReactElement} from 'react'
import {connect} from 'react-redux'
import {setConfig} from '@/redux/actions'
import {bindActionCreators, Dispatch} from 'redux'
import Api from '@/api/Api'

import Modal from 'react-modal'
import ModalGeneralTab from '@/components/Admin/Config/AdminConfigGeneral'
import ModalSocialTab from '@/components/Admin/Config/AdminConfigSocial'
import ModalEmailTab from '@/components/Admin/Config/AdminConfigEmail'
import {ConfigInterface, FieldsList} from '@/models/Config'
import FormData from 'form-data'
import SharedAdminModal from '@/components/Shared/SharedAdminModal'

Modal.setAppElement('#__next')
const api = new Api()

interface Props {
  childFunction: MutableRefObject<any>
  config: ConfigInterface
  onUnmounted: () => void
  setConfig: (config: ConfigInterface) => void
}

const AdminConfig: FC<Props> = ({ config, setConfig, onUnmounted, childFunction }) => {
  const [configCopy, changeConfigCopy] = useState({...config})
  const fileInputRef = useRef<MutableRefObject<any>>(null)
  const socialInputRef = useRef<MutableRefObject<any>>(null)
  const emailInputRef = useRef<MutableRefObject<any>>(null)

  const changeLocalConfig = (field: FieldsList, newValues: any) => {
    changeConfigCopy({...configCopy, [field]: newValues})
  }

  const onSave = async() => {
    let data = configCopy
    if (fileInputRef.current) {
      const fileArray = fileInputRef.current as any
      data = {...configCopy, avatar: fileArray[0]}
    }
    if (socialInputRef.current) {
      const input = socialInputRef.current as any
      data = {...configCopy, links: input.getValues()}
    }
    if (emailInputRef.current) {
      const input = emailInputRef.current as any
      data = {...configCopy, emailReceiver: input.getValue()}
    }

    setConfig(data)

    const formData = new FormData()
    formData.append('status', JSON.stringify(data.status))
    formData.append('links', JSON.stringify(data.links))
    formData.append('emailReceiver', data.emailReceiver)
    formData.append('image', data.avatar)
    formData.append('name', JSON.stringify(data.name))

    await api.changeConfig(formData)
    handleCloseModal()
  }

  const handleCloseModal = () => {
    if (childFunction?.current) {
      childFunction.current.changeModalVisibility(false)
    }
    onUnmounted()
  }

  const tabList: {id: number, name: string, component: ReactElement}[] = [
    { id: 0, name: 'General', component: <ModalGeneralTab childFunction={fileInputRef} avatar={configCopy.avatar} nameValue={configCopy.name} statusList={configCopy.status} changeGeneral={changeLocalConfig}/> },
    { id: 1, name: 'Social', component: <ModalSocialTab childFunction={socialInputRef} linksMap={configCopy.links} changeSocial={changeLocalConfig}/> },
    { id: 2, name: 'Email', component: <ModalEmailTab childValue={emailInputRef} emailReceiver={configCopy.emailReceiver}/> }
  ]

  return (
    <SharedAdminModal
      onSave={onSave}
      childFunction={childFunction}
      tabList={tabList}>
      {tabList}
    </SharedAdminModal>
  )
}


const mapStateToProps = (state: {config: any}) => ({
  config: state.config.config
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setConfig: bindActionCreators(setConfig, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminConfig)
