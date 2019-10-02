import React, { useReducer, useEffect } from "react"
import { ThanksScreen } from "./ThanksScreen"
import { FormScreen } from "./FormScreen"
import { QuestionScreen } from "./QuestionScreen"

function useKeyDown(key, onKeyDown) {
  // ...
}

const initialState = "question"

// question + GOOD = thanks
// question + BAD = form
// form + SUBMIT = thanks
// ??? + CLOSE = closed

function feedbackReducer(state, action) {
  if (action.type === "CLOSE") {
    return "closed"
  }

  switch (state) {
    case "question":
      switch (action.type) {
        case "GOOD":
          return "thanks"

        case "BAD":
          return "form"

        default:
          return state
      }
    case "form":
      switch (action.type) {
        case "SUBMIT":
          return "thanks"
        default:
          return state
      }
    default:
      return state
  }
}

export function Feedback({ screen = initialState }) {
  const [state, dispatch] = useReducer(feedbackReducer, screen)

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
