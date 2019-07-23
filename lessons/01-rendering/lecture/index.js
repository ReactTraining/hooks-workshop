import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"

function App() {
  const welcome = "Hello"

  return (
    <div>
      <header>header</header>
      <h1>{welcome}</h1>

      <hr />
      <footer>footer</footer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
