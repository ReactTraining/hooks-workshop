import "./styles.css"
import React, { useState } from "react"
import ReactDOM from "react-dom"
import { FaMinus, FaPlus } from "react-icons/fa"

// const states = []
// let calls = -1

// function useState(defaultState) {
//   const call = ++calls

//   if (states[call]) {
//     return states[call]
//   }

//   function setState(newState) {
//     states[call][0] = newState
//     fakeRender()
//   }

//   const state = [defaultState, setState]
//   states[call] = state
//   return state
// }

// function fakeRender() {
//   calls = -1
//   ReactDOM.render(<Minutes />, document.getElementById("root"))
// }

export default function Minutes() {
  const [minutes, setMinutes] = useState(0)
  const [error, setError] = useState(null)

  console.log(minutes, error)

  function subtractMinutes() {
    if (minutes - 1 < 0) {
      setError("Minutes cant be smaller than 0")
    }
    setMinutes(minutes - 1)
  }

  function addMinutes() {
    setMinutes(minutes + 1)
  }

  return (
    <div>
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
      <p>{error}</p>
    </div>
  )
}
