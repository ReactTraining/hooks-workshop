import React, { useState, useEffect, useContext } from "react"

const DB = [
  { id: 1, name: "Brad", age: 36 },
  { id: 2, name: "Nathan", age: 2 },
  { id: 3, name: "Ryan", age: 2 },
  { id: 4, name: "Ethan", age: 0.3 }
]

function getUsers() {
  return Promise.resolve(DB)
}

/////////////
// appContext.js

const AppContext = React.createContext()

function AppContextProvider({ children }) {
  function onRemoveUser(uid) {
    console.log("were at the top", uid)
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

function useAppContext() {
  return useContext(AppContext)
}

////////

function App() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    getUsers().then(setUsers)
  }, [])

  return (
    <AppContextProvider>
      <div>
        <h1>App</h1>
        <div>
          {Array.isArray(users) &&
            users.map(user => {
              return (
                <BrowseUserItem
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  age={user.age}
                />
              )
            })}
        </div>
      </div>
    </AppContextProvider>
  )
}

///////////

function BrowseUserItem({ id, name, age }) {
  const { onRemoveUser } = useAppContext()
  return (
    <div>
      Name: {name}, is {age}
      <span>
        <RemoveButton onClick={() => onRemoveUser(id)}>
          Remove User
        </RemoveButton>
      </span>
    </div>
  )
}

//////////

function RemoveButton({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>
}

export default App
