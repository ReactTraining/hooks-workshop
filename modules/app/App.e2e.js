describe("Google", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000")
  })

  it("should login", async () => {
    await expect(page.title()).resolves.toMatch("React App")

    const emailInput = await page.waitFor('[data-testid="login:email"]')

    await emailInput.type("some@body.com")

    const passwordInput = await page.waitFor('[data-testid="login:password"]')

    await passwordInput.type("somebody")

    await page.click('button[type="submit"]')

    await page.waitFor('[data-testid="calendar-link"]')
  }, 30000)
})
