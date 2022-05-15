import * as type from '../types'

const initialState = {
  work: {}
}

const updateWork = (state = initialState, action: {type: string, payload?: any}) => {
  switch (action.type) {
    case type.SET_WORK:
      return {
        ...state,
        work: action.payload
      }
    default:
      return state
  }
}

export default updateWork