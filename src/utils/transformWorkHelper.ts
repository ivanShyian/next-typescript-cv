import {Responsibilities, SimplifiedWork, WorkInterface} from '@/models/Work'
import {EnUkStringInterface} from '@/models/index'

export default function transformWorkHelper(incomingDataSet: SimplifiedWork, originalList: WorkInterface[], editIndex: number, lang: 'en' | 'uk', imageFile?: File | null): WorkInterface {
  let data = {...incomingDataSet}
  const oppositeLang = lang === 'uk' ? 'en' : 'uk'
  for (const key in data) {
    if (['description', 'subtitle'].includes(key)) {
      if (editIndex === -1) {
        data = {
          ...data,
          [key]: {
            [lang]: data[key as keyof WorkInterface],
            [oppositeLang]: ''
          } as unknown as EnUkStringInterface
        }
      } else {
        data = {
          ...data,
          [key]: {
            ...originalList[editIndex][key as keyof WorkInterface] as EnUkStringInterface,
            [lang]: data[key as keyof SimplifiedWork]
          } as EnUkStringInterface
        }
      }
    } else if (key === 'responsibilities') {
      const dataKeyOfResp = data[key as keyof SimplifiedWork] as Responsibilities[]
      (data[key as keyof SimplifiedWork] as Responsibilities[]).forEach((value) => {
        const editFoundIndex = dataKeyOfResp.findIndex(el => el._id === value._id)
        if (editFoundIndex !== -1) {
          dataKeyOfResp[editFoundIndex] = {
            ...dataKeyOfResp[editFoundIndex],
            ...value
          } as EnUkStringInterface
        } else {
          dataKeyOfResp.push(value)
        }
      })
    } else if (key === 'technologies') {
      let dataKeyOfTechs = data[key as keyof SimplifiedWork] as string[]
      (data[key as keyof SimplifiedWork] as string[]).forEach((value) => {
        const editFoundIndex = dataKeyOfTechs.findIndex(el => el === value)
        if (editFoundIndex === -1) {
          dataKeyOfTechs.push(value)
        }
      })
    } else if (key === 'imageUrl' && imageFile) {
      data.fileToUpload = imageFile
    }
  }
  return data as unknown as WorkInterface
} 
