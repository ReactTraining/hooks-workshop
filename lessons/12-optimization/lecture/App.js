function useApi(api, depArray) {
  const [response, setResponse] = useState(null)

  useEffect(() => {
    let isCurrent = true
    api().then(response => {
      if (isCurrent) {
        setResponse(response)
      }
    })
    return () => (isCurrent = false)
  }, [api])

  return [response]
}

function App({ uid }) {
  const getUser = useCallback(() => api.users.getUser(uid), [uid])
  const [user] = useApi(getUser)

  return <div>{user && user.name}</div>
}
