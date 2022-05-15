import {EnUkStringInterface} from '@/models/index'

interface Responsibilities extends EnUkStringInterface{
  _id: string
}

export interface WorkInterface {
  _id?: string
  title: string
  subtitle: EnUkStringInterface
  description: EnUkStringInterface
  technologies: string[] | []
  responsibilities: Responsibilities[] | []
  imageUrl: string
  position: string
  duration: string
}

export interface SimplifiedWork extends Omit<WorkInterface, 'subtitle' | 'description'> {
  subtitle: string
  description: string
}