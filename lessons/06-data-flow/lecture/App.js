import React, { useState, useEffect, useContext } from "react"

const DB = [
  { id: 1, name: "Brad", age: 36 },
  { id: 2, name: "Nathan", age: 2 },
  { id: 3, name: "Ryan", age: 2 }
]

function getUsers() {
  return Promise.resolve(DB)
}

/////// UserProvider.js

const UserContext = React.createContext()

function UserProvider({ children }) {
  function onRemoveUser(id) {
    console.log("User was removed: ", id)
  }

  return (
    <UserContext.Provider
      value={{
        onRemoveUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}

////////////////

function App() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    getUsers().then(users => {
      setUsers(users)
    })
  }, [])

  return (
    <UserProvider>
      <div>
        {Array.isArray(users) &&
          users.map(user => {
            return <BrowseUserItem key={user.id} {...user} />
          })}
      </div>
    </UserProvider>
  )
}

export default App

/////////
// import { useUserContext } from "./UserProvider"

function BrowseUserItem({ id, name, age }) {
  const { onRemoveUser } = useUserContext()

  return (
    <div>
      User: {name}, age: {age}
      <RemoveButton onClick={() => onRemoveUser(id)} />
    </div>
  )
}

////////

function RemoveButton({ onClick }) {
  return <button onClick={onClick}>Remove</button>
}
