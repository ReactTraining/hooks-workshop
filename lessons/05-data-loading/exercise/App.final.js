import React, { useState, useEffect } from "react"
import LoggedIn from "app/LoggedIn"
import LoggedOut from "app/LoggedOut"
import { onAuthStateChanged } from "app/utils"

function useAuth() {
  const [authAttempted, setAuthAttempted] = useState(false)
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth => {
      setAuthAttempted(true)
      setAuth(auth)
    })
  }, [])

  return { auth, authAttempted }
}

export default function App() {
  const { auth, authAttempted } = useAuth()
  if (!authAttempted) return null
  return (
    <div className="Layout">
      {auth ? <LoggedIn auth={auth} /> : <LoggedOut />}
    </div>
  )
}
