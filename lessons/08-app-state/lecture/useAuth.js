import { useState, useEffect } from "react"
import { onAuthStateChanged } from "app/utils"
import { useAppState } from "app/app-state"

export default function useAuth() {
  // const [authAttempted, setAuthAttempted] = useState(false)
  // const [auth, setAuth] = useState(null)

  const [state, dispatch] = useAppState()
  const { authAttempted, auth } = state

  useEffect(() => {
    return onAuthStateChanged(auth => {
      if (auth) {
        dispatch({ type: "AUTH_CHANGE", auth })
      } else {
        dispatch({ type: "AUTH_CHANGE", auth: null })
      }
    })
  }, [dispatch])

  return { auth, authAttempted }
}
