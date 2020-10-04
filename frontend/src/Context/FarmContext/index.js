import React, { createContext, useReducer, useEffect } from 'react'
import { FarmReducer } from '../reducers/FarmReducer'

export const FarmContext = createContext()

const FarmContextProvider = (props) => {
  const initialState = {
    farms: {},
    ponds: {},
    errors: {},
  }
  const [state, dispatch] = useReducer(FarmReducer, [], () => {
    const localState = localStorage.getItem('state')
    return localState ? JSON.parse(localState) : initialState
  })

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state))
  }, [state])

  return (
    <FarmContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FarmContext.Provider>
  )
}

export default FarmContextProvider
