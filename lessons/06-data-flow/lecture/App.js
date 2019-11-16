import React, { useState, useEffect, useContext } from "react"

const DB = [
  { id: 1, name: "Brad", occupation: "Web" },
  { id: 2, name: "Nick", occupation: "Tattoo Artist" },
  { id: 3, name: "Jessica", occupation: "Scientist" }
]

function fetchUsers() {
  return Promise.resolve(DB)
}

/////////////////

const AppContext = React.createContext()

export function AppProvider({ children }) {
  function removeUser(id) {
    console.log(id)
  }

  return (
    <AppContext.Provider value={{ removeUser }}>{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}

///////////

function App() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    fetchUsers().then(function(users) {
      setUsers(users)
    })
  }, [])

  return (
    <AppProvider>
      {!Array.isArray(users) && <span>Loading</span>}

      {Array.isArray(users) &&
        users.map(function(user) {
          return <BrowseUserItem key={user.id} id={user.id} name={user.name} />
        })}
    </AppProvider>
  )
}

///////

function BrowseUserItem({ id, name }) {
  const { removeUser } = useAppContext()

  return (
    <div>
      <div>
        Name: {name}{" "}
        <RemoveButton
          onClick={() => {
            onRemoveUser(id)
          }}
        />
      </div>
    </div>
  )
}

///////

function RemoveButton({ onClick }) {
  return <button onClick={onClick}>Remove User</button>
}

export default App
