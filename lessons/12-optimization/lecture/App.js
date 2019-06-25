import React, { useState, useEffect, useRef } from "react"

function App() {
  const [count, setCount] = useState(0)
  const countRef = useRef()

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count ({count})</button>
    </div>
  )
}

export default App
