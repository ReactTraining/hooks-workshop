import React, { useState, Fragment } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

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
      {error && <div>{error}</div>}
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
            onClick={() => {
              setShowPassword(!showPassword)
            }}
            defaultChecked={showPassword}
          />{" "}
          show password
        </label>
      </div>

      <TabsButton>
        {!loading ? (
          <Fragment>
            <FaSignInAlt />
            <span>Login</span>
          </Fragment>
        ) : (
          <span>Loading...</span>
        )}
      </TabsButton>
    </form>
  )
}
