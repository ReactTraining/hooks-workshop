import React from "react"
import { render, cleanup, wait } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import {
  fetchUser,
  calculateTotalMinutes,
  calculateExpectedMinutes
} from "app/utils"
import usePosts from "app/usePosts"
import Avatar from "./AvatarAlt"

// Mocks
jest.mock("app/utils")
jest.mock("app/usePosts")

fetchUser.mockResolvedValue({
  displayName: "fake",
  goal: 8000,
  photoURL: "https://example.com",
  started: "2019-03-01",
  uid: "123"
})

usePosts.mockReturnValue([{ minutes: 30 }])

calculateTotalMinutes.mockReturnValue(30)
calculateExpectedMinutes.mockReturnValue(5000)

describe("Avatar", () => {
  afterEach(cleanup)

  it("should render and load a user", async () => {
    const { getByTestId } = render(<Avatar uid={1} />)

    const avatar = getByTestId("empty-avatar")
    expect(avatar).toBeTruthy()

    await wait(() => {
      expect(getByTestId("avatar")).toBeTruthy()
    })
  })
})
