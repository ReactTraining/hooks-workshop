import React, { useState } from "react"
import { format as formatDate } from "date-fns"
import { FaMinus, FaPlus } from "react-icons/fa"

/******************************************************************************/
// When it comes to inputs, there are two types of them, "uncontrolled" and
// "controlled" inputs.
//
// The inputs on the Login/Signup components were uncontrolled, that means that
// they owned their own state, or more specifically they own their own value.
//
// In practical terms, an uncontrolled component is one whose value is changed
// exclusively by the *user interacting with it*.
//
// You can still set the initial state of an uncontrolled component with
// defaultValue (and defaultChecked).
//
// A controlled component is one that does not own its state, but rather its
// state is controlled by the component that rendered it.
//
// In practical terms it means the state is controlled exclusively by the
// *programmer*.
//
// The only time you need a controlled component is when you need to change the
// value of an input by some other means than the user interacting with it.
//
// If you need the value of a component in your state, but you don't ever set
// the value of the component with anything other than the user interacting
// with it, you can use either controlled or uncontrolled, it's the same. We
// prefer uncontrolled in these situations just to communicate intent.

/******************************************************************************/
// Let's take a look at our minutes input and see why and how we can control
// its value.  Right now the user can change the value just by typing in it.

export default function Minutes({ date }) {
  return (
    <div className="Minutes">
      <div>
        <button type="button" className="icon_button Minutes_button">
          <FaMinus />
        </button>
      </div>
      <input className="Minutes_input" defaultValue={0} id="minutes" />
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

/******************************************************************************/
// We want these two buttons to change the value of the input, but it doesn't
// work when we use defaultValue, we need to use value.
// export default function Minutes({ date }) {
//   const [minutes, setMinutes] = useState(30)
//   const handleSubtract = () => {
//     if (minutes > 0) {
//       setMinutes(minutes - 1)
//     }
//   }

//   const handleAdd = () => {
//     setMinutes(minutes + 1)
//   }

//   return (
//     <div className="Minutes">
//       <div>
//         <button
//           onClick={handleSubtract}
//           type="button"
//           className="icon_button Minutes_button"
//         >
//           <FaMinus />
//         </button>
//       </div>
//       <input
//         className="Minutes_input"
//         value={minutes}
//         id="minutes"
//       />
//       <div>
//         <button
//           type="button"
//           onClick={handleAdd}
//           className="icon_button Minutes_button"
//         >
//           <FaPlus />
//         </button>
//       </div>
//       <label className="Minutes_label" htmlFor="minutes">
//         Mins on {formatDate(date, "MMM Do")}
//       </label>
//     </div>
//   )
// }

/******************************************************************************/
// But when we use defaultValue then the user can't type into the input
// anymore. Why does that make sense? React eliminates time. It's declarative.
// What we say is what it should render.
//
// So we need to bring in `onChange` to allow the user's interactions to control
// the input. Keep in mind though, that it's still the *programmer* controlling
// the input.

// export default function Minutes({ date }) {
//   const [minutes, setMinutes] = useState(30)
//   const handleSubtract = () => {
//     if (minutes > 0) {
//       setMinutes(minutes - 1)
//     }
//   }

//   const handleAdd = () => {
//     setMinutes(minutes + 1)
//   }

//   const handleInputChange = event => {
//     setMinutes(event.target.value)
//   }

//   return (
//     <div className="Minutes">
//       <div>
//         <button
//           onClick={handleSubtract}
//           type="button"
//           className="icon_button Minutes_button"
//         >
//           <FaMinus />
//         </button>
//       </div>
//       <input
//         value={minutes}
//         onChange={handleInputChange}
//         className="Minutes_input"
//         id="minutes"
//       />
//       <div>
//         <button
//           type="button"
//           onClick={handleAdd}
//           className="icon_button Minutes_button"
//         >
//           <FaPlus />
//         </button>
//       </div>
//       <label className="Minutes_label" htmlFor="minutes">
//         Mins on {formatDate(date, "MMM Do")}
//       </label>
//     </div>
//   )
// }

/******************************************************************************/
// Another way in which we control the value is by only allowing certain inputs.
// In this case, we only want to allow integers, so we have to do a few tricks
// to make it workout.
//
// Even if we didn't have the +/- buttons, we'd still need to make this a
// controlled component when we want to only allow numbers.
//
// (Yes, we know about <input type=number>, min/max isn't supported everywhere
// so we'd still need to control it.)

// export default function Minutes({ date }) {
//   const [minutes, setMinutes] = useState(30)
//   const handleSubtract = () => {
//     if (minutes > 0) {
//       setMinutes(minutes - 1)
//     }
//   }

//   const handleAdd = () => {
//     setMinutes(minutes + 1)
//   }

//   const handleInputChange = event => {
//     const value = event.target.value
//     const specialCaseEmpty = value.trim() === ""
//     if (specialCaseEmpty) {
//       // allow them to delete all characters
//       setMinutes(value)
//     } else {
//       const int = parseInt(event.target.value, 10)
//       // disallow non-numeric values
//       if (!isNaN(int)) {
//         setMinutes(int)
//       }
//     }
//   }

//   const handleInputBlur = event => {
//     if (event.target.value.trim() === "") {
//       setMinutes(0)
//     }
//   }

//   return (
//     <div className="Minutes">
//       <div>
//         <button
//           onClick={handleSubtract}
//           type="button"
//           className="icon_button Minutes_button"
//         >
//           <FaMinus />
//         </button>
//       </div>
//       <input
//         value={minutes}
//         onChange={handleInputChange}
//         onBlur={handleInputBlur}
//         className="Minutes_input"
//         id="minutes"
//       />
//       <div>
//         <button
//           type="button"
//           onClick={handleAdd}
//           className="icon_button Minutes_button"
//         >
//           <FaPlus />
//         </button>
//       </div>
//       <label className="Minutes_label" htmlFor="minutes">
//         Mins on {formatDate(date, "MMM Do")}
//       </label>
//     </div>
//   )
// }

/******************************************************************************/
// Let's make the keyboard work inside the input just for fun

// export default function Minutes({ date }) {
//   const [minutes, setMinutes] = useState(30)
//   const handleSubtract = () => {
//     if (minutes > 0) {
//       setMinutes(minutes - 1)
//     }
//   }

//   const handleAdd = () => {
//     setMinutes(minutes + 1)
//   }

//   const handleInputChange = event => {
//     const value = event.target.value
//     const specialCaseEmpty = value.trim() === ""
//     if (specialCaseEmpty) {
//       // allow them to delete all characters
//       setMinutes(value)
//     } else {
//       const int = parseInt(event.target.value, 10)
//       // disallow non-numeric values
//       if (!isNaN(int)) {
//         setMinutes(int)
//       }
//     }
//   }

//   const handleInputBlur = event => {
//     if (event.target.value.trim() === "") {
//       setMinutes(0)
//     }
//   }

//   const handleInputKeyDown = event => {
//     // preventDefault to keep cursor from going back/forth
//     if (event.key === "ArrowUp") {
//       event.preventDefault()
//       handleAdd()
//     } else if (event.key === "ArrowDown") {
//       event.preventDefault()
//       handleSubtract()
//     }
//   }

//   return (
//     <div className="Minutes">
//       <div>
//         <button
//           onClick={handleSubtract}
//           type="button"
//           className="icon_button Minutes_button"
//         >
//           <FaMinus />
//         </button>
//       </div>
//       <input
//         value={minutes}
//         onChange={handleInputChange}
//         onBlur={handleInputBlur}
//         onKeyDown={handleInputKeyDown}
//         className="Minutes_input"
//         id="minutes"
//       />
//       <div>
//         <button
//           type="button"
//           onClick={handleAdd}
//           className="icon_button Minutes_button"
//         >
//           <FaPlus />
//         </button>
//       </div>
//       <label className="Minutes_label" htmlFor="minutes">
//         Mins on {formatDate(date, "MMM Do")}
//       </label>
//     </div>
//   )
// }
