import {combineReducers} from 'redux'
import config from './config'
import about from './about'
import education from './education'
import work from './work'
import projects from './projects'
import {HYDRATE} from 'next-redux-wrapper'

const combinedReducer = combineReducers({
  config,
  about,
  education,
  work,
  projects
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