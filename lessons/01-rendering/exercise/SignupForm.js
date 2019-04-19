/**********************************************************
- Map the `fields` array to render each field as an input
  - use `id` field for the element id prop
  - use `label` for the `placeholder` prop
  - add className `inputField` to make it ~look so nice~

- Render the submit button
  - use classNames "TabsButton icon_button cta" to make
    it ~look so nice~.
  - toss the `FaDumbbell` in for some fun
  - Abstract the button into a `TabsButton` component
    that wraps up the classNames so that it could be
    reused in other places
    - Use the `children` prop to allow any content inside

*/
import React, { Fragment, useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { signup } from "app/utils"
import TabsButton from "app/TabsButton"
import { FaDumbbell } from "react-icons/fa"
import { DateFields, MonthField, DayField, YearField } from "app/DateFields"
// import SignupForm from "./SignupForm.final"
// export default SignupForm

export default function SignupForm() {
  return null
}
