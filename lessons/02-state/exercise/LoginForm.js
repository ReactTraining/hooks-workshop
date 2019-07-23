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
  const [error, setError] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)

    const [emailNode, passwordNode] = event.target.elements

    login(emailNode.value, passwordNode.value).catch(error => {
      setLoading(false)
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
            defaultChecked={showPassword}
          />{" "}
          show password
        </label>
      </div>

      <div>{error}</div>

      <TabsButton>
        <FaSignInAlt />
        {loading ? <span>Loading...</span> : <span>Login</span>}
      </TabsButton>
    </form>
  )
}
