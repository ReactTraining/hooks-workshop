function useApi(api) {
  const [results, setResults] = useState(null)

  useEffect(() => {
    let isCurrent = true
    api().then(results => {
      if (isCurrent) {
        setResults(results)
      }
    })
    return () => (isCurrent = false)
  }, [api])

  return results
}

//////

// import api from "./api"
// import useApi from "./utils"

function UserProfile({ uid }) {
  const getUser = useApi(() => api.users.getUser(uid), [uid])
  const user = usePromise(getUser)
}
