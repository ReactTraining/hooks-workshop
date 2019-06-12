import React from "react"
import { FaMinus, FaPlus } from "react-icons/fa"
import "./styles.css"

export default function Minutes({ date = new Date() }) {
  const minutes = 2

  return (
    <div className="Minutes">
      <div>
        <button type="button" className="icon_button Minutes_button">
          <FaMinus />
        </button>
      </div>
      <input className="Minutes_input" value={minutes} id="minutes" />
      <div>
        <button type="button" className="icon_button Minutes_button">
          <FaPlus />
        </button>
      </div>
      <label className="Minutes_label" htmlFor="minutes">
        Minutes
      </label>
    </div>
  )
}
