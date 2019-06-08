import React, { useState, useCallback, useMemo } from "react"

// const longRunningFunction = len => {
//   for (let i = 0; i < len; i++) {}
//   return "thing"
// }

const UserProfile = React.memo(({ user }) => {
  console.log("User Profile Render", user)

  return <div>User Profile: {user}</div>
})

const App = () => {
  const [user, setUser] = useState(1)

  // Memoizes the function (the callback) itself
  const removeUser = useCallback(uid => {
    console.log("Remove User")
  }, [])

  return (
    <div>
      <button onClick={() => setUser(1)}>One</button>
      <button onClick={() => setUser(2)}>Two</button>
      <UserProfile user={user} />
    </div>
  )
}

export default App
