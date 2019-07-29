import React, { useState, useRef } from "react"
import { login } from "app/utils"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"

export default function LoginForm() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleLogin = async event => {
    event.preventDefault()
    setLoading(true)
    try {
      await login(emailRef.current.value, passwordRef.current.value)
    } catch (error) {
      setLoading(false)
      setError(error)
    }
  }

  const handleShowPassword = event => {
    setShowPassword(event.target.checked)
  }

  return (
    <div>
      {error && (
        <div>
          <p>Oops, there was an error logging you in.</p>
          <p>
            <i>{error.message}</i>
          </p>
        </div>
      )}

      <form onSubmit={handleLogin}>
        <VisuallyHidden>
          <label htmlFor="login:email">Email:</label>
        </VisuallyHidden>
        <input
          ref={emailRef}
          id="login:email"
          className="inputField"
          placeholder="you@example.com"
          required
          type="text"
        />

        <VisuallyHidden>
          <label htmlFor="login:password">Password:</label>
        </VisuallyHidden>
        <input
          ref={passwordRef}
          id="login:password"
          type={showPassword ? "text" : "password"}
          className="inputField"
          required
          placeholder="Password"
        />
        <div>
          <label>
            <input
              className="passwordCheckbox"
              type="checkbox"
              onChange={handleShowPassword}
              defaultChecked={showPassword}
            />{" "}
            show password
          </label>
        </div>

        <TabsButton>
          <FaSignInAlt />
          <span>{loading ? "Loading..." : "Login"}</span>
        </TabsButton>
      </form>
    </div>
  )
}
