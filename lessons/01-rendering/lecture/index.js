import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaTrash } from "react-icons/fa"

function Button({ children }) {
  function handleClick() {
    console.log("hey, I was clicked")
  }

  return <button onClick={handleClick}>{}</button>
}

function App() {
  return (
    <div className="app">
      <header>Indeed</header>
      <hr />
      <Button>
        <span>
          <FaTrash /> Remove
        </span>
      </Button>
      <Button />
      <Calendar />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
