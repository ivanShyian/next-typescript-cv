import Modal from 'react-modal';
import './IndexProjects.scss'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import ProjectsList from '@/components/Index/IndexProjects/ProjectList'
import {FC, useCallback, useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'
import {ImageInterface, RefModal, StateInterface} from '@/models/index'
import {bindActionCreators, Dispatch} from 'redux'
import {addProject, setProjects} from '@/redux/actions'
import {ProjectListItem, Project} from '@/models/Project'
import AdminProjects from '@/components/Admin/Projects'
import Api from '@/api/Api'
import useTranslation from 'next-translate/useTranslation'
import ProjectModal from '@/components/Index/IndexProjects/ProjectModal'

const api = new Api()

Modal.setAppElement('#__next');

interface Props {
  projectList: ProjectListItem[]
  project: Project | {}
  setProjects: (projects: ProjectListItem[]) => void
  addProject: (project: Project | {}) => void
}

const IndexProjects: FC<Props> = ({projectList, project, addProject, setProjects}) => {
  const [chosenProject, changeChosenProject] = useState<Project | null>(null)
  const [isAdminEdit, changeAdminEdit] = useState(false)
  const [shouldAdminMount, changeAdminMountState] = useState(false)
  const adminModalRef = useRef<RefModal>(null)
  const {t} = useTranslation('index')

  const onProjectClick = async(projectId: string) => {
    const response = await api.getProjectById(projectId)
    if (response?.project) changeChosenProject(response.project)
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

  const updateProjects = async(project: Project, files?: File[]) => {
    const foundMainIndex = project.images.findIndex(el => el.src === project.mainImage.src)
    const mainImage = project.mainImage.src.includes('data:image/') ? foundMainIndex : project.mainImage
    const data = {
      ...project,
      images: (project.images as ImageInterface[]).filter((el: ImageInterface) => !(el.src as string).includes('data:image/')),
      mainImage: mainImage as ImageInterface,
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
        <SharedSectionTitle>{t('projectsTitle')}</SharedSectionTitle>
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
      <ProjectModal
        chosenProject={chosenProject}
        onModalClose={() => changeChosenProject(null)}
      />
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

type IState = (state: StateInterface) => {projectList: ProjectListItem[], project: Project | {}}

const mapStateToProps = (state: StateInterface) => ({
  projectList: state.projects.projectList,
  project: state.projects.project
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProjects: bindActionCreators(setProjects, dispatch),
  addProject: bindActionCreators(addProject, dispatch)
})

export default connect(mapStateToProps as IState, mapDispatchToProps)(IndexProjects)