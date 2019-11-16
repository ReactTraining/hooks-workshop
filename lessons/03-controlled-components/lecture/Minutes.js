import React, { useState } from "react"
import { format as formatDate } from "date-fns"
import { FaMinus, FaPlus } from "react-icons/fa"

export default function Minutes({ date }) {
  const [minutes, setMinutes] = useState(5)

  function subtract() {
    setMinutes(minutes - 1)
  }

  function handleChange(event) {
    setMinutes(event.target.value)
  }

  return (
    <div className="Minutes">
      <div>
        <button
          onClick={subtract}
          type="button"
          className="icon_button Minutes_button"
        >
          <FaMinus />
        </button>
      </div>
      <input
        className="Minutes_input"
        defaultValue={0}
        value={minutes}
        onChange={handleChange}
        id="minutes"
      />
      <div>
        <button type="button" className="icon_button Minutes_button">
          <FaPlus />
        </button>
      </div>
      <label className="Minutes_label" htmlFor="minutes">
        Mins on {formatDate(date, "MMM Do")}
      </label>
    </div>
  )
}
