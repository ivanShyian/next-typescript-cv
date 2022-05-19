import {FC, FormEvent, MutableRefObject, useEffect, useRef, useState} from 'react'
import './AdminProjects.scss'
import SharedAdminModal from '@/components/Shared/SharedAdminModal'
import {EnUkStringInterface, RefModal} from '@/models/index'
import {Project} from '@/models/Project'
import useTranslation from 'next-translate/useTranslation'
import {AdminProjectsForm} from '@/components/Admin/Projects/AdminProjectsForm'
import {AdminProjectsTech} from '@/components/Admin/Projects/AdminProjectsTech'
import Image from 'next/image'
import readAsDataURL from '@/utils/readAsDataURL'

interface Props {
  modalRef: MutableRefObject<RefModal>
  project: Project | {}
  updateProjects: (project: Project, files?: File[]) => void
  beforeClose: () => void
}

const HOST = 'http://localhost:8080/'

export const AdminProjects: FC<Props> = ({modalRef, project, beforeClose, updateProjects}) => {
  const {lang} = useTranslation() as {lang: 'uk' | 'en'}
  const [newTech, changeNewTech] = useState<string>('')
  const [newFiles, changeNewFiles] = useState<File[]>([])
  const fileInput = useRef<HTMLInputElement | null>(null)
  // Just testing approach with predefined values
  const [values, changeValues] = useState<Project | Record<string, string | string[] | EnUkStringInterface | {} | []>>({
    title: '',
    subtitle: {
      en: '',
      uk: ''
    },
    description: {
      en: '',
      uk: ''
    },
    technologies: [],
    images: [],
    mainImage: ''
  })

  useEffect(() => {
    if (Object.keys(project).length) {
      const {images, mainImage, ...other} = project as Project
      changeValues((prevState) => {
        return {
          ...prevState,
          ...other as Project,
          mainImage: `${HOST + mainImage}`,
          images: images.map(image => `${HOST + image}`)
        }
      })
    }
  }, [project])

  const onInputChange = (field: keyof Project, value: string) => {
    if (['description', 'subtitle'].includes(field)) {
      changeValues((prevState) => {
        const values = {...prevState[field] as EnUkStringInterface, [lang]: value}
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

  const changeMainImage = (image: string) => {
    changeValues((prevState) => {
      return {
        ...prevState,
        mainImage: image
      }
    })
  }

  const onNewImageClick = () => {
    if (fileInput.current) {
      fileInput.current?.click()
    }
  }

  const addNewImage = (fileList: FileList | null) => {
    if (fileList) {
      const file = fileList[0]
      readAsDataURL(file, (dataURL) => {
        changeValues((prevState) => {
          const mainImage = (prevState.mainImage as string)?.length ? prevState.mainImage : dataURL as string
          return {
            ...prevState,
            images: [...prevState.images as string[], dataURL],
            mainImage
          }
        })
        changeNewFiles((prevState) => {
          return [
            ...prevState as File[],
            file
          ]
        })
        if (fileInput.current) {
          fileInput.current!.value = ''
        }
      })
    }
  }

  const removeImage = (e: FormEvent, image: string) => {
    e.stopPropagation()
    let imagesCopy = [...values.images as string[]]
    const foundImageIndex = imagesCopy.findIndex(im => im === image)
    imagesCopy.splice(foundImageIndex, 1)
    if (newFiles.length) {
      const diff = imagesCopy.length - newFiles.length
      const fileIndex = foundImageIndex - diff - 1
      if (fileIndex > -1) {
        const filesCopy = [...newFiles]
        filesCopy.splice(fileIndex, 1)
        changeNewFiles(filesCopy)
      }
    }
    if (values.mainImage === image) {
      changeValues((prevState) => {
        return {
          ...prevState,
          images: imagesCopy,
          mainImage: imagesCopy.length ? imagesCopy[0] : ''
        }
      })
    } else {
      changeValues((prevState) => {
        return {
          ...prevState,
          images: imagesCopy
        }
      })
    }
  }

  const sendData = () => {
    updateProjects({
      ...values as Project,
      mainImage: (values.mainImage as string).replace(HOST, ''),
      images: (values.images as string[]).map(val => val.replace(HOST, ''))
    }, newFiles)
  }

  return (
    <SharedAdminModal
      onSave={sendData}
      childFunction={modalRef}
      beforeClose={beforeClose}
    >
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
                <li
                  onClick={() => changeMainImage(image)}
                  className={`admin-projects__images_item${values.mainImage === image ? '-main' : ''}`}
                  key={key}
                >
                  <Image src={image} layout="fill" alt="project image" objectFit="contain"/>
                  <span className="admin-projects__images_item-remove" onClick={(e) => removeImage(e, image)}>x</span>
                </li>
              )
            })}
            <li className="admin-projects__images_item-new" onClick={onNewImageClick}>
              <input ref={fileInput} type="file" onChange={(e) => addNewImage(e.target.files)}/>
              <span>Add new+</span>
            </li>
          </ul>
        </div>
      </div>
    </SharedAdminModal>
  )
}