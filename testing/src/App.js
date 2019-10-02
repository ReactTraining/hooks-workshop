import React, { useReducer, useEffect } from "react"
import { ThanksScreen } from "./ThanksScreen"
import { FormScreen } from "./FormScreen"
import { QuestionScreen } from "./QuestionScreen"

function useKeyDown(key, onKeyDown) {
  // ...
}

const initialState = "question"

function feedbackReducer(state, action) {
  switch (state) {
    case "question":
      switch (action.type) {
        case "GOOD":
          return "thanks"

        default:
          return state
      }

    default:
      return state
  }
}

export function Feedback() {
  const [state, dispatch] = useReducer(feedbackReducer, initialState)

  switch (state) {
    case "question":
      return (
        <QuestionScreen
          onClickGood={() => dispatch({ type: "GOOD" })}
          onClickBad={() => dispatch({ type: "BAD" })}
          onClose={() => dispatch({ type: "CLOSE" })}
        />
      )
    case "form":
      return (
        <FormScreen
          onSubmit={value => dispatch({ type: "SUBMIT", value })}
          onClose={() => dispatch({ type: "CLOSE" })}
        />
      )
    case "thanks":
      return <ThanksScreen onClose={() => dispatch({ type: "CLOSE" })} />
    case "closed":
    default:
      return null
  }
}

export function App() {
  return (
    <main className="ui-app">
      <Feedback />
    </main>
  )
}
