import React, { useState, useReducer } from "react"
import { signup } from "app/utils"
import TabsButton from "app/TabsButton"
import { FaDumbbell } from "react-icons/fa"
import { DateFields, MonthField, DayField, YearField } from "app/DateFields"
import TextInput from "app/TextInput"

/******************************************************************************/
// 1. [open useAuth.js]

/******************************************************************************/
// 3. If you've used Redux before, you might be thinking that this kind of
// state belongs there. Heck yes, except now the principles of redux are built
// in to React, but in more composable way. Let's take a look.

export default function SignupForm() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState(new Date("March 1, 2019"))

  const handleSignup = async event => {
    event.preventDefault()
    setLoading(true)
    const [displayName, photoURL, email, password] = event.target.elements
    try {
      await signup({
        displayName: displayName.value,
        email: email.value,
        password: password.value,
        photoURL: photoURL.value,
        startDate
      })
    } catch (error) {
      setLoading(false)
      setError(error)
    }
  }

  return (
    <div>
      {error && (
        <div>
          <p>Oops, there was an error logging you in.</p>
          <p>
            <i>{error.message}</i>
          </p>
        </div>
      )}

      <form onSubmit={handleSignup}>
        <TextInput id="displayName" label="Display Name" />
        <TextInput id="photoURL" label="Avatar URL" />
        <TextInput id="email" label="Email" />
        <TextInput id="password" label="Password" type="password" />
        <p>
          <span aria-hidden="true">Start:</span>{" "}
          <DateFields value={startDate} onChange={setStartDate}>
            <MonthField aria-label="Start Month" /> /{" "}
            <DayField aria-label="Start Day" /> /{" "}
            <YearField start={2018} end={2019} aria-label="Start year" />
          </DateFields>
        </p>
        <TabsButton>
          <FaDumbbell />
          <span>{loading ? "Loading..." : "Sign Up"}</span>
        </TabsButton>
      </form>
    </div>
  )
}

/******************************************************************************/
// 4. When we've got multiple pieces of state, we can use a reducer to co-locate
//    all the changes to it, rather than using a bunch of `useState`s

// export default function SignupForm() {
//   const [state, dispatch] = useReducer(
//     (state, action) => {
//       switch (action.type) {
//         case "SIGNING_UP":
//           return { ...state, loading: true }
//         case "SIGNUP_ERROR":
//           return { ...state, error: action.error, loading: false }
//         case "UPDATE_DATE":
//           return { ...state, startDate: action.date }
//         default: {
//         }
//       }
//     },
//     {
//       error: null,
//       loading: false,
//       startDate: new Date("March 1, 2019")
//     }
//   )

//   const { startDate, error, loading } = state

//   const handleSignup = async event => {
//     event.preventDefault()
//     dispatch({ type: "SIGNING_UP" })
//     const [displayName, photoURL, email, password] = event.target.elements
//     try {
//       await signup({
//         displayName: displayName.value,
//         email: email.value,
//         password: password.value,
//         photoURL: photoURL.value,
//         startDate
//       })
//     } catch (error) {
//       dispatch({ type: "SIGNUP_ERROR", error })
//     }
//   }

//   return (
//     <div>
//       {error && (
//         <div>
//           <p>Oops, there was an error logging you in.</p>
//           <p>
//             <i>{error.message}</i>
//           </p>
//         </div>
//       )}

//       <form onSubmit={handleSignup}>
//         <TextInput id="displayName" label="Display Name" />
//         <TextInput id="photoURL" label="Avatar URL" />
//         <TextInput id="email" label="Email" />
//         <TextInput id="password" label="Password" type="password" />
//         <p>
//           <span aria-hidden="true">Start:</span>{" "}
//           <DateFields
//             value={startDate}
//             onChange={date => dispatch({ type: "UPDATE_DATE", date })}
//           >
//             <MonthField aria-label="Start Month" /> /{" "}
//             <DayField aria-label="Start Day" /> /{" "}
//             <YearField start={2018} end={2019} aria-label="Start year" />
//           </DateFields>
//         </p>
//         <TabsButton>
//           <FaDumbbell />
//           <span>{loading ? "Loading..." : "Sign Up"}</span>
//         </TabsButton>
//       </form>
//     </div>
//   )
// }

/******************************************************************************/
// 5. Pretty nice, having all those state changes happening in one place instead
//    of spread out all over the component.
//
//    Okay, so back to redux. What if we wanted to handle things like the auth
//    workflow, and fetching the user, or any other data, with a reducer like
//    this? It's an appealing design.
//
//    What if we combined what we've learned about useReducer and context?
//
//    [Review app/App.js, app/app-state.js]
//
//    [Open useAuth.js]
