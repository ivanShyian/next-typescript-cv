import * as type from '../types'

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