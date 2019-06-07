import React, { useState, useEffect, useContext } from "react"

const DB = [
  { id: 1, name: "Brad" },
  { id: 2, name: "Nathan" },
  { id: 3, name: "Ryan" },
  { id: 4, name: "Ethan" },
  { id: 5, name: "Jess" }
]

function fetchUsers() {
  return Promise.resolve(DB)
}

const AppContext = React.createContext()

function App() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    fetchUsers().then(users => {
      setUsers(users)
    })
  }, [])

  function handleRemove(id) {
    console.log("remove user", id)
  }

  return (
    <AppContext.Provider value={{ handleRemove }}>
      <div>
        {Array.isArray(users) &&
          users.map((u, i) => {
            return <BrowseUserItem key={i} user={u} />
          })}
      </div>
    </AppContext.Provider>
  )
}

function BrowseUserItem({ user }) {
  const { handleRemove } = useContext(AppContext)

  return (
    <div>
      Name: {user.name}
      <ConfirmRemoveButton onClick={() => handleRemove(user.id)} />
    </div>
  )
}

function ConfirmRemoveButton({ onClick }) {
  const [confirming, setConfirming] = useState(false)

  const handleClick = () => {
    if (confirming) {
      onClick()
    } else {
      setConfirming(true)
    }
  }

  return (
    <button onClick={handleClick}>
      {confirming ? "Are you sure!" : "Remove"}
    </button>
  )
}

export default App
