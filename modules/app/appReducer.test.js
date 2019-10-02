import React from "react"
import appReducer, { initialState } from "./appReducer"

describe("appReducer", () => {
  it("should indicate that auth was attempted when AUTH_CHANGE", () => {
    const nextState = appReducer(initialState, {
      type: "AUTH_CHANGE",
      auth: {}
    })

    expect(nextState.authAttempted).toEqual(true)
  })

  it("should indicate that the user was loaded in when LOAD_USER", () => {
    const nextState = appReducer(initialState, {
      type: "LOAD_USER",
      user: {}
    })

    expect(nextState.user).toBeDefined()
  })

  it("should ignore unknown actions", () => {
    const nextState = appReducer(initialState, {
      type: "UNKNOWN",
      user: {},
      auth: {}
    })

    expect(nextState).toEqual(initialState)
  })
})
