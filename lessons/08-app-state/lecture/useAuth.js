import { useEffect } from "react"
import { onAuthStateChanged } from "app/utils"
import { useAppState } from "app/app-state"

export default function useAuth() {
  const [state, dispatch] = useAppState()
  const { auth, authAttempted } = state

  useEffect(() => {
    if (!authAttempted) {
      return onAuthStateChanged(auth => {
        dispatch({ type: "AUTH_CHANGE", auth })
      })
    }
  }, [authAttempted, dispatch])

  return { auth, authAttempted }
}
