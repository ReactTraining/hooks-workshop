import React from "react"

import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import { Tabs, TabsList, Tab, TabPanels, TabPanel } from "./MyBadTabs"

export default function LoggedOut() {
  return (
    <div className="LoggedOut">
      <Tabs>
        <TabsList>
          <Tab>Login</Tab>
          <Tab>Signup</Tab>
        </TabsList>
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
