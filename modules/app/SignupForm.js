import React, { Fragment, useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { signup } from "./utils"
import TabsButton from "./TabsButton"
import { FaDumbbell } from "react-icons/fa"
import { DateFields, MonthField, DayField, YearField } from "./DateFields"

function TextInput({ id, label, type = "text", ...rest }) {
  return (
    <Fragment>
      <VisuallyHidden>
        <label htmlFor={id}>{label}</label>
      </VisuallyHidden>
      <input id={id} placeholder={label} type={type} required {...rest} />
    </Fragment>
  )
}

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
        <TextInput
          id="displayName"
          label="Display Name"
          data-testid="signup:displayName"
        />
        <TextInput
          id="photoURL"
          label="Avatar URL"
          data-testid="signup:photoURL"
        />
        <TextInput id="email" label="Email" data-testid="signup:email" />
        <TextInput
          id="password"
          type="password"
          label="Password"
          data-testid="signup:password"
        />
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
