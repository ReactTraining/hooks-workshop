import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    const [emailNode, passwordNode] = e.target.elements

    setLoading(true)
    login(emailNode.value, passwordNode.value).catch(err => {
      setLoading(false)
      setErrorMessage("There was an error")
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <span className="notice">{errorMessage}</span>}

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
            defaultChecked={showPassword}
            onChange={() => {
              setShowPassword(!showPassword)
            }}
          />{" "}
          show password
        </label>
      </div>

      <TabsButton>
        <FaSignInAlt />
        <span>{loading ? "Loading...." : "Login"}</span>
      </TabsButton>
    </form>
  )
}
