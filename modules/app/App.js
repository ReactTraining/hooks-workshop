import React from "react"
import LoggedIn from "app/LoggedIn"
import LoggedOut from "app/LoggedOut"
import { AppStateProvider } from "app/app-state"
import appReducer, { initialState } from "app/appReducer"
import useAuth from "app/useAuth"

function App() {
  const { authAttempted, auth } = useAuth()
  if (!authAttempted) return null
  return <div className="Layout">{auth ? <LoggedIn /> : <LoggedOut />}</div>
}

export default () => (
  <AppStateProvider reducer={appReducer} initialState={initialState}>
    <App />
  </AppStateProvider>
)
