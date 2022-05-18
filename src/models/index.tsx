import {ConfigInterface} from '@/models/Config'
import {AboutInterface} from '@/models/About'
import {EducationInterface, Techs} from '@/models/Education'
import {WorkInterface} from '@/models/Work'
import {Project, ProjectListItem} from '@/models/Project'

export interface StateInterface {
  config: {
    config: ConfigInterface
  }
  about: {
    about: AboutInterface
  }
  education: {
    education: EducationInterface,
    techList: Techs[]
  }
  work: {
    work: WorkInterface[]
  }
  projects: {
    projectList: ProjectListItem[],
    project: Project | {}
  }
}

export interface EnUkStringInterface {
  en: string
  uk: string
}

interface RefModalInterface {
  changeModalVisibility: (value: boolean) => void
  getActiveTab?: number
}

export type RefModal = RefModalInterface | null