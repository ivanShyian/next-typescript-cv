import * as type from '../types'
import {Techs} from '@/models/Experience'

const initialState = {
  education: {},
  techList: []
}

const updateConfig = (state = initialState, action: {type: string, payload?: any}) => {
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

export default updateConfig