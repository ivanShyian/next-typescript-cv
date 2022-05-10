import './AdminEducation.scss'
import Modal from 'react-modal'
import {FC, MutableRefObject, useEffect, useState} from 'react'

interface Props {
  childFunction: MutableRefObject<any>
}

export const AdminEducation: FC<Props> = ({childFunction}) => {
  const [isModalOpen, changeModalVisibility] = useState(false)
  const [activeTab, changeTab] = useState(0)

  const tabList = [
    {name: 'School', component: <AdminEducationSchool />},
    {name: 'Learn', component: <AdminEducationLearn />}
  ]

  const handleCloseModal = () => {
    changeModalVisibility(false)
  }

  useEffect(() => {
    childFunction.current = {changeModalVisibility}
  }, [childFunction])

  return (
    <Modal
      isOpen={isModalOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={handleCloseModal}
      contentLabel="Admin about"
    >
      boo
    </Modal>
  )
}

const AdminEducationSchool: FC<{}> = () => {
  return (
    <div>hi</div>
  )
}

const AdminEducationLearn: FC<{}> = () => {
  return (
    <div>bye</div>
  )
}
