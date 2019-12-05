import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaMinus, FaPlus } from "react-icons/fa"

const states = []
let calls = -1

function useState(value) {
  const call = ++calls

  if (states[call]) {
    return states[call]
  }

  function setState(newValue) {
    states[call][0] = newValue
    reRender()
  }

  const state = [value, setState]
  states[call] = state
  return state
}

function reRender() {
  calls = -1
  ReactDOM.render(<Minutes />, document.getElementById("root"))
}

function Minutes() {
  const [minutes, setMinutes] = useState(5)
  const [error, setError] = useState(null)

  function subtractMinutes() {
    const newMinutes = minutes - 1
    setMinutes(newMinutes)
    if (newMinutes <= 0) {
      setError("Minutes cannot be less than 1")
    }
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
          <button type="button" className="icon_button Minutes_button">
            <FaPlus />
          </button>
        </div>
      </div>
      <p>{error}</p>
    </div>
  )
}

export default Minutes
