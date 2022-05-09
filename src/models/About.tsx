export interface Tech {
  name: string
  value: number
  color: string
}

export interface AboutInterface {
  _id: string
  techs: [Tech]
  text: {
    en: string
    uk: string
  }
}