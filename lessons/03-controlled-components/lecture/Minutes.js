import React, { useState } from "react"
import { format as formatDate } from "date-fns"
import { FaMinus, FaPlus } from "react-icons/fa"

export default function Minutes({ date }) {
  const [minutes, setMinutes] = useState(0)
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
      <input
        className="Minutes_input"
        defaultValue={minutes}
        onChange={event => {
          setMinutes(event.target.value)
        }}
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
