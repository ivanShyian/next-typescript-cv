export type FieldsList = 'status' | 'avatar' | 'links' | 'emailReceiver' | 'name'

export type StatusListItem = {en: string, uk: string}

export interface ConfigInterface {
  name: StatusListItem
  links: {
    [key: string]: string
  },
  status: [StatusListItem],
  avatar: string,
  _id: string,
  emailReceiver: string
}