import Modal from 'react-modal';
import './IndexProjects.scss'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import ProjectsList from '@/components/Index/IndexProjects/ProjectList'
import {FC, useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'
import {RefModal, StateInterface} from '@/models/index'
import {bindActionCreators, Dispatch} from 'redux'
import {addProject, setProjects} from '@/redux/actions'
import {ProjectListItem, Project} from '@/models/Project'
import AdminProjects from '@/components/Admin/Projects'
import Api from '@/api/Api'

const api = new Api()

Modal.setAppElement('#__next');

interface Props {
  projectList: ProjectListItem[]
  project: Project | {}
  setProjects: (projects: ProjectListItem[]) => void
  addProject: (project: Project) => void
}

const IndexProjects: FC<Props> = ({projectList, project, addProject}) => {
  const [isOpen, changeModalState] = useState(false)
  const [isAdminEdit, changeAdminEdit] = useState(false)
  const [shouldAdminMount, changeAdminMountState] = useState(false)
  const adminModalRef = useRef<RefModal>(null)

  const onProjectClick = (projectId: string) => {
    changeModalState(true)
  }

  const onEdit = async(projectId: string) => {
    const response = await api.getProjectById(projectId)
    if (response?.project) {
      addProject(response.project)
    }
    changeAdminEdit(true)
    changeAdminMountState(true)
  }

  useEffect(() => {
    if (Object.keys(project).length && isAdminEdit) {
      if (adminModalRef.current) {
        adminModalRef.current.changeModalVisibility(true)
      }
    } else if (isAdminEdit) {
      changeAdminEdit(false)
    }
  }, [project, isAdminEdit])

  const onDelete = (projectId: string) => {}

  const handleCloseModal = () => changeModalState(false)

  return (
    <div className="index__projects section projects">
      <div className="projects__wrapper container">
        <SharedSectionTitle>Projects</SharedSectionTitle>
        <div className="projects__content">
          <ProjectsList
            projects={projectList}
            onEditClick={onEdit}
            onDeleteClick={onDelete}
            onProjectClick={onProjectClick}
          />
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
      {shouldAdminMount && (
        <AdminProjects
          project={project}
          modalRef={adminModalRef}
        />
      )}
    </div>
  )
}

type IState = (state: StateInterface) => {projectList: ProjectListItem[]}

const mapStateToProps = (state: StateInterface) => ({
  projectList: state.projects.projectList,
  project: state.projects.project
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProjects: bindActionCreators(setProjects, dispatch),
  addProject: bindActionCreators(addProject, dispatch)
})

export default connect(mapStateToProps as IState, mapDispatchToProps)(IndexProjects)