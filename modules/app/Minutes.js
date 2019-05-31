import React, { useState } from "react"
import { format as formatDate } from "date-fns"
import { FaMinus, FaPlus } from "react-icons/fa"

export default function Minutes({ date }) {
  const [minutes, setMinutes] = useState(30)

  const subtract = () => {
    if (minutes > 0) {
      setMinutes(minutes - 1)
    }
  }

  const add = () => {
    setMinutes(minutes + 1)
  }

  const handleInputChange = event => {
    const value = event.target.value
    const specialCaseEmpty = value.trim() === ""
    if (specialCaseEmpty) {
      // allow them to delete all characters
      setMinutes(value)
    } else {
      const int = parseInt(event.target.value, 10)
      // disallow non-numeric values
      if (!isNaN(int)) {
        setMinutes(int)
      }
    }
  }

  const handleInputBlur = event => {
    if (event.target.value.trim() === "") {
      setMinutes(0)
    }
  }

  const handleInputKeyDown = event => {
    // preventDefault to keep cursor from going back/forth
    if (event.key === "ArrowUp") {
      event.preventDefault()
      add()
    } else if (event.key === "ArrowDown") {
      event.preventDefault()
      subtract()
    }
  }

  return (
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
      <input
        className="Minutes_input"
        value={minutes}
        id="minutes"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
      />
      <div>
        <button
          type="button"
          className="icon_button Minutes_button"
          onClick={add}
        >
          <FaPlus />
        </button>
      </div>
      <label className="Minutes_label" htmlFor="minutes">
        Mins on {formatDate(date, "MMM Do")}
      </label>
    </div>
  )
}
