import React, { useState, useCallback } from "react"

function App() {
  const [count, setCount] = useState(0)

  const removeUser = useCallback(uid => {}, [])

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Counter: {count}</button>
      <UserProfile uid={5} onRemoveUser={removeUser} />
    </div>
  )
}

const UserProfile = React.memo(({ uid, onRemoveUser }) => {
  console.log("How many times was this rendered")
  return <div>{uid}</div>
})

export default App

// function useApi(api) {
//   const [results, setResults] = useState(null)

//   useEffect(() => {
//     let isCurrent = true
//     api().then(results => {
//       if (isCurrent) {
//         setResults(results)
//       }
//     })
//     return () => (isCurrent = false)
//   }, [api])

//   return { results }
// }

// ////////

// import api from "./utils/api"

// function UserProfile({ uid }) {
//   const getUser = useCallback(() => api.users.getUser(uid), [uid])

//   const { results } = useApi(getUser)
// }
