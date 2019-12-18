import { useState, useEffect } from "react"
import api from "./api"

function App({ uid }) {
  const getUser = useCallback(() => api.users.getUser(uid), [uid])
  const user = useApi(getUser)

  return <div>Name: {user.name}</div>
}

////////

function useApi(api) {
  const [results, setResults] = useState(null)
  useEffect(() => {
    let isCurrent = true
    api().then(results => {
      if (isCurrent) {
        setResults(results)
      }
    })
    return () => {
      isCurrent = false
    }
  }, [api])

  return results
}

export default useUser
