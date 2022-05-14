import {AxiosInstance, AxiosRequestHeaders} from 'axios'
import axios from 'axios'
import {getCookie} from 'cookies-next'
import FormData from 'form-data'
import {AboutInterface} from '@/models/About'
import {Course, School, Techs} from '@/models/Education'

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
    } catch (e) {
      console.error(e)
    }
  }

  async getConfig(): Promise<any> {
    try {
      const {data} = await this.init().get('/config')
      return data
    } catch (e) {
      console.error(e)
    }
  }

  async getAbout(): Promise<any> {
    try {
      const {data} = await this.init().get('/about')
      return data
    } catch (e) {
      console.error(e)
    }
  }

  async getEducation(): Promise<any> {
    try {
      const {data} = await this.init().get('/education')
      return data
    } catch (e) {
      console.error(e)
    }
  }

  async changeConfig(formData: FormData): Promise<void> {
    try {
      const {data} = await this.init().put('/admin/config', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'multipart/form-data',
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  async changeAbout(preparedData: AboutInterface): Promise<void> {
    try {
      const {data} = await this.init().put('/admin/about', preparedData)
    } catch (e) {
      console.error(e)
    }
  }

  async addTechs(techs: Techs[]) {
    try {
      const {data} = await this.init().post('/admin/education/techs', {techs})
      if (data) return data.result
      else throw new Error('Something going wrong...')
    } catch (e) {
      console.error(e)
    }
  }

  async extendTechs(techs: {_id: string, courses: Course[]}) {
    try {
      const {data} = await this.init().put('/admin/education/techs', {techs})
    } catch (e) {
      console.error(e)
    }
  }

  async addNewSchool(preparedData: {data: School, type: 'add' | 'edit'}) {
    try {
      const {data} = await this.init().post('/admin/education/school', preparedData)
      if (data) return data.result
    } catch (e) {
      console.error(e)
    }
  }

  async removeSchool(id: string) {
    try {
      const {data} = await this.init().delete(`/admin/education/school/${id}`)
    } catch (e) {
      console.error(e)
    }
  }

  async removeTech(id: string) {
    try {
      const {data} = await this.init().delete(`/admin/education/techs/${id}`)
    } catch (e) {
      console.error(e)
    }
  }

  async removeCourse(id: string) {
    try {
      const {data} = await this.init().delete(`/admin/education/courses/${id}`)
    } catch (e) {
      console.error(e)
    }
  }

  //
  // async getConfig(): Promise<any> {
  //   const {data} = await this.init().get('/config')
  //   return data
  // }
}
