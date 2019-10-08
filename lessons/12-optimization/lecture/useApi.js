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

//////

function Avatar({ uid }) {
  const getUsers = useCallback(() => api.users.getUser(uid), [uid])
  const user = useApi(getUsers)

  return <div />
}
