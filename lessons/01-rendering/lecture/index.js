import "app/App.css"
import "app/index.css"
import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaTrash } from "react-icons/fa"

function Button({ children }) {
  return <button type="button">{children}</button>
}

function App() {
  return (
    <div>
      <Button>
        <FaTrash /> Remove user
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
