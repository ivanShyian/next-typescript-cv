import {StaticImageData} from 'next/image'

export interface WorkItem {
  id: number
  name: string
  workLogo: StaticImageData
  subtitle: string
  description: string
  position: string
  positionLogo: string
  respons: string[]
  tech: string[]
  duration: string
}
