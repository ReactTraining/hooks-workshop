import React, { useState, useEffect, useRef } from "react"

// function takesALongTime(iterations) {
//   let i
//   for (i = 0; i < iterations; i++) {}
//   return i
// }

// function App() {
//   const [count, setCount] = useState(0)
//   const [uid] = useState(1)

//   const onRemoveUser = useCallback(() => {
//     console.log(`remove user ${uid}`)
//   }, [uid])

//   return (
//     <div>
//       <button onClick={() => setCount(count + 1)}>Count ({count})</button>
//       <hr />
//       <UserProfile uid={uid} onRemoveUser={onRemoveUser} />
//     </div>
//   )
// }

// const UserProfile = React.memo(({ uid, onRemoveUser }) => {
//   console.log("RENDER USER PROFILE")
//   useEffect(() => {
//     console.log("NETWORK CALL - LOAD USER", uid)
//   }, [uid])

//   return (
//     <h1>
//       User: {uid} <button onClick={onRemoveUser}>Remove</button>
//     </h1>
//   )
// })

function App() {
  const [count, setCount] = useState(0)
  const countRef = useRef()

  useEffect(() => {
    const id = setTimeout(() => {
      setCount(count + 1)
    }, 1000)
    countRef.current = id
    return () => {
      clearTimeout(countRef.current)
    }
  })

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count ({count})</button>
      <button
        onClick={() => {
          setTimeout(() => {
            console.log(count)
          }, 3000)
        }}
      >
        Show count
      </button>
    </div>
  )
}

export default App
