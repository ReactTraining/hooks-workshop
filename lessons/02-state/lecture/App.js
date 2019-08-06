import "./styles.css"
import React, { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"

export default function Minutes() {
  const [minutes, setMinutes] = useState(1)
  const [error, setError] = useState(null)

  const output = (
    <div>
      <div className="Minutes">
        <div>
          <button
            onClick={() => {
              const newMinutes = minutes - 1
              setMinutes(newMinutes)
              if (newMinutes <= 0) {
                setError("Too small")
              }
            }}
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
              setMinutes(minutes + 1)
            }}
            type="button"
            className="icon_button Minutes_button"
          >
            <FaPlus />
          </button>
        </div>
      </div>
      {error && (
        <div>
          <center>
            {error}
            <button
              onClick={() => {
                setError(null)
              }}
            >
              Clear
            </button>
          </center>
        </div>
      )}
    </div>
  )

  console.log(output)
  return output
}
