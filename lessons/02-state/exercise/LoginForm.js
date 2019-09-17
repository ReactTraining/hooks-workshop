import React, { useState, Fragment } from "react"
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
    e.preventDefault()
    setLoading(true)

    const [emailNode, passwordNode] = e.target.elements

    login(emailNode.value, passwordNode.value).catch(error => {
      setError(error.message)
      setLoading(false)
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
