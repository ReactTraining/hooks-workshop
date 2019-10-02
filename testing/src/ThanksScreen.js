import React from "react"
import { Screen } from "./Screen"

export function ThanksScreen({ onClose }) {
  return (
    <Screen>
      <header>Thanks for your feedback.</header>
      <button title="close" data-testid="close-button" onClick={onClose} />
    </Screen>
  )
}
