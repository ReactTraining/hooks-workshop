import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaTrash } from "react-icons/fa"

function Button(props) {
  function handleClick() {
    console.log("button was clicked")
  }
  return (
    <button className="submit" onClick={handleClick}>
      {props.children}
    </button>
  )
}

function App() {
  return (
    <div>
      <Button>
        <FaTrash />
        Remove
      </Button>
      <Button>Submit</Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
