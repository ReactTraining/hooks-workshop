import React, { createContext, useReducer, useContext } from "react"

const Context = createContext()

export function AppStateProvider({ reducer, initialState = {}, children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <Context.Provider value={[state, dispatch]} children={children} />
}

export function useAppState() {
  return useContext(Context)
}
