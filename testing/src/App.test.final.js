import React from "react"
import { Feedback } from "./App"
import { render, fireEvent, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

describe("feedback app", () => {
  afterEach(cleanup)

  it('should show the thanks screen when "Good" is clicked', () => {
    const { getByText } = render(<Feedback />)

    // The question screen should be visible at first
    getByText("How was your experience?")

    // Click the "Good" button
    fireEvent.click(getByText("Good"))

    // Now the thanks screen should be visible
    getByText("Thanks for your feedback.")
  })

  it('should show the form screen when "Bad" is clicked', () => {
    const { getByText } = render(<Feedback />)
    // The question screen should be visible at first
    getByText("How was your experience?")

    // Click the "Bad" button
    fireEvent.click(getByText("Good"))

    // Now the form screen should be visible
    getByText("Care to tell us why?")
  })
})
