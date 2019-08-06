function useApi(api) {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isCurrent = true
    setLoading(true)
    api.then(res => {
      if (!isCurrent) return
      setResponse(res)
      setLoading(false)
    })
    return () => (isCurrent = false)
  }, [api])

  return [response, loading]
}

function UserProfile({ uid }) {
  const getUser = useCallback(() => api.users.getUser(uid), [uid])
  const [response, loading] = useApi(getUser)

  return <div />
}
