describe("Google", () => {
  beforeEach(async () => {
    await page.goto("http://localhost:3000")
  })

  // it("should login", async () => {
  //   await expect(page.title()).resolves.toMatch("React App")

  //   const emailInput = await page.waitFor('[data-testid="login:email"]')

  //   await emailInput.type("some@body.com")

  //   const passwordInput = await page.waitFor('[data-testid="login:password"]')

  //   await passwordInput.type("somebody")

  //   await page.click('button[type="submit"]')

  //   await page.waitFor('[data-testid="calendar-link"]')

  //   await browser.close()
  // }, 30000)

  it("should signup", async () => {
    const signupTab = await page.waitFor('[data-testid="signup-tab"]')
    await signupTab.click()
    const displayName = await page.waitFor('[data-testid="signup:displayName"]')
    await displayName.type("Texas")
    const photoURL = await page.waitFor('[data-testid="signup:photoURL"]')
    await photoURL.type("https://imgur.com/something")
    const email = await page.waitFor('[data-testid="signup:email"]')
    await email.type("somebody@example.com")
    const password = await page.waitFor('[data-testid="signup:password"]')
    await password.type("p@ssw0rd!")
  }, 30000)
})
