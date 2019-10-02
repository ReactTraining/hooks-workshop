import React from "react"
import { render, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { AvatarImage } from "./Avatar"

const props = {
  className: "Meta_avatar",
  size: 200,
  displayName: "David Khourshid",
  photoURL: "https://i.imgur.com/Tv8tVqF.jpg",
  progress: 52.93750000000001,
  expectedProgress: 82.6875,
  bg: "white"
}

describe("Avatar", () => {
  it("should match the snapshot", () => {
    const { container } = render(<AvatarImage {...props} />)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="Avatar Meta_avatar"
          style="width: 200px; height: 200px;"
        >
          <div
            aria-label="Avatar for David Khourshid"
            class="Avatar_image"
            role="img"
            style="background-image: url(https://i.imgur.com/Tv8tVqF.jpg); width: 161px; height: 161px; top: 20px; left: 20px;"
          />
          <svg
            aria-label="Progress: 52.93750000000001%"
            height="200"
            width="200"
          >
            <circle
              cx="100"
              cy="100"
              fill="transparent"
              r="90"
              stroke="white"
              stroke-dasharray="565.4866776461628 565.4866776461628"
              stroke-width="20"
              style="box-shadow: 1px 1px 1px hsla(0, 0%, 0%, 0.5); transform: rotate(-90deg); transform-origin: 50% 50%;"
            />
            <circle
              cx="100"
              cy="100"
              fill="transparent"
              r="90"
              stroke=""
              stroke-dasharray="565.4866776461628 565.4866776461628"
              stroke-width="20"
              style="stroke-dashoffset: 97.89988106749189; transform: rotate(-90deg); transform-origin: 50% 50%;"
            />
            <circle
              cx="100"
              cy="100"
              fill="transparent"
              r="90"
              stroke=""
              stroke-dasharray="565.4866776461628 565.4866776461628"
              stroke-width="20"
              style="stroke-dashoffset: 266.13216766722536; transform: rotate(-90deg); transform-origin: 50% 50%;"
            />
          </svg>
        </div>
      </div>
    `)
  })
})
