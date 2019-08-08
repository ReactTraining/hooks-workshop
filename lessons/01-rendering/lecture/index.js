import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaTrash } from "react-icons/fa"

const RemoveButton = ({ children, inside }) => {
  return (
    <button
      onClick={function() {
        console.log("hello")
      }}
    >
      {children}
    </button>
  )
}

function App() {
  return (
    <div>
      <RemoveButton>
        <FaTrash />
        <div>Remove</div>
      </RemoveButton>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
