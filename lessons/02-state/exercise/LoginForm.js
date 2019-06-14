import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const [emailNode, passwordNode] = event.target.elements

    setLoading(true)

    login(emailNode.value, passwordNode.value).catch(error => {
      setErrorMessage(error.message)
      setLoading(false)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <div>{errorMessage}</div>}

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
        type={showPassword ? "text" : "password"}
        className="inputField"
        placeholder="Password"
      />

      <div>
        <label>
          <input
            className="passwordCheckbox"
            type="checkbox"
            onChange={() => {
              setShowPassword(!showPassword)
            }}
            defaultChecked={false}
          />{" "}
          show password
        </label>
      </div>

      <TabsButton>
        {loading ? (
          "Loading..."
        ) : (
          <span>
            <FaSignInAlt /> Submit
          </span>
        )}
      </TabsButton>
    </form>
  )
}
