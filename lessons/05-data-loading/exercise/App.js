import React, { useState, useEffect } from "react"
import LoggedIn from "app/LoggedIn"
import LoggedOut from "app/LoggedOut"
import { onAuthStateChanged } from "app/utils"

export default function App() {
  const auth = null
  const authAttempted = false

  if (!authAttempted) return null

  return (
    <div className="Layout">
      {auth ? <LoggedIn auth={auth} /> : <LoggedOut />}
    </div>
  )
}
