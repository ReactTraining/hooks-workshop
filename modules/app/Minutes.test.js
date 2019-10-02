import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Minutes from "./Minutes"

describe("Minutes", () => {
  afterEach(cleanup)

  it("should show 30 minutes", () => {
    const { getByTestId } = render(<Minutes date={new Date()} />)

    const minutes = getByTestId("minutes")

    expect(minutes.value).toEqual("30")
  })

  it("should subtract minutes", () => {
    const { getByTestId } = render(<Minutes date={new Date()} />)

    const minutes = getByTestId("minutes")
    const subtract = getByTestId("subtract-minutes")

    fireEvent.click(subtract)

    expect(minutes.value).toEqual("29")
  })

  it("should add minutes", () => {
    const { getByTestId } = render(<Minutes date={new Date()} />)

    const minutes = getByTestId("minutes")
    const add = getByTestId("add-minutes")

    fireEvent.click(add)

    expect(minutes.value).toEqual("31")
  })

  it("should subtract minutes (down arrow)", () => {
    const { getByTestId } = render(<Minutes date={new Date()} />)

    const minutes = getByTestId("minutes")

    fireEvent.keyDown(minutes, { key: "ArrowDown" })

    expect(minutes.value).toEqual("29")
  })
})
