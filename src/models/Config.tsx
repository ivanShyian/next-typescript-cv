export type FieldsList = 'status' | 'avatar' | 'links' | 'emailReceiver'

export type StatusListItem = {en: string, uk: string}

interface NameValue {
  name: string
  value: string
}

export interface ConfigInterface {
  links: [{
    en: NameValue,
    uk: NameValue
  }],
  status: [{
    en: string,
    uk: string
  }],
  avatar: string,
  _id: string,
  emailReceiver: string
}