import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"

const RemoveButton = ({ children, onRemove }) => {
  return (
    <button type="button" onClick={onRemove}>
      {children}
    </button>
  )
}

const UserProfile = () => {
  return (
    <div>
      hello: Brad
      <RemoveButton
        onRemove={() => {
          console.log("the remove was clicked")
        }}
      >
        Remove User
      </RemoveButton>
    </div>
  )
}

ReactDOM.render(<UserProfile />, document.getElementById("root"))
