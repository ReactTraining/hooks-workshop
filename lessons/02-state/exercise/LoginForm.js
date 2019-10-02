import React, { useState, useRef } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const emailRef = useRef(null)
  const [password, setPassword] = useState("")

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)

    try {
      const result = await login(emailRef.current.value, password)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }

    // .then(result => {
    //   setLoading(false)
    //   console.log(result)
    // })
    // .catch(error => {
    //   setLoading(false)
    //   setError(error)
    //   console.log(error)
    // })
  }

  return (
    <form onSubmit={event => handleSubmit(event)}>
      {error ? <p style={{ color: "red" }}>Error: {error.message}</p> : null}
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
        type={showPass ? "text" : "password"}
        className="inputField"
        placeholder="Password"
        onChange={event => {
          setPassword(event.target.value)
        }}
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

      <TabsButton>
        <FaSignInAlt />
        <span>{loading ? "Logging in..." : "Login"}</span>
      </TabsButton>
    </form>
  )
}
