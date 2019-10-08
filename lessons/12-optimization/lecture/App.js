import React, { useState, useCallback } from "react"

function App() {
  const [count, setCount] = useState(0)

  function someCallback() {}

  return (
    <div>
      <UserProfile uid={5} onRemoveUser={someCallback} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  )
}

const UserProfile = ({ uid, onRemoveUser }) => {
  console.log("When does this rerender")

  return (
    <div>
      <button onClick={onRemoveUser}>sdfsdfs</button>
    </div>
  )
}

export default App
