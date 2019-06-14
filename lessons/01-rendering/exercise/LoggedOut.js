/**********************************************************
- This is the page we see when we're logged out.
- The components from `@reach/tabs` all work together. Create
  some tabs for "Signup" and "Login"
- 1. Start by adding `<Tabs>`
- 2. Then add two children: `<TabList>` and `<TabPanel>`
- 3. Then add tabs and panels in those components
- 4. Last, add the `<LoginForm>` and `<SignupForm>` to the
  respective panels.

There is a `.final.js` file for each exercise file. It's not cheating
to take a peak! It's there for just that reason. You can also
un-comment the import and export for the final version to see it working

*/

import React from "react"
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"
// import LoggedOut from "./LoggedOut.final"
// export default LoggedOut

export default function LoggedOut() {
  return (
    <div className="LoggedOut">
      <About />
      <Tabs>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Signup</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginForm />
          </TabPanel>
          <TabPanel>
            <SignupForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
