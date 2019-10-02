import React, { Fragment, useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { signup } from "app/utils"
import TabsButton from "app/TabsButton"
import { FaDumbbell } from "react-icons/fa"
import { DateFields, MonthField, DayField, YearField } from "app/DateFields"
import PropTypes from "prop-types"
// import SignupForm from "./SignupForm.final"
// export default SignupForm

const SignUpButton = props => {
  return (
    <TabsButton className="icon_button cta">
      <FaDumbbell />
      <span>{props.text}</span>
    </TabsButton>
  )
}

SignUpButton.propTypes = {
  text: PropTypes.string.isRequired
}

const TextInput = ({ type = "text", id, placeholder }) => {
  return <input type={type} id={id} placeholder={placeholder} />
}

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "email", "password", "number"]),
  placeholder: PropTypes.string
}

export default function SignupForm() {
  return (
    <form className="SignupForm">
      <TextInput placeholder="Display name" />
      <TextInput placeholder="Photo URL" />
      <TextInput type="email" placeholder="name@example.com" />
      <TextInput type={"password"} placeholder="Make up a password" />

      <DateFields value={new Date()}>
        <MonthField />
        <DayField />
        <YearField start={2019} end={2029} />
      </DateFields>

      <SignUpButton text={"Sign up"} />
    </form>
  )
}
