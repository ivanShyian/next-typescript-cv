import * as type from '../types'

const initialState = {
  education: {}
}

const updateConfig = (state = initialState, action: {type: string, payload?: any}) => {
  switch (action.type) {
    case type.SET_EDUCATION:
      return {
        ...state,
        education: action.payload
      }
    default:
      return state
  }
}

export default updateConfig