import {EnUkStringInterface} from '@/models/index'

export interface Tech {
  name: string
  value: number
  color: string
}

export interface AboutInterface {
  _id: string
  techs: Tech[]
  text: EnUkStringInterface
}
