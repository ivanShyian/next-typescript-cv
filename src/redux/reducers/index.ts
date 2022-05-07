import {combineReducers} from 'redux'
import config from './config'
import {HYDRATE} from 'next-redux-wrapper'

const combinedReducer = combineReducers({
  config
})

const reducer = (state: any, action: {type: string, payload?: any}) => {
  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
  } else {
    return combinedReducer(state, action)
  }
}



export default reducer