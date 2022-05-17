import {EnUkStringInterface} from '@/models/index'

export interface Responsibilities extends EnUkStringInterface{
  _id?: string
}

export interface WorkInterface {
  title: string
  subtitle: EnUkStringInterface
  description: EnUkStringInterface
  technologies: string[] | []
  responsibilities: Responsibilities[] | []
  imageUrl: string
  position: string
  duration: string,
  _id?: string
}

export interface SimplifiedWork extends Omit<WorkInterface, 'subtitle' | 'description'> {
  subtitle: string
  description: string
}


export type Update = {[key: string]: string | string[] | EnUkStringInterface[] | File}