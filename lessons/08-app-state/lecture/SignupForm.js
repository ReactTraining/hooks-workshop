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

let array = [1, 2, 3, 4, 5]
let add = (x, y) => x + y

console.log(array.reduce(add, 0))

// 0 + 1
// 1 + 2
// 3 + 3
// 6 + 4
// 10 + 5
// 15

const initialState = { count: 0, user: null, fish: "cake" }

const actions = [
  { anything: "ADD", by: 2 },
  { anything: "MINUS", by: 4 },
  { anything: "EAT" }
]

function reducer(state, action) {
  if (action.anything === "ADD") {
    return { ...state, count: state.count + action.by }
  } else if (action.anything === "MINUS") {
    return { ...state, count: state.count - action.by }
  } else if (action.anything === "EAT") {
    return { ...state, fish: null }
  }
}

console.log(actions.reduce(reducer, initialState))

export default function SignupForm() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "ATTEMPTED_SIGNUP": {
          return { ...state, loading: true }
        }
        case "SIGNUP_ERROR": {
          return {
            ...state,
            loading: false,
            error: action.fish
          }
        }
        case "CHANGE_START_DATE": {
          return {
            ...state,
            startDate: action.date
          }
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

  const { error, loading, startDate } = state

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
      // setLoading(false)
      // ...
      // setError(error)
      dispatch({ type: "SIGNUP_ERROR", fish: error })
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
