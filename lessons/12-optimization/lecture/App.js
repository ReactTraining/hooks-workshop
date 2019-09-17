import React, { useState, useEffect, useCallback } from "react"

const App = () => {
  const [count, setCount] = useState(0)

  const someFunction = useCallback(() => {}, [])

  return (
    <div>
      <UserProfile userId={5} onRemove={someFunction} />
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Count: ({count})
      </button>
    </div>
  )
}

const UserProfile = React.memo(({ userId }) => {
  console.log("Render User Profile")

  useEffect(() => {
    console.log("get the user")
  }, [userId])

  return <div>User</div>
})

export default App

// function useApi(api) {
//   const [results, setResults] = useState(null)
//   const [loading, setLoading] = useState(false)
//   useEffect(() => {
//     let isCurrent = true
//     setLoading(true)
//     api().then(results => {
//       if (isCurrent) {
//         setLoading(false)
//         setResults(results)
//       }
//     })
//     return () => {
//       isCurrent = false
//     }
//   }, [api])
//   return { results, loading }
// }

// function UserProfile({ uid }) {

//   const getUser = useCallback(() => api.users.getUser(uid), [uid])
//   const user = useApi(getUser)

//   // .....
// }
