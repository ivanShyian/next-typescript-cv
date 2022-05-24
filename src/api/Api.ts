import {AxiosInstance, AxiosRequestHeaders} from 'axios'
import axios from 'axios'
import objectToFormData from '@/utils/objectToFormData'
import {getCookie} from 'cookies-next'
import {AboutInterface} from '@/models/About'
import {EducationInterface, School, Techs} from '@/models/Education'
import {Update, WorkInterface} from '@/models/Work'
import {ConfigInterface} from '@/models/Config'
import {Project} from '@/models/Project'
import {Email} from '@/models/index'

export default class Api {
  api_token: null | string
  api_url: string | undefined
  client: null | AxiosInstance
  constructor() {
    this.api_token = null
    this.client = null
    this.api_url = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT
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
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async getConfig(): Promise<ConfigInterface | undefined> {
    try {
      const {data} = await this.init().get('/config')
      if (data) return data.config
      throw Error('Config loading error')
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async getAbout(): Promise<AboutInterface | undefined> {
    try {
      const {data} = await this.init().get('/about')
      if (data) return data.about
      throw Error('About loading error')
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async getEducation(): Promise<EducationInterface | undefined> {
    try {
      const {data} = await this.init().get('/education')
      if (data) return data.education
      throw Error('Education loading error')
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async getWork(): Promise<WorkInterface[] | undefined> {
    try {
      const {data} = await this.init().get('/work')
      if (data) return data.work
      throw Error('Work loading error')
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async changeConfig(preparedData: ConfigInterface): Promise<{result: ConfigInterface} | undefined> {
    const d = objectToFormData(preparedData)
    console.log(d)
    try {
      const {data} = await this.init().put('/admin/config', d, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'multipart/form-data',
        }
      })
      if (data) return data
      throw Error('Config changing error')
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async changeAbout(preparedData: AboutInterface): Promise<void> {
    try {
      const {data} = await this.init().put('/admin/about', preparedData)
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async addTechs(techs: Techs[]): Promise<any> {
    try {
      const {data} = await this.init().post('/admin/education/techs', {techs})
      if (data) return data.result
      else throw new Error('Something going wrong...')
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async extendTechs(techs: Techs[]): Promise<void> {
    try {
      const {data} = await this.init().put('/admin/education/techs', {techs})
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async addNewSchool(preparedData: {data: School, type: 'add' | 'edit'}): Promise<any> {
    try {
      const {data} = await this.init().post('/admin/education/school', preparedData)
      if (data) return data.result
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async removeSchool(id: string): Promise<void> {
    try {
      const {data} = await this.init().delete(`/admin/education/school/${id}`)
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async removeTech(id: string): Promise<void> {
    try {
      const {data} = await this.init().delete(`/admin/education/techs/${id}`)
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async removeCourse(id: string): Promise<void> {
    try {
      const {data} = await this.init().delete(`/admin/education/courses/${id}`)
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async addNewWork(preparedData: WorkInterface): Promise<{result: WorkInterface} | undefined> {
    try {
      const {data} = await this.init().post('/admin/work', objectToFormData(preparedData), {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'multipart/form-data',
        }
      })
      if (!data) throw Error('Work wasn\'t added')
      return data
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }


  async updateWork(preparedData: Update): Promise<{result: WorkInterface} | undefined> {
    try {
      const {data} = await this.init().put('/admin/work', objectToFormData(preparedData), {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'multipart/form-data',
        }
      })
      if (!data) throw Error('Work wasn\'t added')
      return data
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async removeWork(id: string): Promise<void> {
    try {
      const {data} = await this.init().delete(`/admin/work/${id}`)
    }
    catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async getProjectList(): Promise<any> {
    try {
      const {data} = await this.init().get('/projects')
      if (data) return data.projects
      throw Error('No projects')
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async getProjectById(id: string): Promise<{project: Project} | undefined> {
    try {
      const {data} = await this.init().get(`/projects/${id}`)
      if (data) return data
      throw Error('Project not found')
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }
  
  async addProject(preparedData: Project & {'fileToUpload[]'?: File[]}): Promise<{result: Project} | undefined> {
    try {
      const {data} = await this.init().post('/admin/project', objectToFormData(preparedData), {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'multipart/form-data',
        }
      })
      if (!data) throw Error('Something went wrong')
      return data
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async updateProject(preparedData: Project & {'fileToUpload[]'?: File[]}): Promise<{result: Project} | undefined> {
    try {
      const {data} = await this.init().put('/admin/project', objectToFormData(preparedData), {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'multipart/form-data',
        }
      })
      if (!data) throw Error('Something went wrong')
      return data
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async deleteProject(projectId: string): Promise<void> {
    try {
      const {data} = await this.init().delete(`/admin/project/${projectId}`)
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async sendEmail(email: Email): Promise<{result: string} | undefined> {
    try {
      const {data} = await this.init().post('/email', email)
      if (!data) throw Error('Something went wrong')
      return data
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }
}
