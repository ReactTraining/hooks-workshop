import "app/App.css"
import "app/index.css"
import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaTrash } from "react-icons/fa"

function RemoveButton({ children }) {
  return <button>{children}</button>
}

function App() {
  return (
    <div>
      <RemoveButton>
        <FaTrash />
        Remove
      </RemoveButton>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
