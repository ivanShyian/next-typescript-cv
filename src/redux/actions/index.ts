import * as type from '../types'
import {ProjectListItem, Project} from '@/models/Project'
import {WorkInterface} from '@/models/Work'

export const setConfig = (payload: any) => ({type: type.SET_CONFIG, payload})
export const setAbout = (payload: any) => ({type: type.SET_ABOUT, payload})

export const setEducationData = (payload: any) => ({type: type.SET_EDUCATION, payload})
export const setCourseNames = (payload: any) => ({type: type.SET_COURSE_NAMES, payload})
export const setEducation = (payload: any): any => {
  return (dispatch: any) => {
    dispatch(setEducationData(payload))
    dispatch(setCourseNames(payload))
  }
}

export const setWork = (payload: WorkInterface[]) => ({type: type.SET_WORK, payload})

export const setProjects = (payload: ProjectListItem[]) => ({type: type.SET_PROJECTS, payload})
export const addProject = (payload: Project | {}) => ({type: type.ADD_PROJECT, payload})