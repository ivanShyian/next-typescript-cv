import {EnUkStringInterface} from '@/models/index'

export interface Project {
  title: string
  subtitle: EnUkStringInterface
  description: EnUkStringInterface
  technologies: string[]
  images: File[] | string[]
  mainImage: File | string
  _id?: string
}

export type ProjectListItem = Omit<Project, 'description' | 'technologies' | 'images'>