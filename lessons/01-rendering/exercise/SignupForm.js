import React, { Fragment, useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { signup } from "app/utils"
import TabsButton from "app/TabsButton"
import { FaDumbbell } from "react-icons/fa"
import { DateFields, MonthField, DayField, YearField } from "app/DateFields"
// import SignupForm from "./SignupForm.final"
// export default SignupForm

function TextInput({ type = "text", label, id }) {
  return <input type={type} placeholder={label} id={id} />
}

export default function SignupForm() {
  return (
    <form className="SignupForm">
      <TextInput label="Display Name" />

      <TextInput label="Photo URL" />

      <TextInput label="Email" type="email" />

      <TextInput label="Password" type="password" />

      <DateFields value={new Date()}>
        <MonthField />
        <DayField />
        <YearField start={2019} end={2020} />
      </DateFields>

      <TabsButton>
        <FaDumbbell />
        <span>Sign up!</span>
      </TabsButton>
    </form>
  )
}
