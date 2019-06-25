import "./styles.css"
import React, { useState } from "react"
import ReactDOM from "react-dom"
import { FaMinus, FaPlus } from "react-icons/fa"

// // cache
// const states = []
// let calls = -1

// function useState(defaultState) {
//   const call = ++calls

//   const existing = states[call]
//   if (existing) {
//     console.log("existing", states)
//     return states[call]
//   }

//   function setState(newState) {
//     states[call][0] = newState
//     render()
//   }

//   const state = [defaultState, setState]
//   states[call] = state

//   console.log("new", states)
//   return state
// }

// function render() {
//   calls = -1
//   ReactDOM.render(<Minutes />, document.getElementById("root"))
// }

function Minutes() {
  const [minutes, setMinutes] = useState(5)

  function subtractMinutes() {
    setMinutes(minutes - 1)
  }

  function addMinutes() {
    setMinutes(minutes + 1)
  }

  return (
    <div className="Minutes">
      <div>
        <button
          onClick={subtractMinutes}
          type="button"
          className="icon_button Minutes_button"
        >
          <FaMinus />
        </button>
      </div>
      <div className="Minutes_label" htmlFor="minutes">
        {minutes} Minutes
      </div>
      <div>
        <button
          onClick={addMinutes}
          type="button"
          className="icon_button Minutes_button"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  )
}

export default Minutes
