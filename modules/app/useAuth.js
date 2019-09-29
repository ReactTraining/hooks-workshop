import { useEffect } from "react"
import { onAuthStateChanged } from "./utils"
import { useAppState } from "./app-state"

export default function useAuth() {
  const [{ authAttempted, auth }, dispatch] = useAppState()

  useEffect(() => {
    return onAuthStateChanged(auth => {
      if (auth) {
        const { displayName, photoURL, uid } = auth
        dispatch({
          type: "AUTH_CHANGE",
          auth: { displayName, photoURL, uid }
        })
      } else {
        dispatch({ type: "AUTH_CHANGE", auth: null })
      }
    })
  }, [dispatch])

  return { authAttempted, auth }
}
