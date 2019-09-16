import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaMinus, FaPlus } from "react-icons/fa"

const states = []
let calls = -1

function useState(defaultState) {
  const callId = ++calls

  if (states[callId]) {
    return states[callId]
  }

  function setState(newState) {
    states[callId][0] = newState
    fakeRender()
  }

  const state = [defaultState, setState]
  states[callId] = state
  return state
}

function fakeRender() {
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
      setError("We cannot have negative minutes")
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
            onClick={() => {
              const newMinutes = minutes + 1
              setMinutes(newMinutes)
              if (newMinutes >= 0) {
                setError(null)
              }
            }}
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

export default Minutes
