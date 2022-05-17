import {EnUkStringInterface} from '@/models/index'

export type FieldsList = 'status' | 'avatar' | 'links' | 'emailReceiver' | 'name'

export interface ConfigInterface {
  name: EnUkStringInterface
  links: {
    [key: string]: string
  },
  status: [EnUkStringInterface],
  avatar: File | string,
  _id: string,
  emailReceiver: string
}