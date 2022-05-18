import * as type from '../types'

const initialState = {
  projectList: [],
  project: {}
}

const updateProjects = (state = initialState, action: {type: string, payload?: any}) => {
  switch (action.type) {
    case type.SET_PROJECTS:
      return {
        ...state,
        projectList: action.payload
      }
    case type.ADD_PROJECT:
      return {
        ...state,
        project: action.payload
      }
    default:
      return state
  }
}

export default updateProjects