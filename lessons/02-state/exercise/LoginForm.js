import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    login("brad@reacttraining.com", "12312312").catch(err => {
      setError(err.message)
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

      {error && <div>{error}</div>}

      <TabsButton>
        <FaSignInAlt />
        <span>Login</span>
      </TabsButton>
    </form>
  )
}
