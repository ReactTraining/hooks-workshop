import React, { useState } from "react"
import { format as formatDate } from "date-fns"
import { FaMinus, FaPlus } from "react-icons/fa"

export default function Minutes({ date }) {
  const [minutes, setMinutes] = useState(30)

  function subtractMinutes() {
    if (minutes === 0) return
    setMinutes(minutes - 1)
  }

  return (
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
      <input
        className="Minutes_input"
        value={minutes}
        onChange={e => {
          setMinutes(e.target.value)
        }}
        onKeyDown={e => {
          if (e.key === "ArrowUp") {
            setMinutes(minutes + 1)
          } else if (e.key === "ArrowDown") {
            setMinutes(minutes - 1)
          }
        }}
        id="minutes"
      />
      <div>
        <button type="button" className="icon_button Minutes_button">
          <FaPlus />
        </button>
      </div>
      <label className="Minutes_label" htmlFor="minutes">
        Mins on {formatDate(date, "MMM Do")} {minutes}
      </label>
    </div>
  )
}
