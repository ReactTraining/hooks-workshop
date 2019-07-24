import React, { useEffect, useState, useContext } from "react"

const fakeDatabase = [
  { id: 1, name: "Brad", age: 36 },
  { id: 3, name: "Ryan", age: 2 },
  { id: 6, name: "Nathan", age: 2 },
  { id: 9, name: "Ethan", age: 0.3 }
]

function fakeGetUsers() {
  return new Promise(res => {
    setTimeout(() => {
      res(fakeDatabase)
    }, 200)
  })
}

//////////////

const AppContext = React.createContext()

function AppProvider({ children }) {
  function onRemoveUser(uid) {
    console.log(uid)
  }

  return (
    <AppContext.Provider
      value={{
        onRemoveUser
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

///////

function App() {
  return (
    <AppProvider>
      <div>
        <h1>This is our app</h1>
        <hr />
        <BrowseUsers />
      </div>
    </AppProvider>
  )
}

//////////

function BrowseUsers() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    let isCurrent = true
    fakeGetUsers().then(users => {
      if (isCurrent) {
        setUsers(users)
      }
    })
    return () => {
      isCurrent = false
    }
  }, [])

  return (
    <div>
      <h4>Browse Users</h4>
      {Array.isArray(users) ? (
        users.map(user => {
          return (
            <BrowseUserItem
              key={user.id}
              uid={user.id}
              name={user.name}
              age={user.age}
            />
          )
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

//////////

import { useAppContext } from "./path/AppContext"

function BrowseUserItem({ uid, name, age }) {
  const { onRemoveUser } = useAppContext()

  return (
    <div>
      Name: {name}, Age: {age}
      <ConfirmRemove
        uid={uid}
        onClick={() => {
          onRemoveUser(uid)
        }}
      >
        Remove User
      </ConfirmRemove>
    </div>
  )
}

function ConfirmRemove({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>
}

export default App
