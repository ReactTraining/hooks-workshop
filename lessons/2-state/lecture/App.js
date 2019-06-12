import "./styles.css"
import React, { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"

/**********************************************************/
// We can render with values put into variables:

export default function Minutes() {
  const minutes = 5
  return (
    <div className="Minutes">
      <div>
        <button type="button" className="icon_button Minutes_button">
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
  )
}

// /**********************************************************/
// We can make that value stateful by introducing useState. When we click the
// buttons react calls `Minutes()` again, compares the element we returned last
// time with the element we've returned this time. React is tracking the old
// and new elements for us, as well as the current state. When it finds a
// difference between the old and new element, it updates the DOM with the
// minimal set of changes required and leaves the rest alone. We can watch it
// in the browser dev tools.

// export default function Minutes() {
//   const [minutes, setMinutes] = useState(5)

//   const handleAdd = () => setMinutes(minutes + 1)
//   const handleSubtract = () => setMinutes(minutes - 1)

//   return (
//     <div className="Minutes">
//       <div>
//         <button
//           onClick={handleSubtract}
//           type="button" className="icon_button Minutes_button">
//           <FaMinus />
//         </button>
//       </div>
//       <div className="Minutes_label" htmlFor="minutes">
//         {minutes} Minutes
//       </div>
//       <div>
//         <button
//           onClick={handleAdd}
//           type="button" className="icon_button Minutes_button">
//           <FaPlus />
//         </button>
//       </div>
//     </div>
//   )
// }

/**********************************************************/
// We get to decide when to change state and when not to,
// maybe we only want values 1 through 9.

// export default function Minutes() {
//   const [minutes, setMinutes] = useState(5)

//   const handleAdd = () =>{
//     if (minutes < 9) {
//       setMinutes(minutes + 1)
//     }
//   }

//   const handleSubtract = () => {
//     if (minutes > 1) {
//       setMinutes(minutes - 1)
//     }
//   }

//   return (
//     <div className="Minutes">
//       <div>
//         <button
//           onClick={handleSubtract}
//           type="button" className="icon_button Minutes_button">
//           <FaMinus />
//         </button>
//       </div>
//       <div className="Minutes_label" htmlFor="minutes">
//         {minutes} Minutes
//       </div>
//       <div>
//         <button
//           onClick={handleAdd}
//           type="button" className="icon_button Minutes_button">
//           <FaPlus />
//         </button>
//       </div>
//     </div>
//   )
// }

/**********************************************************/
// We can add multiple states, like an error state when they try to use an
// invalid value. You can use && like an "if" inside of JSX

// export default function Minutes() {
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
//       <div style={{ textAlign: 'center' }}>
//         {error && (
//           <p>
//             {error}{" "}
//             <span role="img" aria-label="yikes">
//               😬
//             </span>
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }

/**********************************************************/
// Multiple elements can change the same state, here we can close
// the error message by clicking a button inside it.

// export default function Minutes() {
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
//       <div style={{ textAlign: 'center' }}>
//         {error && (
//           <p>
//             {error}{" "}
//             <span role="img" aria-label="eep!">
//               😬
//             </span><br/>
//             <button onClick={() => setError(null)}>dismiss</button>
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }

