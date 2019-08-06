import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"

function RemoveButton(props) {
  return (
    <button onClick={props.onClick} type="button" className="button remove">
      Remove
    </button>
  )
}

function App() {
  function handleClick() {
    console.log("click")
  }

  return (
    <div className="app">
      <header />
      <hr />
      <main>
        <RemoveButton onClick={handleClick} />
        <RemoveButton onClick={handleClick} />
        <RemoveButton onClick={handleClick} />
        <RemoveButton onClick={handleClick} />
      </main>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
