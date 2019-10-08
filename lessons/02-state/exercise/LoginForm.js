import React, { useState, useRef, Fragment } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(true)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const emailRef = useRef()
  const passwordRef = useRef()

  function submitHandler(event) {
    event.preventDefault()
    setLoading(true)

    login(emailRef.current.value, passwordRef.current.value).catch(error => {
      setError(error.message)
      setLoading(false)
    })
  }

  return (
    <form onSubmit={submitHandler}>
      <VisuallyHidden>
        <label htmlFor="login:email">Email:</label>
      </VisuallyHidden>
      <input
        type="text"
        id="login:email"
        className="inputField"
        ref={emailRef}
        placeholder="you@example.com"
      />

      <VisuallyHidden>
        <label htmlFor="login:password">Password:</label>
      </VisuallyHidden>
      <input
        id="login:password"
        type={showPassword ? "text" : "password"}
        className="inputField"
        ref={passwordRef}
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

      {error && <p>{error}</p>}

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
