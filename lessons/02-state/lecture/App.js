import "./styles.css"
import React, { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"

export default function Minutes() {
  const [minutes, setMinutes] = useState(9)

  function handleSubtractMinutes() {
    setMinutes(minutes - 1)
  }

  function handleAddMinutes() {
    setMinutes(minutes + 1)
  }

  return (
    <div className="Minutes">
      <div>
        <button
          onClick={handleSubtractMinutes}
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
          onClick={handleAddMinutes}
          type="button"
          className="icon_button Minutes_button"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  )
}
