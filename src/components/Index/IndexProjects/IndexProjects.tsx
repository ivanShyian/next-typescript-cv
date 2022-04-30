import {NextPage} from 'next'
import Modal from 'react-modal';
import './IndexProjects.scss'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import ProjectsList from '@/components/Index/IndexProjects/ProjectList'
import {useState} from 'react'

Modal.setAppElement('#__next');

const projects = [
  {id: 0, name: 'Someee', subtitle: 'Subtitle here is sss', image: ''},
  {id: 1, name: 'So', subtitle: 'Subtitle here is sss', image: ''},
  {id: 2, name: 'Som', subtitle: 'Subtitle here is sss', image: ''},
  {id: 3, name: 'Some', subtitle: 'Subtitle here is sss', image: ''},
  {id: 4, name: 'Somee', subtitle: 'Subtitle here is sss', image: ''}
]

export const IndexProjects: NextPage = () => {
  const [isOpen, changeModalState] = useState(false)

  const onProjectClick = (id: string | number) => {
    console.log(id)
    // Start loader
    // When loading complete - open modal
    changeModalState(true)
  }

  const handleCloseModal = () => changeModalState(false)

  return (
    <div className="index__projects section projects">
      <div className="projects__wrapper container">
        <SharedSectionTitle>Projects</SharedSectionTitle>
        <div className="projects__content">
          <ProjectsList projects={projects} onProjectClick={onProjectClick}/>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={handleCloseModal}
        contentLabel="Example Modal"
      >
        <h2>Hello</h2>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  )
}
