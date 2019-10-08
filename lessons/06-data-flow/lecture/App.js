import React, { useState, useEffect, useContext } from "react"

const DB = [
  { id: 1, name: "Brad", occupation: "Web" },
  { id: 2, name: "Nick", occupation: "Tattoo Artist" },
  { id: 3, name: "Jessica", occupation: "Scientist" }
]

function getUsers() {
  return new Promise((resolve, reject) => {
    resolve(DB)
  })
}

////////////////

const AppContext = React.createContext()

export function AppStateProvider({ children }) {
  const [whatever, setWhatever] = useState()

  function removeUser(id) {
    console.log(id)
  }

  return (
    <AppContext.Provider
      value={{
        removeUser,
        whatever,
        setWhatever
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppState() {
  return useContext(AppContext)
}

///////

function App() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    getUsers().then(users => {
      setUsers(users)
    })
  }, [])

  return (
    <AppStateProvider>
      <div>
        {Array.isArray(users) &&
          users.map(user => (
            <BrowseUserItem key={user.id} id={user.id} name={user.name} />
          ))}
      </div>
    </AppStateProvider>
  )
}

////////////////

import { useAppState } from "path"

function BrowseUserItem({ id, onRemove, name }) {
  const { removeUser } = useAppState()
  return (
    <div>
      Name: {name}{" "}
      <Button
        onClick={() => {
          removeUser(id)
        }}
      />
    </div>
  )
}

////////////////

function Button({ onClick }) {
  return <button onClick={onClick}>Remove User</button>
}

export default App
