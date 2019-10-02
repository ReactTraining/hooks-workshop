import React from "react"
import { Screen } from "./Screen"

export function FormScreen({ onSubmit, onClose }) {
  return (
    <Screen
      onSubmit={e => {
        e.preventDefault()
        const { response } = e.target.elements
        onSubmit({
          value: response
        })
      }}
    >
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
      <button>Submit</button>
      <button
        title="close"
        data-testid="close-button"
        type="button"
        onClick={onClose}
      />
    </Screen>
  )
}
