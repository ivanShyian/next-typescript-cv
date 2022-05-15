import * as type from '../types'

const initialState = {
  about: {}
}

const updateAbout = (state = initialState, action: {type: string, payload?: any}) => {
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

export default updateAbout