import { useState, useEffect } from "react"
import { fetchUser } from "app/utils"

function useUser(uid) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let isCurrent = true
    fetchUser(uid).then(user => {
      if (!isCurrent) return
      setUser(user)
    })
    return () => (isCurrent = false)
  }, [uid])

  return user
}

export default useUser
