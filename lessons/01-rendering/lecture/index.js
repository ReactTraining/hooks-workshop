import "app/App.css"
import "app/index.css"
import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaTrash } from "react-icons/fa"

function Button({ children }) {
  return (
    <button class="special-credit-karma" type="button">
      {children}
    </button>
  )
}

const element = (
  <div>
    <Button>
      <FaTrash />
      Remove
    </Button>
  </div>
)

ReactDOM.render(element, document.getElementById("root"))
