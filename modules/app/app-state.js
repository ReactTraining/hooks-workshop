import React, { createContext, useReducer, useContext } from "react"
import appReducer, { initialState } from "app/appReducer"

const Context = createContext()

export function AppStateProvider({ children }) {
  const value = useReducer(appReducer, initialState)
  return <Context.Provider value={value} children={children} />
}

export function useAppState() {
  return useContext(Context)
}
