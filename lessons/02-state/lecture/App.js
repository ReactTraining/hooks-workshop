import "./styles.css"
import React, { useState } from "react"
// import ReactDOM from "react-dom"
import { FaMinus, FaPlus } from "react-icons/fa"

// const states = []
// let calls = -1

// function useState(value) {
//   const callId = ++calls

//   if (states[callId]) {
//     return states[callId]
//   }

//   function setState(newState) {
//     states[callId][0] = newState
//     fakeReRender()
//   }

//   const state = [value, setState]
//   states[callId] = state
//   return state
// }

// function fakeReRender() {
//   calls = -1
//   ReactDOM.render(<Minutes />, document.getElementById("root"))
// }

function Minutes() {
  const [minutes, setMinutes] = useState(5)
  const [error, setError] = useState(null)

  function subtract() {
    const newMinutes = minutes - 1
    setMinutes(newMinutes)
    if (newMinutes < 0) {
      setError("Minutes cannot be smaller than 0")
    }
  }

  function add() {
    setMinutes(minutes + 1)
  }

  const output = (
    <div>
      <div className="Minutes">
        <div>
          <button
            onClick={subtract}
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
            onClick={add}
            type="button"
            className="icon_button Minutes_button"
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <p>{error}</p>
    </div>
  )

  console.log(output)
  return output
}

export default Minutes
