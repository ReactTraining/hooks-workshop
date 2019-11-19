import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaMinus, FaPlus } from "react-icons/fa"

// npm start lecture
// 2

// I am React

let callCount = -1
const states = []

function useState(initialState) {
  const id = ++callCount

  if (states[id]) return states[id]

  const setValue = newValue => {
    states[id][0] = newValue
    renderPhonyHooks()
  }

  const tuplé = [initialState, setValue]
  states.push(tuplé)
  return tuplé
}

export default function Minutes() {
  const [minutes, setMinutes] = useState(5)
  const [error, setError] = useState(null)
  console.log(states)

  const add = () => {
    setMinutes(minutes + 1)
    setError(null)
  }

  const subtract = () => {
    if (minutes > 1) {
      setMinutes(minutes - 1)
    } else {
      setError("Greater than 0 pleeeease!!")
    }
  }

  return (
    <>
      <div className="Minutes">
        <div>
          <button
            type="button"
            className="icon_button Minutes_button"
            onClick={subtract}
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
            onClick={add}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      {error && (
        <marquee>
          <div style={{ color: "red" }}>{error}</div>
          <button
            onClick={() => {
              setError(null)
            }}
          >
            Dismiss
          </button>
        </marquee>
      )}
    </>
  )
}

function renderPhonyHooks() {
  callCount = -1
  ReactDOM.render(
    <Minutes />,
    document.getElementById("root")
  )
}

renderPhonyHooks()
