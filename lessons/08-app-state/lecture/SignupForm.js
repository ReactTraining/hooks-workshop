import React, { useState, useReducer } from "react"
import { signup } from "app/utils"
import TabsButton from "app/TabsButton"
import { FaDumbbell } from "react-icons/fa"
import {
  DateFields,
  MonthField,
  DayField,
  YearField
} from "app/DateFields"
import TextInput from "app/TextInput"

// npm start lecture
// 8
// SignupForm.js in 08-app-state

let array = [1, 2, 3, 4, 5]
let add = (x, y) => x + y
let sum = array.reduce(add, 0)

// 0 + 1
// 1 + 2
// 3 + 3
// 6 + 4
// 10 + 5
// 15

const initialState = { count: 0, cake: true }

const actions = [
  { type: "ADD", by: 2 },
  { type: "MINUS", by: 4 },
  { type: "EAT_CAKE" }
]

function reducer(state, action) {
  if (action.type === "ADD") {
    return { ...state, count: state.count + action.by }
  } else if (action.type === "MINUS") {
    return { ...state, count: state.count - action.by }
  } else if (action.type === "EAT_CAKE") {
    return { ...state, cake: false }
  }
}

// dispatch

console.log(actions.reduce(reducer, initialState))

export default function SignupForm() {
  const [state, dispatch] = useReducer(
    (action, state) => {
      switch (action.type) {
        case "ATTEMPTED_SIGNUP": {
          return { ...state, loading: true }
        }
        case "SIGNUP_FAILED": {
          return {
            ...state,
            loading: false,
            error: action.error
          }
        }
        case "CHANGE_START_DATE": {
          return { ...state, startDate: action.date }
        }
        default: {
          throw new Error(`Unknown action ${action.type}`)
        }
      }
    },
    {
      error: null,
      loading: false,
      startDate: new Date("March 1, 2019")
    }
  )

  let { error, loading, startDate } = state

  // const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(false)
  // const [startDate, setStartDate] = useState(
  //   new Date("March 1, 2019")
  // )

  const handleSignup = async event => {
    event.preventDefault()
    // setLoading(true)

    dispatch({ type: "ATTEMPTED_SIGNUP" })

    const [
      displayName,
      photoURL,
      email,
      password
    ] = event.target.elements
    try {
      await signup({
        displayName: displayName.value,
        email: email.value,
        password: password.value,
        photoURL: photoURL.value,
        startDate
      })
    } catch (error) {
      dispatch({ type: "SIGNUP_FAILED", error })
      // setLoading(false)
      // setError(error)
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
        <TextInput
          id="password"
          label="Password"
          type="password"
        />
        <p>
          <span aria-hidden="true">Start:</span>{" "}
          <DateFields
            value={startDate}
            onChange={date => {
              dispatch({ type: "CHANGE_START_DATE", date })
            }}
          >
            <MonthField aria-label="Start Month" /> /{" "}
            <DayField aria-label="Start Day" /> /{" "}
            <YearField
              start={2018}
              end={2019}
              aria-label="Start year"
            />
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
