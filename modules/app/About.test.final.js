import React from "react"
import ReactDOM from "react-dom"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import About from "./About"

describe("About", () => {
  it("should render", () => {
    const { getByText } = render(<About />)

    expect(getByText(/you can do it/i)).toBeTruthy()
  })

  it("should match inline snapshot", () => {
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
