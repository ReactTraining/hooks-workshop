import React, { useState, Fragment } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const emailRef = useRef()
  const passwordRef = useRef()

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        setLoading(true)

        login(emailRef.current.value, passwordRef.current.value).catch(
          error => {
            setLoading(false)
            setMessage(error.message)
          }
        )
      }}
    >
      {message && <p>{message}</p>}

      <VisuallyHidden>
        <label htmlFor="login:email">Email:</label>
      </VisuallyHidden>
      <input
        type="text"
        id="login:email"
        className="inputField"
        placeholder="you@example.com"
        ref={emailRef}
      />

      <VisuallyHidden>
        <label htmlFor="login:password">Password:</label>
      </VisuallyHidden>
      <input
        id="login:password"
        type={showPassword ? "text" : "password"}
        className="inputField"
        placeholder="Password"
        ref={passwordRef}
      />

      <div>
        <label>
          <input
            className="passwordCheckbox"
            type="checkbox"
            onChange={() => {
              setShowPassword(!showPassword)
            }}
            defaultChecked={showPassword}
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
