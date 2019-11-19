import { useState, useEffect } from "react"
import { onAuthStateChanged } from "app/utils"
import { useAppState } from "app/app-state"

export default function useAuth() {
  const [state, dispatch] = useAppState()
  const { authAttempted, auth } = state

  // const [authAttempted, setAuthAttempted] = useState(false)
  // const [auth, setAuth] = useState(null)

  useEffect(() => {
    return onAuthStateChanged(auth => {
      dispatch({ type: "AUTH_CHANGE", auth })
    })
  }, [])

  return { auth, authAttempted }
}
