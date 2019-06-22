import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"

/**********************************************************/
// We like React because:
//
// 1. It's declarative (what)      imperative (how)
// 2. It's composable

function RemoveButton({ children }) {
  return <button type="button">{children}</button>
}

function App() {
  return (
    <div>
      <RemoveButton>
        <span>[x] Remove User</span>
      </RemoveButton>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
