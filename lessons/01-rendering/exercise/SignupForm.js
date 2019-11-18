import React, { Fragment, useState } from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import { signup } from 'app/utils'
// import TabsButton from 'app/TabsButton'
import { FaDumbbell } from 'react-icons/fa'
import { DateFields, MonthField, DayField, YearField } from 'app/DateFields'
// import SignupForm from "./SignupForm.final"
// export default SignupForm

function TabsButton(props) {
  return (
    <>
      <button type="submit" className="TabsButton icon_button cta">
        {props.children}
      </button>
      <strong>Sign up by clicking this button</strong>
    </>
  )
}

export default function SignupForm() {
  return (
    <form className="SignupForm">
      <input type="text" placeholder="Display name" />
      <input type="text" placeholder="Photo URL" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <DateFields value={new Date()}>
        <YearField start={2019} end={2021} />
        <MonthField />
        <DayField />
      </DateFields>

      <TabsButton>
        <FaDumbbell />
        Sign me up!
      </TabsButton>
    </form>
  )
}
