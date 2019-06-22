import "./styles.css"
import React, { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"

// class Minutes extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       minutes: 5,
//       name: "sdfs",
//       age: 345
//     }
//   }

//   handleButtonClick() {
//     this.setState({
//       minutes: 9
//     })
//   }

//   render() {
//     console.log("here")
//     return <div>{this.state.minutes} Minutes</div>
//   }
// }

export default function Minutes() {
  const [minutes, setMinutes] = useState(5)

  function subtractMinutes() {
    setMinutes(minutes - 1)
  }

  function addMinutes() {
    setMinutes(minutes + 1)
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
      <div className="Minutes_label" htmlFor="minutes">
        {minutes} Minutes
      </div>
      <Custom minutes={minutes} foo="fdsf" />
      <div>
        <button
          onClick={addMinutes}
          type="button"
          className="icon_button Minutes_button"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  )
}
