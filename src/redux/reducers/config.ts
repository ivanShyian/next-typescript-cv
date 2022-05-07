import * as type from '../types'

const initialState = {
  config: {}
}

const updateConfig = (state = initialState, action: {type: string, payload?: any}) => {
  switch (action.type) {
    case type.SET_CONFIG:
      return {
        ...state,
        config: action.payload
      }
    default:
      return state
  }
}

export default updateConfig