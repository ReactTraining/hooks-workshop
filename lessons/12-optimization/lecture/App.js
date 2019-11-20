import React, { useState, useCallback } from "react"

function App() {
  const [count, setCount] = useState(0)

  const addToShoppingCart = useCallback(() => {
    console.log("here")
  }, [])

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <UserProfile uid={5} onAddToCart={addToShoppingCart} />
    </div>
  )
}

const UserProfile = React.memo(({ uid }) => {
  console.log("when does this get rendered")
  return <h1>Brad</h1>
})

export default App
