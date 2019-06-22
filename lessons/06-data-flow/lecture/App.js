import React, { useState, useContext } from "react"

const DB = [
  { id: 1, name: "Brad" },
  { id: 2, name: "Nathan" },
  { id: 3, name: "Ryan" },
  { id: 4, name: "Ethan" }
]

const OurContext = React.createContext()

function App() {
  const [users, setUsers] = useState(DB)

  function onUserRemove() {
    setSomeState()
  }

  return (
    <OurContext.Provider
      value={{
        onUserRemove
      }}
    >
      <div>
        {users.map(user => {
          return <BrowseUserItem key={user.id} user={user} />
        })}
      </div>
    </OurContext.Provider>
  )
}

function BrowseUserItem({ user }) {
  return (
    <div>
      Name: {user.name} <ConfirmRemove>Remove User</ConfirmRemove>
    </div>
  )
}

function ConfirmRemove({ children, onRemove }) {
  const { onUserRemove } = useContext(OurContext)

  return <button onClick={onUserRemove}>{children}</button>
}

export default App
