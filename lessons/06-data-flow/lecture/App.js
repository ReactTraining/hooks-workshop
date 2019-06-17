import React, { useState, useContext } from "react"

const DB = [
  { id: 1, name: "Brad" },
  { id: 2, name: "Ryan" },
  { id: 3, name: "Nathan" },
  { id: 6, name: "Ethan" }
]

const AppContext = React.createContext()

function App() {
  const [users, setUsers] = useState(DB)

  function onRemoveUser(id) {
    setUsers([{ id: 1, name: "Brad" }])
  }

  return (
    <AppContext.Provider
      value={{
        onRemoveUser
      }}
    >
      <div>
        <h1>Our User List</h1>
        <hr />
        <div>
          {users.map(user => {
            return <BrowseUserItem key={user.id} {...user} />
          })}
        </div>
      </div>
    </AppContext.Provider>
  )
}

function BrowseUserItem({ name, id }) {
  const { onRemoveUser } = useContext(AppContext)

  return (
    <div>
      {name}{" "}
      <RemoveButton onClick={() => onRemoveUser(id)}>Remove User</RemoveButton>
    </div>
  )
}

function RemoveButton({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>
}

export default App
