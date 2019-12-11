import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaMinus, FaPlus } from "react-icons/fa"

// I AM REACT
// let el = Minutes(props)
// let domTable = {}

// createDOM(el, domTable) // virtual DOM

// let oldEl = el

// el = Minutes(props)

// const diff = compare(oldEl, el)

// commit(diff)

let callCount = -1
let states = []

function useState(initialValue) {
  const id = ++callCount
  if (states[id]) return states[id]

  const setValue = newValue => {
    states[id][0] = newValue
    renderPhonyHooks()
  }

  const tuplé = [initialValue, setValue]
  states.push(tuplé)
  return tuplé
}

export default function Minutes() {
  const [minutes, setMinutes] = useState(5)
  const [error, setError] = useState(null)

  const add = () => {
    setMinutes(minutes + 1)
    setError(null)
  }
  const subtract = () => {
    if (minutes > 1) {
      setMinutes(minutes - 1)
    } else {
      setError("Greater than 0 pleeeease")
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
