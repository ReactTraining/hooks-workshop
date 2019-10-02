import React, { useReducer, useEffect } from "react"
import { Screen } from "./Screen"

function submitReducer(state, action) {
  switch (action.type) {
    case "SEND_FEEDBACK":
      return {
        ...state,
        status: "submitting"
      }
    case "SUCCESS":
      return {
        ...state,
        status: "submitted"
      }
    default:
      return {
        ...state,
        status: "pending"
      }
  }
}

export function FormScreen({ onSubmit, onClose }) {
  const [state, dispatch] = useReducer(submitReducer, {
    status: "pending"
  })

  useEffect(() => {
    if (state.status === "submitting") {
      new Promise(resolve => {
        setTimeout(() => {
          // const { response } = e.target.elements
          onSubmit({
            // value: response
          })
          dispatch({ type: "SUCCESS" })
          resolve(true)
        }, 2000)
      })
    }
  }, [state.status])

  return (
    <Screen
      onSubmit={e => {
        e.preventDefault()
        dispatch({ type: "SEND_FEEDBACK" })
      }}
      data-testid="form-screen"
    >
      {state.status === "submitting" ? (
        <header>Sending...</header>
      ) : (
        <>
          <header>Care to tell us why?</header>
          <textarea
            name="response"
            placeholder="Complain here"
            onKeyDown={e => {
              if (e.key === "Escape") {
                e.stopPropagation()
              }
            }}
          />
          <button data-testid="submit-button">Submit</button>
          <button
            title="close"
            data-testid="close-button"
            type="button"
            onClick={onClose}
          />
        </>
      )}
    </Screen>
  )
}
