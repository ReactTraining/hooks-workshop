import "app/App.css"
import "app/index.css"
import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaPlus, FaMinus } from "react-icons/fa"

// npm start lecture
// 1

// const reactEl = <div>Helllooooo</div>

const Button = props => {
  return (
    <button
      className="button"
      onKeyDown={event => {
        if (event.key === " ") {
          props.onKeyboardTap("hi there")
        }
      }}
      onClick={() => {
        props.onClick("something!")
      }}
    >
      {props.children}
    </button>
  )
}

const domEl = document.getElementById("root")

ReactDOM.render(
  <div>
    <Button
      onKeyboardTap={someVariable => {
        console.log(someVariable)
      }}
      onClick={someVariable => {
        console.log(someVariable)
      }}
    >
      <FaPlus /> Add
    </Button>
    <Button
      onKeyboardTap={() => {
        console.log("MINUS!")
      }}
    >
      <FaMinus /> Minus
    </Button>
  </div>,
  domEl
)
