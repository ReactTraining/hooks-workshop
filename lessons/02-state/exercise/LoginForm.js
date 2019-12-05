import React, { useState, useRef } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)

  const emailRef = useRef()
  const passwordRef = useRef()

  function handleSubmit(event) {
    event.preventDefault()

    login(emailRef.current.value, passwordRef.current.value).catch(error => {
      setError(error.message)
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
            onChange={() => {
              setShowPassword(!showPassword)
            }}
            className="passwordCheckbox"
            type="checkbox"
            defaultChecked={showPassword}
          />{" "}
          show password
        </label>
      </div>

      {error && <p>{error}</p>}

      <TabsButton>
        <FaSignInAlt />
        <span>Login</span>
      </TabsButton>
    </form>
  )
}
