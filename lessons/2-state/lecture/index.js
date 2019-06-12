import "app/index.css"
import "app/App.css"
import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
// import { FaMinus, FaPlus } from "react-icons/fa"
import App from "app/App"

ReactDOM.render(<App />, document.getElementById("root"))

/******************************************************************************/
// Let's make our own hooks :O

// function Minutes() {
//   const [minutes, setMinutes] = useState(5)
//   const [error, setError] = useState(null)

//   const handleAdd = () => {
//     if (minutes < 9) {
//       setMinutes(minutes + 1)
//       setError(null)
//     } else {
//       setError("Less than 10 please.")
//     }
//   }

//   const handleSubtract = () => {
//     if (minutes > 1) {
//       setMinutes(minutes - 1)
//       setError(null)
//     } else {
//       setError("Greater than 0 please")
//     }
//   }

//   return (
//     <div>
//       <div className="Minutes">
//         <div>
//           <button
//             onClick={handleSubtract}
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
//             onClick={handleAdd}
//             type="button"
//             className="icon_button Minutes_button"
//           >
//             <FaPlus />
//           </button>
//         </div>
//       </div>
//       <div style={{ textAlign: "center" }}>
//         {error && (
//           <p>
//             {error}{" "}
//             <span role="img" aria-label="eep!">
//               😬
//             </span>
//             <br />
//             <button onClick={() => setError(null)}>dismiss</button>
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }

// const states = []
// let calls = -1

// function useState(defaultValue) {
//   const callId = ++calls
//   const existing = states[callId]

//   if (existing) {
//     return existing
//   }

//   function setValue(newValue) {
//     states[callId][0] = newValue
//     render()
//   }

//   const state = [defaultValue, setValue]
//   states[callId] = state
//   return state
// }

// function render() {
//   calls = -1
//   ReactDOM.render(<Minutes />, document.getElementById("root"))
// }

// render()
