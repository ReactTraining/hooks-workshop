import "@reach/tabs/styles.css"
import "@reach/dialog/styles.css"
import "@reach/menu-button/styles.css"
import "app/App.css"
import "app/shims"
import React from "react"
import ReactDOM from "react-dom"
import "app/index.css"
import App from "app/App"

// allow lessons to do their own rendering
if (App) {
  ReactDOM.render(<App />, document.getElementById("root"))
}
