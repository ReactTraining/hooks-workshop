import { useState, useEffect } from "react"
import { onAuthStateChanged } from "app/utils"
import { useAppState } from "app/app-state"

export default function useAuth() {
  const [{ authAttempted, auth }, dispatch] = useAppState()

  useEffect(() => {
    if (!auth) {
      return onAuthStateChanged(auth => {
        dispatch({ type: "AUTH_CHANGE", auth })
      })
    }
  }, [])

  return { auth, authAttempted }
}
