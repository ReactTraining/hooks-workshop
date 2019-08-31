import React, { Fragment, useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    setLoading(true)
    e.preventDefault()

    const [emailNode, passwordNode] = e.target.elements

    login(emailNode.value, passwordNode.value).catch(err => {
      setLoading(false)
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

      {error && <p>{error}</p>}

      <TabsButton>
        <span>
          {loading ? (
            "Loading..."
          ) : (
            <Fragment>
              <FaSignInAlt /> Login
            </Fragment>
          )}
        </span>
      </TabsButton>
    </form>
  )
}
