import {AxiosInstance, AxiosRequestHeaders} from 'axios'
import axios from 'axios'
import {getCookie} from 'cookies-next'
import FormData from 'form-data'
import {AboutInterface} from '@/models/About'
import {School, Techs} from '@/models/Education'
import {Update, WorkInterface} from '@/models/Work'
import {EnUkStringInterface} from '@/models/index'
import {ConfigInterface} from '@/models/Config'
import objectToFormData from '@/utils/objectToFormData'

export default class Api {
  api_token: null | string
  api_url: string
  client: null | AxiosInstance
  constructor() {
    this.api_token = null
    this.client = null
    this.api_url = (typeof window === 'undefined' ? process.env.API_ENDPOINT : process.env.NEXT_PUBLIC_API_ENDPOINT)!
  }

  init(): AxiosInstance {
    this.api_token = getCookie('auth') ? JSON.parse(getCookie('auth') as string)?.token : null

    let headers: AxiosRequestHeaders = {
      Accept: 'application/json',
    }

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    })

    return this.client
  }

  async postLogin(dataObj: {email: string, password: string}): Promise<any> {
    try {
      const {data} = await this.init().post('/login', dataObj)
      return data
    } catch (e:any) {
      console.error(e.response?.data?.message)
    }
  }

  async getConfig(): Promise<any> {
    try {
      const {data} = await this.init().get('/config')
      return data
    } catch (e:any) {
      console.error(e.response?.data?.message)
    }
  }

  async getAbout(): Promise<any> {
    try {
      const {data} = await this.init().get('/about')
      return data
    } catch (e:any) {
      console.error(e.response?.data?.message)
    }
  }

  async getEducation(): Promise<any> {
    try {
      const {data} = await this.init().get('/education')
      return data
    } catch (e:any) {
      console.error(e.response?.data?.message)
    }
  }

  async getWork(): Promise<any> {
    try {
      const {data} = await this.init().get('/work')
      return data
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async changeConfig(preparedData: Omit<ConfigInterface, 'avatar'> & {image: any}): Promise<void> {
    try {
      const {data} = await this.init().put('/admin/config', objectToFormData(preparedData), {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'multipart/form-data',
        }
      })
    } catch (e:any) {
      console.error(e.response?.data?.message)
    }
  }

  async changeAbout(preparedData: AboutInterface): Promise<void> {
    try {
      const {data} = await this.init().put('/admin/about', preparedData)
    } catch (e:any) {
      console.error(e.response?.data?.message)
    }
  }

  async addTechs(techs: Techs[]) {
    try {
      const {data} = await this.init().post('/admin/education/techs', {techs})
      if (data) return data.result
      else throw new Error('Something going wrong...')
    } catch (e:any) {
      console.error(e.response?.data?.message)
    }
  }

  async extendTechs(techs: Techs[]) {
    try {
      const {data} = await this.init().put('/admin/education/techs', {techs})
    } catch (e:any) {
      console.error(e.response?.data?.message)
    }
  }

  async addNewSchool(preparedData: {data: School, type: 'add' | 'edit'}) {
    try {
      const {data} = await this.init().post('/admin/education/school', preparedData)
      if (data) return data.result
    } catch (e:any) {
      console.error(e.response?.data?.message)
    }
  }

  async removeSchool(id: string) {
    try {
      const {data} = await this.init().delete(`/admin/education/school/${id}`)
    } catch (e:any) {
      console.error(e.response?.data?.message)
    }
  }

  async removeTech(id: string) {
    try {
      const {data} = await this.init().delete(`/admin/education/techs/${id}`)
    } catch (e:any) {
      console.error(e.response?.data?.message)
    }
  }

  async removeCourse(id: string) {
    try {
      const {data} = await this.init().delete(`/admin/education/courses/${id}`)
    } catch (e:any) {
      console.error(e.response?.data?.message)
    }
  }

  async addNewWork(preparedData: Omit<WorkInterface, 'imageUrl'> & {image: any}) {
    try {
      const {data} = await this.init().post('/admin/work', objectToFormData(preparedData), {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'multipart/form-data',
        }
      })
    } catch (e:any) {
      console.error(e.response?.data?.message)
    }
  }


  async updateWork(preparedData: Update) {
    try {
      const {data} = await this.init().put('/admin/work', objectToFormData(preparedData), {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'multipart/form-data',
        }
      })
    } catch (e:any) {
      console.error(e.response?.data?.message)
    }
  }

  async removeWork(id: string) {
    try {
      const {data} = await this.init().delete(`/admin/work/${id}`)
    }
    catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  //
  // async getConfig(): Promise<any> {
  //   const {data} = await this.init().get('/config')
  //   return data
  // }
}
