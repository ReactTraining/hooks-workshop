import React from "react"
import { render, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import About from "./About"

describe("About", () => {
  afterEach(cleanup)

  it("should render", () => {
    expect(() => {
      render(<About />)
    }).not.toThrowError()
  })

  it("should encourage us", () => {
    const { container } = render(<About />)

    expect(container).toHaveTextContent("You can do it!")
  })

  it("should match snapshot", () => {
    const { container } = render(<About />)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="about"
        >
          <h1
            style="text-align: center;"
          >
            8k
          </h1>
          <p>
            It's simple. Exercise for 8,000 minutes this year.
          </p>
          <p>
            That's 30 minutes a day, 5 days a week.
          </p>
          <p>
            Track your progress here, and share it with others.
          </p>
          <p>
            You can do it!
          </p>
        </div>
      </div>
    `)
  })
})
