import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"

function Button(props) {
  function handleClick() {
    console.log("The button was clicked")
  }

  return (
    <button onClick={handleClick} className="yale-button" type="button">
      {props.children}
    </button>
  )
}

function App() {
  return (
    <div>
      <Button>Click Me</Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
