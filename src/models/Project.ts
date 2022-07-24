import {EnUkStringInterface, ImageInterface} from '@/models/index'

export interface Project {
  title: string
  subtitle: EnUkStringInterface
  description: EnUkStringInterface
  technologies: string[]
  images: ImageInterface[]
  mainImage: ImageInterface
  link: string
  _id?: string
  isWork?: boolean
}

export type ProjectListItem = Omit<Project, 'description' | 'technologies' | 'images' | 'link'>
