import {EnUkStringInterface, ImageInterface} from '@/models/index'

export type FieldsList = 'status' | 'avatar' | 'links' | 'emailReceiver' | 'name'

export interface ConfigInterface {
  name: EnUkStringInterface
  links: {
    [key: string]: string
  }
  status: [EnUkStringInterface]
  avatar: ImageInterface,
  _id: string,
  emailReceiver: string
  fileToUpload?: File
}