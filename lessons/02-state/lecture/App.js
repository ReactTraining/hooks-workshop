import "./styles.css"
import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import { FaMinus, FaPlus } from "react-icons/fa"

const stateCache = []
let calls = -1

function useState(value) {
  const callId = ++calls

  if (stateCache[callId]) {
    return stateCache[callId]
  }

  function setState(newValue) {
    stateCache[callId][0] = newValue
    reRender()
  }

  const state = [value, setState]
  stateCache[callId] = state
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
    if (newMinutes < 0) {
      setError("Minutes cannot be less than 0")
    }
  }

  function addMinutes() {
    const newMinutes = minutes + 1
    setMinutes(newMinutes)
    if (newMinutes >= 0) {
      setError(null)
    }
  }

  const output = (
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
      {error && (
        <Fragment>
          <span>🚝{error}</span>
          <button onClick={() => setError(null)}>Clear Error</button>
        </Fragment>
      )}
    </div>
  )

  console.log(output)
  return output
}

export default Minutes
