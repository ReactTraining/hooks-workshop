// This file is not in the exercises
// I'm just gonna use it for examples

// Jest for Unit
// Cypress for E2E
// React Testing Library or Enzyme for Integration

// Testing

// Static -> use a linter
// Unit -> testing utilities

function capitalize(str) {
  return str.toUpperCase()
}

let str = "fish"

expect(capitalize(str)).toEqual("FISH")

// Integration

expect(<App />).toRender()

// E2E/Functional

cy.visit("/homepage")
cy.get(".banner").click()

cy.get('[data-test-id="user-avatar"]')
