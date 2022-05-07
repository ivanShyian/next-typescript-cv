import {useMemo} from 'react'
import {createStore, applyMiddleware, Store} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'
import {createWrapper} from 'next-redux-wrapper'

let store: Store | undefined

function initStore(initialState: any) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the redux, and create a new redux
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    })
    // Reset the current redux
    store = undefined
  }

  // For SSG and SSR always create a new redux
  if (typeof window === 'undefined') return _store
  // Create the redux once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState: any) {
  return useMemo(() => initializeStore(initialState), [initialState])
}

export const wrapper = createWrapper(initStore)