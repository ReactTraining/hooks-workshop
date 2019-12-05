import React from "react"
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"

function LoggedOut() {
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
            <LoginForm></LoginForm>
          </TabPanel>
          <TabPanel>
            <SignupForm></SignupForm>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default LoggedOut
