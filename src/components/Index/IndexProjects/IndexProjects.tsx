import Modal from 'react-modal';
import './IndexProjects.scss'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import ProjectsList from '@/components/Index/IndexProjects/ProjectList'
import {FC, useCallback, useEffect, useRef, useState} from 'react'
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
  addProject: (project: Project | {}) => void
}

const IndexProjects: FC<Props> = ({projectList, project, addProject, setProjects}) => {
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

  const onAdd = () => {
    changeAdminMountState(true)
  }

  const beforeAdminModalClose = useCallback(() => {
    changeAdminEdit(false)
    changeAdminMountState(false)
    addProject({})
  }, [changeAdminMountState, changeAdminEdit, addProject])

  // onEdit watcher
  useEffect(() => {
    if (Object.keys(project).length && isAdminEdit && adminModalRef.current) {
      adminModalRef.current.changeModalVisibility(true)
    }
  }, [project, isAdminEdit])

  // onAdd watcher
  useEffect(() => {
    if (!Object.keys(project).length && !isAdminEdit && shouldAdminMount && adminModalRef.current) {
      adminModalRef.current.changeModalVisibility(true)
    }
  }, [project, isAdminEdit, shouldAdminMount, adminModalRef])

  const onDelete = async(projectId: string) => {
    await api.deleteProject(projectId)
    const filteredList = (projectList as Project[]).filter((project: Project) => project._id !== projectId)
    setProjects(filteredList)
  }

  const handleCloseModal = () => changeModalState(false)

  const updateProjects = async(project: Project, files?: File[]) => {
    const foundMainIndex = project.images.findIndex(el => el === project.mainImage)
    const mainImage = (project.mainImage as string).includes('data:image/') ? foundMainIndex : project.mainImage
    const data = {
      ...project,
      images: (project.images as string[]).filter((el: string) => !el.includes('data:image/')),
      mainImage: mainImage as string,
      'fileToUpload[]': files
    }
    if (project._id) {
      const response = await api.updateProject(data)
      if (response?.result) {
        const projectsCopy = [...projectList]
        const foundIndex = projectsCopy.findIndex(el => el._id === response.result._id)
        projectsCopy[foundIndex] = response.result
        setProjects(projectsCopy)
      }
    } else {
      const response = await api.addProject(data)
      if (response?.result) {
        setProjects([...projectList, response.result])
      }
    }
    adminModalRef.current?.changeModalVisibility(false)
  }

  return (
    <section className="index__projects section projects">
      <div className="projects__wrapper container">
        <SharedSectionTitle>Projects</SharedSectionTitle>
        <div className="projects__content">
          <ProjectsList
            projects={projectList}
            onEditClick={onEdit}
            onDeleteClick={onDelete}
            onProjectClick={onProjectClick}
            onAdd={onAdd}
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
          updateProjects={updateProjects}
          modalRef={adminModalRef}
          beforeClose={beforeAdminModalClose}
        />
      )}
    </section>
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