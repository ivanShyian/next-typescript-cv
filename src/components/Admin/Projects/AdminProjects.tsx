import {FC, FormEvent, MutableRefObject, useEffect, useState} from 'react'
import './AdminProjects.scss'
import SharedAdminModal from '@/components/Shared/SharedAdminModal'
import {EnUkStringInterface, RefModal} from '@/models/index'
import {Project} from '@/models/Project'
import useTranslation from 'next-translate/useTranslation'
import {AdminProjectsForm} from '@/components/Admin/Projects/AdminProjectsForm'
import {AdminProjectsTech} from '@/components/Admin/Projects/AdminProjectsTech'
import Image from 'next/image'

interface Props {
  modalRef: MutableRefObject<RefModal>
  project: Project | {}
}

export const AdminProjects: FC<Props> = ({modalRef, project}) => {
  const {lang} = useTranslation() as {lang: 'uk' | 'en'}
  const [newTech, changeNewTech] = useState('')
  // Just testing approach with predefined values
  const [values, changeValues] = useState<Project | Record<string, string | string[] | EnUkStringInterface | {} | []>>({
    title: '',
    subtitle: {},
    description: {},
    technologies: [],
    images: [],
    mainImage: ''
  })

  useEffect(() => {
    if (Object.keys(project).length) {
      const {images, mainImage, ...other} = project as Project
      const host = 'http://localhost:8080/'
      changeValues((prevState) => {
        return {
          ...prevState,
          ...other as Project,
          mainImage: `${host + mainImage}`,
          images: images.map(image => `${host + image}`)
        }
      })
    }
  }, [project])

  const onInputChange = (field: keyof Project, value: string) => {
    if (['description', 'subtitle'].includes(field)) {
      const oppositeLang = lang === 'uk' ? 'en' : 'uk'
      changeValues((prevState) => {
        const values = {...prevState[field] as EnUkStringInterface, [lang]: value}
        if (!values[oppositeLang]) values[oppositeLang] = ''
        return {
          ...prevState,
          [field]: values
        }
      })
    } else {
      changeValues((prevState) => ({
        ...prevState,
        [field]: value
      }))
    }
  }

  const onTechChange = (index: number, value: string) => {
    changeValues((prevState) => {
      const propertyCopy = [...prevState.technologies as string[]]
      propertyCopy[index] = value
      return {
        ...prevState,
        technologies: propertyCopy
      }
    })
  }

  const addNewTech = (e: FormEvent) => {
    e.preventDefault()
    if (!newTech.length) return
    const foundIndex = (values.technologies as string[]).findIndex(el => el === newTech)
    if (foundIndex === -1) {
      changeValues((prevState) => ({
        ...prevState,
        technologies: [
          ...prevState.technologies as string[],
          newTech
        ]
      }))
      changeNewTech('')
    }
  }

  return (
    <SharedAdminModal onSave={() => {}} childFunction={modalRef}>
      <div className="admin-projects">
        <div className="modal__title">Admin Projects</div>
        <AdminProjectsForm
          title={values.title as string}
          subtitle={(values.subtitle as EnUkStringInterface)[lang] as string}
          description={(values.description as EnUkStringInterface)[lang] as string}
          onInputChange={onInputChange}
        />
        <div className="admin-projects__techs">
          <p className="admin-projects__techs_title">Techs</p>
          <ul className="admin-projects__techs_list">
            {(values.technologies as string[]).map((tech, key) => {
              return (
                <AdminProjectsTech
                  key={key}
                  tech={tech}
                  index={key}
                  onTechChange={onTechChange}
                />
              )
            })}
            <li className="admin-projects__techs_item admin-projects__techs_item_new">
              <form className="admin-projects__techs_form" onSubmit={addNewTech}>
                <input
                  placeholder="Add new+"
                  type="text"
                  value={newTech}
                  onChange={(e) => changeNewTech(e.target.value)}
                />
              </form>
            </li>
          </ul>
        </div>
        <div className="admin-projects__images">
          <p className="admin-projects__images_title">Images</p>
          <ul className="admin-projects__images_list">
            {(values.images as string[]).map((image, key) => {
              return (
                <li className={`admin-projects__images_item${values.mainImage === image ? '-main' : ''}`} key={key}>
                  <Image src={image} layout="fill" alt="project image" objectFit="contain"/>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </SharedAdminModal>
  )
}