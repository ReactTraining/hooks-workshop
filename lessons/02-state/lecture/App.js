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

//   function setState(newValue) {
//     states[callId][0] = newValue
//     fakeRender()
//   }

//   const state = [value, setState]
//   states[callId] = state
//   return state
// }

// function fakeRender() {
//   calls = -1
//   ReactDOM.render(<Minutes />, document.getElementById("root"))
// }

export default function Minutes() {
  const [minutes, setMinutes] = useState(5)
  const [error, setError] = useState(null)

  function subMinutes() {
    const newMinutes = minutes - 1
    setMinutes(newMinutes)
    if (newMinutes < 1) {
      setError("Cannot be smaller than 1")
    }
  }

  function addMinutes() {
    setMinutes(minutes + 1)
  }

  const output = (
    <div>
      <div className="Minutes">
        <div>
          <button
            onClick={subMinutes}
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
      {error && <p>{error}</p>}
    </div>
  )
  console.log(output)
  return output
}
