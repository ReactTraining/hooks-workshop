import React from "react"
import { Screen } from "./Screen"

export function QuestionScreen({ onClickGood, onClickBad, onClose }) {
  return (
    <Screen data-testid="question-screen">
      <header>How was your experience?</header>
      <button
        onClick={onClickGood}
        data-variant="good"
        data-testid="good-button"
      >
        Good
      </button>
      <button onClick={onClickBad} data-variant="bad" data-testid="bad-button">
        Bad
      </button>
      <button title="close" data-testid="close-button" onClick={onClose} />
    </Screen>
  )
}
