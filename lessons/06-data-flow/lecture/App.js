import React, { useEffect, useState, useContext } from "react"

const DB = [
  { id: 1, name: "Brad" },
  { id: 2, name: "Nathan" },
  { id: 5, name: "Ryan" },
  { id: 7, name: "Ethan" }
]

function fetchUsers() {
  return Promise.resolve(DB)
}

// -----------

api = {
  removeUser: function() {
    return $.delete('/delete')
  }
}

const AppContext = React.createContext()

const App = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    //get: /users
    // fetchUsers().then(setUsers)
    $.get('/users').then(response => {
      // take this and play with
      setSomething(response)
    })
  }, [])

  function onRemove(id) {
    api.removeUser(id).then(() => {
      // update the state of users myself
    })
  }

  return (
    <AppContext.Provider
      value={{
        message: "hello world",
        onRemove: onRemove
      }}
    >
      <div>
        <h1>Our Userlist App</h1>
        <hr />
        {Array.isArray(users) &&
          users.map(user => {
            return <BrowseUserItem key={user.id} user={user} />
          })}
      </div>
    </AppContext.Provider>
  )
}

const BrowseUserItem = ({ user }) => {
  return (
    <div>
      Name: {user.name} <RemoveButton />
    </div>
  )
}

// this is a file

const RemoveButton = () => {
  const context = useContext(AppContext)

  return (
    <button
      onClick={() => {
        context.onRemove()
      }}
    >
      Remove
    </button>
  )
}

// this is a file

class Whatever extends React.Component {

  render() {
    <div>
      <AppContext.Consumer>
        {context => {
          return <div>{context.whaver}</div>
        }}
      <AppContext.Consumer>
    </div>
  }
}


export default App
