import React, { useState, useRef, useReducer, useEffect } from "react"
import { login } from "app/utils"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"

const initialState = {
  status: "idle", // 'loading', 'success', 'error'
  error: null
}

function toActionObject(action) {
  if (typeof action === "string") {
    return { type: action }
  }

  return action
}

function loginReducer(state, action) {
  const actionObject = toActionObject(action)

  switch (actionObject.type) {
    case "LOAD":
      return {
        ...state,
        status: "loading"
      }
    case "SUCCESS":
      return {
        ...state,
        error: null,
        status: "success"
      }
    case "ERROR":
      return {
        ...state,
        error: action.error,
        status: "failure"
      }

    default:
      return state
  }
}

export default function LoginForm() {
  const [state, dispatch] = useReducer(loginReducer, initialState)

  console.log(state)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const emailRef = useRef()
  const passwordRef = useRef()

  useEffect(() => {
    if (state.status === "loading") {
      login(emailRef.current.value, passwordRef.current.value)
        .then(data => {
          dispatch({
            type: "SUCCESS",
            data: data
          })
        })
        .catch(error => {
          dispatch({
            type: "ERROR",
            error: error
          })
        })
    }
  }, [state.status])

  const handleLogin = async event => {
    event.preventDefault()
    dispatch("LOAD")
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
          <span>{state.status === "loading" ? "Loading..." : "Login"}</span>
        </TabsButton>
      </form>
    </div>
  )
}
