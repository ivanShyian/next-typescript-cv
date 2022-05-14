import {EnUkStringInterface} from '@/models/index'

export interface School {
  name: EnUkStringInterface
  description: EnUkStringInterface
  degree: EnUkStringInterface
  term: string
  _id?: string
}

export interface Course {
  name: string
  description: EnUkStringInterface
  learnPeriod?: string
  teacher?: string
  _id?: string
  totalTime?: number
}

export interface Techs {
  name: string
  courses: Course[]
  _id?: string
}


export interface EducationInterface {
  school: School[]
  techs: Techs[]
}