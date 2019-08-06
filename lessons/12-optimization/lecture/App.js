import React, { useState, useMemo, useCallback } from "react"

const App = () => {
  const [count, setCount] = useState(0)

  const handleRemove = useCallback(() => handleRemove(), [])

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Count: ({count})
      </button>
      <UserProfile onRemove={handleRemove} />
    </div>
  )
}

const UserProfile = React.memo(({ handleRemove }) => {
  console.log("User Profile was called")
  return (
    <div>
      <h1>Hi Brad</h1>
      <button onClick={handleRemove}>Remove</button>
    </div>
  )
})

export default App
