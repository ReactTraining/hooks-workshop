import React, { useState, useEffect, useContext } from "react"

const DB = [
  { id: 1, name: "Brad" },
  { id: 2, name: "Nathan" },
  { id: 3, name: "Ryan" },
  { id: 4, name: "Ethan" }
]

function getUsers() {
  return Promise.resolve(DB)
}

/////////

const AppContext = React.createContext()

function App() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    getUsers().then(users => {
      setUsers(users)
    })
  }, [])

  function onRemoveUser(uid) {
    console.log(uid)
  }

  return (
    <AppContext.Provider
      value={{
        onRemoveUser
      }}
    >
      <div>
        <h1>Welcome to our app</h1>
        <hr />
        {Array.isArray(users) &&
          users.map(user => {
            return (
              <BrowseUserItem key={user.id} name={user.name} uid={user.id} />
            )
          })}
      </div>
    </AppContext.Provider>
  )
}

function BrowseUserItem({ name, uid }) {
  const { onRemoveUser } = useContext(AppContext)
  return (
    <div>
      Name: {name}
      <RemoveButton
        onClick={() => {
          onRemoveUser(uid)
        }}
      >
        RemoveUser
      </RemoveButton>
    </div>
  )
}

function RemoveButton({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>
}

export default App
