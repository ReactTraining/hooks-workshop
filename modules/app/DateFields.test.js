import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { MonthField, DayField, YearField, DateFields } from "./DateFields"

describe("DateFields", () => {
  afterEach(cleanup)

  it("should match snapshot", () => {
    const setStartDate = () => {}

    const { container, getByTestId } = render(
      <DateFields value={new Date()} onChange={setStartDate}>
        <MonthField aria-label="Start Month" data-testid="month" /> /{" "}
        <DayField aria-label="Start Day" /> /{" "}
        <YearField start={2018} end={2019} aria-label="Start year" />
      </DateFields>
    )
  })
})
