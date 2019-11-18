import React, { useState, useRef } from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import { FaSignInAlt } from 'react-icons/fa'
import TabsButton from 'app/TabsButton'
import { login } from 'app/utils'

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        const password = passwordRef.current.value

        setLoading(true)

        login(email, password)
          .then(data => {
            setLoading(false)
          })
          .catch(error => {
            setLoading(false)
            setError(error.message)
            console.log(error)
          })
      }}
    >
      {error && <strong style={{ color: 'red' }}>{error}</strong>}
      <VisuallyHidden>
        <label htmlFor="login:email">Email:</label>
      </VisuallyHidden>
      <input
        type="text"
        id="login:email"
        className="inputField"
        placeholder="you@example.com"
        onChange={event => {
          setEmail(event.target.value)
        }}
        ref={emailRef}
      />

      <VisuallyHidden>
        <label htmlFor="login:password">Password:</label>
      </VisuallyHidden>
      <input
        id="login:password"
        type={showPassword ? 'text' : 'password'}
        className="inputField"
        placeholder="Password"
        ref={passwordRef}
      />

      <div>
        <label>
          <input
            className="passwordCheckbox"
            type="checkbox"
            defaultChecked={showPassword}
            onChange={() => {
              // false
              setShowPassword(!showPassword)
            }}
          />{' '}
          show password
        </label>
      </div>

      <TabsButton>
        <FaSignInAlt />
        <span>{loading ? 'Logging in...' : 'Login'}</span>
      </TabsButton>
    </form>
  )
}
