import "app/App.css"
import "app/index.css"
import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaPlus, FaMinus } from "react-icons/fa"

// const reactElement = React.createElement(
//   "button",
//   { className: "button" },
//   "+ ",
//   text
// )

let text = "Add"

const Button = props => {
  return (
    <button
      className="button"
      onKeyDown={event => {
        if (event.key === "Enter") {
          props.fish()
        }
      }}
    >
      {props.children}
    </button>
  )
}

// <Button>
//   {el}
//   {el2}
//   {stuff.map(() => { element3and4 })}
// </Button>

// React.createElement(Button, {}, el1, el2, [element3and4])

// React.createElement(Button, { children: [el1, el2, el3, el4] } )

const domElement = document.getElementById("root")

ReactDOM.render(
  <div>
    <Button
      fish={() => {
        console.log("clicked!")
      }}
    >
      <FaPlus /> Add
    </Button>
    <Button>
      <FaMinus /> Subtract
    </Button>
  </div>,
  domElement
)
