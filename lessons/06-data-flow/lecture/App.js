import React, { useState, useEffect, useContext } from "react"

const DB = [
  { id: 1, name: "Brad" },
  { id: 2, name: "Ryan" },
  { id: 3, name: "Nathan" }
]

function getUsers() {
  return Promise.resolve(DB)
}

////////

const LoginContext = React.createContext()

function LoginContextProvider({ children }) {
  return (
    <LoginContext.Provider>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider

function useLoginContext() {
  return useContext(LoginContext)
}

export { useLoginContext }


///////////

function App() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    getUsers().then(users => {
      setUsers(users)
    })
  }, [])

  return (
    <StripeProvider>
      <LoginContextProvider>
        <div>
          {Array.isArray(users) &&
            users.map(user => {
              return (
                <BrowseUserItem key={user.id} id={user.id} name={user.name} />
              )
            })}
        </div>
      </LoginContextProvider>
    </StripeProvider>
  )
}

function BrowseUserItem({ id, name }) {
  const x = useLoginContext()

  return (
    <div>
      {name}
      <RemoveButton onRemove={() => onRemoveUser(id)} />
    </div>
  )
}

function RemoveButton({ onRemove }) {
  return <button onClick={onRemove}>Remove</button>
}

export default App
