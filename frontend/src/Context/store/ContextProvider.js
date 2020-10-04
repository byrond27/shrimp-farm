import React, { useReducer, useEffect, createContext } from 'react'

export const Context = createContext()

const ContextProvider = (props) => {
  const initialState = {
    farms: {},
    ponds: {},
    errors: {},
  }
  const localState = JSON.parse(localStorage.getItem('localState'))
  const [state, dispatch] = useReducer(localState || initialState)

  useEffect(() => {}, [])

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider
