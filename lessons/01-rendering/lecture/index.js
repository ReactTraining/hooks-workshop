import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaTrash } from "react-icons/fa"

function Button({ children, clicky }) {
  return (
    <button onClick={clicky} className="wpost-button">
      {children}
    </button>
  )
}

function App(props) {
  function handleClick() {
    console.log("hello")
  }

  return (
    <div>
      <span>{props.workshop}</span>
      <Button clicky={handleClick}>
        <FaTrash />
        Submit
      </Button>
    </div>
  )
}

ReactDOM.render(<App workshop="W Post" />, document.getElementById("root"))
