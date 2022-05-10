import {EnUkStringInterface} from '@/models/index'

export interface School {
  name: EnUkStringInterface
  description: EnUkStringInterface
  degree: EnUkStringInterface
  term: string
}

export interface Course {
  name: string
  description: EnUkStringInterface
  totalTime: number
  learnPeriod?: string
  teacher?: string
}

export interface Techs {
  name: string
  _id: string
  courses?: [Course]
}


export interface EducationInterface {
  school: [School]
  techs: [Techs]
}