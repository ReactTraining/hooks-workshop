import "./styles.css"
import React, { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"

// const states = []
// let calls = -1

// // called twice
// function useState(defaultState) {
//   const call = ++calls

//   function setState(newState) {
//     states[call][0] = newState
//     React.reRender()
//     calls = -1
//   }
//   const state = [defaultState, setState]
//   states[call] = state
//   return state
// }

export default function Minutes() {
  const [minutes, setMinutes] = useState(10)
  const [error, setError] = useState(null)

  function subMinutes() {
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
      <div>{error}</div>
    </div>
  )
}
