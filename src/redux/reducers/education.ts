import * as type from '../types'
import {Techs} from '@/models/Education'

const initialState = {
  education: {},
  techList: []
}

const updateEducation = (state = initialState, action: {type: string, payload?: any}) => {
  switch (action.type) {
    case type.SET_EDUCATION:
      return {
        ...state,
        education: action.payload
      }
    case type.SET_COURSE_NAMES:
      return {
        ...state,
        techList: action.payload.techs.map((tech: Techs) => ({
          name: tech.name,
          id: tech._id
        }))
      }
      default:
      return state
  }
}

export default updateEducation