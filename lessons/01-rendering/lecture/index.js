import "app/App.css"
import "app/index.css"
import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaTrash } from "react-icons/fa"

function Button({ children }) {
  function handleClick() {
    console.log("click")
  }

  return (
    <button type="button" className="kneat-button" onClick={handleClick}>
      {children}
    </button>
  )
}

function App() {
  return (
    <div>
      <Button>
        <FaTrash />
        Remove User
      </Button>
      <Button></Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
