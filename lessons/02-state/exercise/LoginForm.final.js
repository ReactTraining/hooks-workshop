import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    const [emailNode, passwordNode] = event.target.elements
    login(emailNode.value, passwordNode.value).catch(error => {
      console.log(error.message)
      setLoading(false)
      setError(error)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{ color: "red" }}>
          <p>Oops, there was an error logging you in.</p>
          <p>
            <i>{error.message}</i>
          </p>
        </div>
      )}
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
            onChange={handleShowPassword}
            defaultChecked={showPassword}
            className="passwordCheckbox"
            type="checkbox"
          />{" "}
          show password
        </label>
      </div>

      <TabsButton>
        <FaSignInAlt />
        <span>{loading ? "Loading..." : "Login"}</span>
      </TabsButton>
    </form>
  )
}
