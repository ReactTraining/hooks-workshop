import React, {
  createContext,
  useReducer,
  useContext
} from "react"

const Context = createContext()

export function AppStateProvider({
  reducer,
  initialState = {},
  children
}) {
  const value = useReducer(reducer, initialState)
  // [state, dispatch]

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export function useAppState() {
  return useContext(Context) // [state, dispatch]
}
