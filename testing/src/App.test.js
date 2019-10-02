import React from "react"
import { Feedback } from "./App"
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

describe("feedback app", () => {
  afterEach(cleanup)

  it('should show the thanks screen when "Good" is clicked', () => {
    // The question screen should be visible at first
    const { getByTestId, getByText } = render(<Feedback />)

    expect(getByTestId("question-screen")).toBeTruthy()

    // Click the "Good" button
    const goodButton = getByText(/^good$/i)

    fireEvent.click(goodButton)

    // Now the thanks screen should be visible
    expect(getByTestId("thanks-screen")).toBeTruthy()
  })

  it('should show the form screen when "Bad" is clicked', () => {
    // The question screen should be visible at first
    const { getByTestId, getByText } = render(<Feedback />)
    expect(getByTestId("question-screen")).toBeTruthy()

    // Click the "Bad" button
    const badButton = getByText(/^bad$/i)

    fireEvent.click(badButton)

    // Now the form screen should be visible
    expect(getByTestId("form-screen")).toBeTruthy()
  })

  it('should show the thanks screen when "Bad" is clicked and when the form is submitted', async () => {
    // The question screen should be visible at first
    const { getByTestId, getByText, container } = render(<Feedback />)
    expect(getByTestId("question-screen")).toBeTruthy()

    // Click the "Bad" button
    const badButton = getByText(/^bad$/i)

    fireEvent.click(badButton)

    // Now the form screen should be visible
    expect(getByTestId("form-screen")).toBeTruthy()

    const submitButton = getByTestId("submit-button")

    fireEvent.click(submitButton)

    expect(container).toHaveTextContent(/sending/i)

    const thanksScreen = await waitForElement(() => {
      return getByTestId("thanks-screen")
    })

    expect(thanksScreen).toBeTruthy()
  })

  it("should close when you click close (question)", () => {
    // The question screen should be visible at first
    const { getByTestId, queryByTestId, getByText } = render(<Feedback />)
    expect(getByTestId("question-screen")).toBeTruthy()

    // // Click the "Good" button
    // const goodButton = getByText(/^good$/i)
    // fireEvent.click(goodButton)

    // // Now the thanks screen should be visible
    // const thanksScreen = getByTestId("thanks-screen")
    // expect(thanksScreen).toBeTruthy()

    const closeButton = getByTestId("close-button")

    fireEvent.click(closeButton)

    expect(queryByTestId("question-screen")).toBeNull()
  })

  it("should close when you click close (thanks)", () => {
    // The question screen should be visible at first
    const { getByTestId, queryByTestId, getByText } = render(
      <Feedback screen="thanks" />
    )
    expect(getByTestId("thanks-screen")).toBeTruthy()

    // // Click the "Good" button
    // const goodButton = getByText(/^good$/i)
    // fireEvent.click(goodButton)

    // // Now the thanks screen should be visible
    // const thanksScreen = getByTestId("thanks-screen")
    // expect(thanksScreen).toBeTruthy()

    const closeButton = getByTestId("close-button")

    fireEvent.click(closeButton)

    expect(queryByTestId("question-screen")).toBeNull()
  })
})
