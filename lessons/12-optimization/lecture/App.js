import React, { useState, useEffect, useCallback } from "react"

function fetchUser() {}

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

  return [results]
}

function App({ uid }) {
  const getUser = useCallback(() => api.users.getUser(uid), [uid])
  const [user] = useApi(getUser)

  return <div />
}

export default App
