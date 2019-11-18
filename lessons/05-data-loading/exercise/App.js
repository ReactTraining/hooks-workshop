import React, { useState, useEffect } from 'react'

import { onAuthStateChanged } from 'app/utils'
import LoggedIn from 'app/LoggedIn'
import LoggedOut from 'app/LoggedOut'

export default function App() {
  const [auth, setAuth] = useState(null)
  const [authAttempted, setAuthAttempted] = useState(false)

  useEffect(() => {
    const cleanup = onAuthStateChanged(data => {
      setAuthAttempted(true)
      setAuth(data)
    })

    return () => {
      cleanup()
    }
  }, [])

  if (!authAttempted) {
    return <p>Authenticating...</p>
  }

  return (
    <div className="Layout">
      {auth ? <LoggedIn auth={auth} /> : <LoggedOut />}
    </div>
  )
}
