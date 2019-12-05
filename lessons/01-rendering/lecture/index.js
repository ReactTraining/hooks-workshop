import "app/App.css"
import "app/index.css"
import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaTrash } from "react-icons/fa"

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="adobe-button" type="button">
      {children}
    </button>
  )
}

function App() {
  function handleClick() {}

  return (
    <div>
      <h1>App</h1>
      <Button onClick={handleClick}>
        <FaTrash />
        Remove User
      </Button>

      <Button></Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
