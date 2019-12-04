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
    const subtract = getByTestId("subtract-button")
    fireEvent.click(subtract)
    expect(minutes.value).toEqual("29")
  })

  it("should add minutes", () => {
    const { getByTestId } = render(<Minutes date={new Date()} />)
    const minutes = getByTestId("minutes")
    const add = getByTestId("add-button")
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

/**
 * Without React Testing Library
 */

// import React from "react"
// import ReactDOM from "react-dom"
// import { act } from "react-dom/test-utils"
// import Minutes from "./Minutes"

// let container

// beforeEach(() => {
//   container = document.createElement("div")
//   document.body.appendChild(container)
// })

// afterEach(() => {
//   document.body.removeChild(container)
//   container = null
// })

// describe("Minutes", () => {
//   it("should show 30 minutes", () => {
//     act(() => {
//       ReactDOM.render(<Minutes date={new Date()} />, container)
//     })
//     const input = container.querySelector("#minutes")
//     expect(input.value).toBe("30")
//   })

//   it("should subtract minutes", () => {
//     act(() => {
//       ReactDOM.render(<Minutes date={new Date()} />, container)
//     })
//     const subtractButton = container.querySelector("#subtract-button")
//     const input = container.querySelector("#minutes")
//     act(() => {
//       subtractButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
//     })
//     expect(input.value).toBe("29")
//   })

//   it("should add minutes", () => {
//     act(() => {
//       ReactDOM.render(<Minutes date={new Date()} />, container)
//     })
//     const addButton = container.querySelector("#add-button")
//     const input = container.querySelector("#minutes")
//     act(() => {
//       addButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
//     })
//     expect(input.value).toBe("31")
//   })
// })
