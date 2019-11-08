import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  const [status, setStatus] = useState("idle")
  const [showPass, setShowPass] = useState(false)

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        const [emailNode, passwordNode] = event.target.elements
        const email = emailNode.value
        const pass = passwordNode.value

        login(email, pass)
          .then(() => {
            setStatus("success")
          })
          .catch(() => {
            setStatus("error")
            console.error("failed to login")
          })

        setStatus("loading")
      }}
    >
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
        type={showPass ? "text" : "password"}
        className="inputField"
        placeholder="Password"
      />

      <div>
        <label>
          <input
            className="passwordCheckbox"
            type="checkbox"
            defaultChecked={false}
            onChange={event => {
              setShowPass(event.target.checked)
            }}
          />{" "}
          show password
        </label>
      </div>
      {status === "error" && (
        <span style={{ color: "red" }}>Failed to login</span>
      )}
      <TabsButton>
        <FaSignInAlt />
        <span>{status === "loading" ? "Loading..." : "Login"}</span>
      </TabsButton>
    </form>
  )
}
