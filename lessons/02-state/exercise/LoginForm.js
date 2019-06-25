import React, { useState, useRef, Fragment } from "react"
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
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()

    setLoading(true)
    login(email, password).catch(err => {
      setLoading(false)
      setErrorMessage(err.message)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>{errorMessage}</div>
      <VisuallyHidden>
        <label htmlFor="login:email">Email:</label>
      </VisuallyHidden>
      <input
        type="text"
        id="login:email"
        className="inputField"
        placeholder="you@example.com"
        value={email || ""}
        onChange={e => setEmail(e.target.value)}
      />

      <VisuallyHidden>
        <label htmlFor="login:password">Password:</label>
      </VisuallyHidden>
      <input
        id="login:password"
        type={showPassword ? "text" : "password"}
        className="inputField"
        placeholder="Password"
        value={password || ""}
        onChange={e => setPassword(e.target.value)}
      />

      <div>
        <label>
          <input
            className="passwordCheckbox"
            type="checkbox"
            defaultChecked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />{" "}
          show password
        </label>
      </div>

      <TabsButton>
        {loading ? (
          <span>Loading...</span>
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
