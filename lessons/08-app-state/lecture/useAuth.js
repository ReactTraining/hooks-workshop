import { useEffect } from "react"
import { onAuthStateChanged } from "app/utils"
import { useAppState } from "app/app-state"

export default function useAuth() {
  // const [authAttempted, setAuthAttempted] = useState(false)
  // const [auth, setAuth] = useState(null)
  const [{ authAttempted, auth }, dispatch] = useAppState()

  useEffect(() => {
    return onAuthStateChanged(auth => {
      // setAuthAttempted(true)
      // setAuth(auth)
      dispatch({ type: "AUTH_CHANGE", auth })
    })
  }, [])

  return { auth, authAttempted }
}
