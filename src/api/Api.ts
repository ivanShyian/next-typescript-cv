import {AxiosInstance, AxiosRequestHeaders} from 'axios'
import axios from 'axios'
import {getCookie} from 'cookies-next'
import FormData from 'form-data'
import {AboutInterface} from '@/models/About'

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
    const {data} = await this.init().post('/login', dataObj)
    return data
  }

  async getConfig(): Promise<any> {
    const {data} = await this.init().get('/config')
    return data
  }

  async getAbout(): Promise<any> {
    const {data} = await this.init().get('/about')
    console.log({data})
    return data
  }

  async getEducation(): Promise<any> {
    const {data} = await this.init().get('/education')
    console.log({data})
    return data
  }

  async changeConfig(formData: FormData): Promise<void> {
    const {data} = await this.init().put('/admin/config', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'multipart/form-data',
      }
    })
  }

  async changeAbout(preparedData: AboutInterface): Promise<void> {
    const {data} = await this.init().put('/admin/about', preparedData)
  }
  //
  // async getConfig(): Promise<any> {
  //   const {data} = await this.init().get('/config')
  //   return data
  // }
}
