import React, { useState, useEffect } from "react"
import getUsers from "./getUsers"

function App() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    getUsers().then(setUsers)
  })

  function onRemoveUser(id) {
    console.log(`${id} was removed`)
  }

  return (
    <div>
      <h1>App</h1>
      <div className="users">
        {Array.isArray(users) &&
          users.map(user => {
            return (
              <BrowseUserItem
                key={user.id}
                id={user.id}
                name={user.name}
                onRemoveUser={onRemoveUser}
              />
            )
          })}
      </div>
    </div>
  )
}

function BrowseUserItem({ id, name, onRemoveUser }) {
  return (
    <div>
      <span>Name: {name}</span>
      <ConfirmRemove
        onClick={() => {
          onRemoveUser(id)
        }}
      />
    </div>
  )
}

function ConfirmRemove({ onClick }) {
  return <button onClick={onClick}>Remove User</button>
}

export default App
