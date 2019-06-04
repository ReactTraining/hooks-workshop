import React, { Fragment, useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  const [checkbox, setCheckbox] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCheckboxChange = () => {
    setCheckbox(!checkbox)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const [emailNode, passwordNode] = event.target.elements
    setLoading(true)
    login(emailNode.value, passwordNode.value)
      .then(function() {
        setLoading(false)
        console.log("we are finished with the async code")
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <VisuallyHidden>
        <label htmlFor="login:email">Email:</label>
      </VisuallyHidden>
      <input
        type="text"
        id="login:email"
        className="inputField"
        placeholder="you@example.com"
      />

      <VisuallyHidden>
        <label htmlFor="login:password">Password:</label>
      </VisuallyHidden>
      <input
        id="login:password"
        type={checkbox ? "text" : "password"}
        className="inputField"
        placeholder="Password"
      />

      <div>
        <label>
          <input
            className="passwordCheckbox"
            type="checkbox"
            defaultChecked={checkbox}
            onChange={handleCheckboxChange}
          />{" "}
          show password
        </label>
      </div>

      <TabsButton>
        {loading ? (
          <span>...</span>
        ) : (
          <Fragment>
            <FaSignInAlt />
            <span>Login</span>
          </Fragment>
        )}
      </TabsButton>
    </form>
  )
}
