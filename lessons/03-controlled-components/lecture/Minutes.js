import React, { useState } from "react"
import { format as formatDate } from "date-fns"
import { FaMinus, FaPlus } from "react-icons/fa"

export default function Minutes({ date }) {
  const [minutes, setMinutes] = useState(30)

  function subtractMinutes() {
    setMinutes(minutes - 1)
  }

  function addMinutes() {
    setMinutes(minutes + 1)
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      subtractMinutes()
    }
  }

  return (
    <div className="Minutes">
      <div>
        <button
          type="button"
          className="icon_button Minutes_button"
          onClick={subtractMinutes}
        >
          <FaMinus />
        </button>
      </div>
      <input
        className="Minutes_input"
        value={minutes}
        onChange={e => setMinutes(e.target.value)}
        onKeyDown={handleKeyDown}
        id="minutes"
      />
      <div>
        <button
          type="button"
          className="icon_button Minutes_button"
          onClick={addMinutes}
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
