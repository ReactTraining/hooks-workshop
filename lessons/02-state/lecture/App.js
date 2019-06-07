import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaMinus, FaPlus } from "react-icons/fa"

// Fake React
const states = []
let calls = -1

function useState(defaultState) {
  const call = ++calls

  const existingState = states[call]
  if (existingState) {
    return existingState
  }

  function setState(newState) {
    states[call][0] = newState
    fakeRender()
  }

  const state = [defaultState, setState]
  states[call] = state
  return state
}

function fakeRender() {
  calls = -1
  ReactDOM.render(<Minutes />, document.getElementById("root"))
}

///////

export default function Minutes() {
  const [minutes, setMinutes] = useState(5)
  const [error, setError] = useState(null)

  function subtractMinutes() {
    if (minutes <= 0) {
      setError("Cannot be negative")
      return
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
            type="button"
            className="icon_button Minutes_button"
            onClick={subtractMinutes}
          >
            <FaMinus />
          </button>
        </div>
        <div className="Minutes_label" htmlFor="minutes">
          {minutes} Minutes
        </div>
        <div>
          <button
            type="button"
            className="icon_button Minutes_button"
            onClick={addMinutes}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div>
        {error && (
          <center>
            {error} <button onClick={() => setError(null)}>Dismiss</button>
          </center>
        )}
      </div>
    </div>
  )
}
