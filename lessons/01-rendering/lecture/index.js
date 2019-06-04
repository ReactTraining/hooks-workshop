import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaPlus } from "react-icons/fa"

const AddButton = ({ className, children }) => {
  return (
    <button type="button" className={className}>
      <FaPlus />
      {children}
    </button>
  )
}

const App = () => {
  return (
    <div>
      <AddButton className="my-custom-button">My Button</AddButton>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
