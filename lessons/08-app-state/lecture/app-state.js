import React, { createContext, useReducer, useContext } from "react"

const Context = createContext()

export function AppStateProvider({ reducer, initialState = {}, children }) {
  const stateAndDispatch = useReducer(reducer, initialState)
  return <Context.Provider value={stateAndDispatch} children={children} />
}

export function useAppState() {
  return useContext(Context)
}
