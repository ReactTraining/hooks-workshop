import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaTrash } from "react-icons/fa"

function Button({ children, onClick }) {
  return (
    <button className="special-button" type="button" onClick={onClick}>
      {children}
    </button>
  )
}

function App(props) {
  return (
    <div>
      <header />
      <div>
        <Button>Remove User</Button>
      </div>
      <footer />
    </div>
  )
}

ReactDOM.render(<App name="Brad" age="89" />, document.getElementById("root"))
