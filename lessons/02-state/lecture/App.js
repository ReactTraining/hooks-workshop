import "./styles.css"
import React, { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"

// const states = []
// let calls = -1

// function useState(defaultState) {
//   const callId = ++calls

//   if (states[callId]) {
//     return states[callId]
//   }

//   function setState(newState) {
//     states[callId][0] = newState
//     fakeRender()
//   }

//   const state = [defaultState, setState]
//   states[callId] = state
//   return state
// }

// function fakeRender() {
//   calls = -1
//   ReactDOM.render(<Minutes />, document.getElementById("root"))
// }

// function Minutes() {
//   const [minutes, setMinutes] = useState(5)
//   const [error, setError] = useState(null)

//   const output = (
//     <div>
//       <div className="Minutes">
//         <div>
//           <button
//             onClick={() => {
//               const newMinutes = minutes - 1
//               setMinutes(newMinutes)
//               if (newMinutes < 0) {
//                 setError("Cannot be less than zero")
//               }
//             }}
//             type="button"
//             className="icon_button Minutes_button"
//           >
//             <FaMinus />
//           </button>
//         </div>
//         <div className="Minutes_label" htmlFor="minutes">
//           {minutes} Minutes
//         </div>
//         <div>
//           <button
//             onClick={() => {
//               setMinutes(minutes + 1)
//             }}
//             type="button"
//             className="icon_button Minutes_button"
//           >
//             <FaPlus />
//           </button>
//         </div>
//       </div>
//       {error && (
//         <center>
//           {error}
//           <button
//             onClick={() => {
//               setError(null)
//             }}
//           >
//             Hide Error
//           </button>
//         </center>
//       )}
//     </div>
//   )
//   console.log(output)
//   return output
// }

class Minutes extends React.Component {
  constructor() {
    super()
    this.state = {
      minutes: 5,
      error: null
    }
  }

  subtractMinutes = () => {
    const minutes = this.state.minutes
    const newMinutes = minutes - 1
    this.setState({
      minutes: newMinutes
    })
    if (newMinutes < 0) {
      this.setState({
        error: "Cannot be less than zero"
      })
    }
  }

  render() {
    const minutes = this.state.minutes
    const error = this.state.error

    return (
      <div>
        <div className="Minutes">
          <div>
            <button
              onClick={this.subtractMinutes}
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
        {error && <center>{error}</center>}
      </div>
    )
  }
}

export default Minutes
