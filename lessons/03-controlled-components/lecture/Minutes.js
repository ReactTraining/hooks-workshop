import React, { useState, Fragment } from "react"
import { format as formatDate } from "date-fns"
import { FaMinus, FaPlus } from "react-icons/fa"

export default function Minutes({ date }) {
  const [minutes, setMinutes] = useState(9)
  const [error, setError] = useState(null)

  return (
    <Fragment>
      {error && <p>{error}</p>}
      <div className="Minutes">
        <div>
          <button
            type="button"
            className="icon_button Minutes_button"
            onClick={() => {
              setMinutes(minutes - 1)
            }}
          >
            <FaMinus />
          </button>
        </div>
        <input
          className="Minutes_input"
          value={minutes}
          onChange={event => {
            setMinutes(event.target.value)
          }}
          id="minutes"
        />
        <div>
          <button
            type="button"
            className="icon_button Minutes_button"
            onClick={() => {
              setMinutes(minutes + 1)
            }}
          >
            <FaPlus />
          </button>
        </div>
        <label className="Minutes_label" htmlFor="minutes">
          Mins on {formatDate(date, "MMM Do")}
        </label>
      </div>
    </Fragment>
  )
}
