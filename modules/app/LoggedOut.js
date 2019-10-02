import React from "react"
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import About from "./About"

export default function LoggedOut() {
  return (
    <div className="LoggedOut">
      <About />
      <Tabs>
        <TabList>
          <Tab>Login</Tab>
          <Tab data-testid="signup-tab">Sign Up</Tab>
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
