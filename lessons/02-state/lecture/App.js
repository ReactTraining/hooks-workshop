import "./styles.css"
import React, { useState } from "react"
import ReactDOM from "react-dom"
import { FaMinus, FaPlus } from "react-icons/fa"

function Minutes() {
  const [minutes, setMinutes] = useState(5)

  return (
    <div className="Minutes">
      <div>
        <button
          onClick={() => {
            setMinutes(minutes - 1)
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
        <button type="button" className="icon_button Minutes_button">
          <FaPlus />
        </button>
      </div>
    </div>
  )
}

export default Minutes
