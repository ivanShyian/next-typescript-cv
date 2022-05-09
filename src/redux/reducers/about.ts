import * as type from '../types'

const initialState = {
  about: {}
}

const updateConfig = (state = initialState, action: {type: string, payload?: any}) => {
  switch (action.type) {
    case type.SET_ABOUT:
      return {
        ...state,
        about: action.payload
      }
    default:
      return state
  }
}

export default updateConfig