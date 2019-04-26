import React, { useState, useEffect } from "react"

import { onAuthStateChanged } from "app/utils"
import LoggedIn from "app/LoggedIn"
import LoggedOut from "app/LoggedOut"

function useAuth() {
  const [authAttempted, setAuthAttempted] = useState(false)
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    return onAuthStateChanged(auth => {
      setAuthAttempted(true)
      setAuth(auth)
    })
  }, [])

  return { auth, authAttempted }
}

export default function App() {
  const { auth, authAttempted } = useAuth()

  if (!authAttempted) {
    return <p>Authenticating...</p>
  }

  return (
    <div className="Layout">
      {auth ? <LoggedIn auth={auth} /> : <LoggedOut />}
    </div>
  )
}
