import {EnUkStringInterface, ImageInterface} from '@/models/index'

export interface Responsibilities extends EnUkStringInterface{
  _id?: string
}

export interface WorkInterface {
  title: string
  subtitle: EnUkStringInterface
  description: EnUkStringInterface
  technologies: string[] | []
  responsibilities: Responsibilities[] | []
  imageUrl: ImageInterface | Record<string, string>
  position: string
  duration: string,
  fileToUpload?: File
  _id?: string
}

export interface SimplifiedWork extends Omit<WorkInterface, 'subtitle' | 'description'> {
  subtitle: string
  description: string
}


export type Update = {[key: string]: string | string[] | EnUkStringInterface[] | File}