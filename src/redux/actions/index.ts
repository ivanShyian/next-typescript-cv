import * as type from '../types'

export const setConfig = (payload: any) => ({type: type.SET_CONFIG, payload})
export const setAbout = (payload: any) => ({type: type.SET_ABOUT, payload})
export const setEducation = (payload: any) => ({type: type.SET_EDUCATION, payload})