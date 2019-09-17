import React, { useState, useEffect, useContext } from "react"

const DB = [
  { id: 1, name: "Brad" },
  { id: 2, name: "Nathan" },
  { id: 3, name: "Ryan" }
]

function getUsers() {
  return Promise.resolve(DB)
}


////// /AppContext
const AppContext = React.createContext()

export function AppProvider({ children }) {
  function onRemoveUser(id) {
    console.log(id)
  }

  return (
    <AppContext.Provider value={{
      onRemoveUser
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}




///////
import { AppProvider } from './AppProvider'

function App() {
  return (
    <ShoppingProvider>
      <AppProvider>
        <div>
          <BrowseUsers />
        </div>
      </AppProvider>
    </ShoppingProvider>
  )
}

export default App

///////

function BrowseUsers() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    getUsers().then(users => {
      setUsers(users)
    })
  }, [])

  return (
    <div>
      {!Array.isArray(users) && <span>Loading...</span>}
      {Array.isArray(users) &&
        users.map(user => {
          return <BrowseUserItem key={user.id} {...user} />
        })}
    </div>
  )
}

////////
import { useAppContext } from './AppContext'

function BrowseUserItem({ id, name }) {
  const { onRemoveUser } = useAppContext()

  return (
    <div>
      User: {name}
      <RemoveButton
        id={id}
        onRemove={() => {
          onRemoveUser(id)
        }}
      />
    </div>
  )
}

function RemoveButton({ onRemove }) {
  return (
    <button type="button" onClick={onRemove}>
      Remove User
    </button>
  )
}

export default App
