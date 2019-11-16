import React, { useState, useCallback } from "react"

function App({ id }) {
  const [count, setCount] = useState(0)

  const removeUser = useCallback(() => {
    console.log("remove user")
  }, [])

  return (
    <div>
      <UserProfile id={5} onRemoveUser={removeUser} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  )
}

const UserProfile = React.memo(({ id }) => {
  console.log("this was rendered")
  return <div>brad</div>
})

export default App
