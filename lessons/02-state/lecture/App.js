import "./styles.css"
import React, { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"

function Minutes() {
  const [minutes, setMinutes] = useState(5)
  const [error, setError] = useState(null)

  return (
    <div>
      <div className="Minutes">
        <div>
          <button
            type="button"
            className="icon_button Minutes_button"
            onClick={() => {
              if (minutes <= 0) {
                setError("Oops, cant be smaller than 0")
              } else {
                setMinutes(minutes - 1)
              }
            }}
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
            onClick={() => {
              if (minutes === 5) return
              setMinutes(minutes + 1)
            }}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      {error && (
        <p>
          <marquee>🚝{error}</marquee>
        </p>
      )}
    </div>
  )
}

export default Minutes
