import {EnUkStringInterface} from '@/models/index'

export interface School {
  name: EnUkStringInterface
  description: EnUkStringInterface
  degree: EnUkStringInterface
  term: string
  _id?: string
}

export interface SimplifiedSchool extends Omit<School, 'description' | 'degree' | 'name'> {
  name: string
  description: string
  degree: string
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

export interface SimplifiedCourse extends Omit<Course, 'description'> {
  description: string
}