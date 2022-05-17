import './AdminConfig.scss'

import {
  useState,
  useRef,
  useMemo,
  MutableRefObject,
  ReactElement,
  FC, useCallback
} from 'react'
import {connect} from 'react-redux'
import dynamic from 'next/dynamic'
import {setConfig} from '@/redux/actions'
import {bindActionCreators, Dispatch} from 'redux'
import Api from '@/api/Api'
import Modal from 'react-modal'
import {ConfigInterface, FieldsList} from '@/models/Config'
import SharedAdminModal from '@/components/Shared/SharedAdminModal'

const ModalGeneralTab = dynamic(() => import('@/components/Admin/Config/AdminConfigGeneral'))
const ModalSocialTab = dynamic(() => import('@/components/Admin/Config/AdminConfigSocial'))
const ModalEmailTab = dynamic(() => import('@/components/Admin/Config/AdminConfigEmail'))

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
  const fileInputRef = useRef<FileList | null>(null)
  const socialInputRef = useRef<{getValues: () => {[key: string]: string}} | null>(null)
  const emailInputRef = useRef<{getValue: () => string} | null>(null)

  const changeLocalConfig = useCallback((field: FieldsList, newValues: any) => {
    changeConfigCopy({...configCopy, [field]: newValues})
  }, [configCopy])

  const onSave = async() => {
    let data = {...configCopy}
    if (fileInputRef.current && Array.isArray(fileInputRef.current)) data = {...data, avatar: fileInputRef.current[0]}
    if (socialInputRef.current) data = {...data, links: socialInputRef.current.getValues()}
    if (emailInputRef.current) data = {...data, emailReceiver: emailInputRef.current.getValue()}
    setConfig(data)
    const {avatar, ...other} = data
    await api.changeConfig({...other, image: avatar})
    handleCloseModal()
  }

  const handleCloseModal = () => {
    if (childFunction?.current) {
      childFunction.current.changeModalVisibility(false)
    }
    onUnmounted()
  }

  const tabList = useMemo<{id: number, name: string, component: ReactElement}[]>(() => ([
    { id: 0, name: 'General', component: <ModalGeneralTab childFunction={fileInputRef} avatar={configCopy.avatar} nameValue={configCopy.name} statusList={configCopy.status} changeGeneral={changeLocalConfig}/> },
    { id: 1, name: 'Social', component: <ModalSocialTab childFunction={socialInputRef} linksMap={configCopy.links} changeSocial={changeLocalConfig}/> },
    { id: 2, name: 'Email', component: <ModalEmailTab childValue={emailInputRef} emailReceiver={configCopy.emailReceiver}/> }
  ]), [
    changeLocalConfig,
    configCopy,
    fileInputRef,
    socialInputRef,
    emailInputRef
  ])

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
