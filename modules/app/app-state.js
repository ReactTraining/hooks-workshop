import React, { createContext, useReducer, useContext } from "react"

const Context = createContext()

export function AppStateProvider({ reducer, initialState = {}, children }) {
  const value = useReducer(reducer, initialState)
  return <Context.Provider value={value} children={children} />
}

export function useAppState() {
  return useContext(Context)
}
