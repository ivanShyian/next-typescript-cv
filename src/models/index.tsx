import {ConfigInterface} from '@/models/Config'
import {AboutInterface} from '@/models/About'
import {EducationInterface, Techs} from '@/models/Education'

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
}

export interface EnUkStringInterface {
  en: string
  uk: string
}