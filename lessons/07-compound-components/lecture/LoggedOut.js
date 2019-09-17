import React, { useState, useContext, createContext, Children } from "react"

import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return <div data-reach-tabs>{children}</div>
}

export default function LoggedOut() {
  const tabData = [
    {
      label: "Login",
      content: <LoginForm />
    },
    {
      label: "Signup",
      content: <SignupForm />
    }
  ]

  return (
    <div className="LoggedOut">
      <About />
      <Tabs>
        <TabList>
          <Tab className="" />
          <Tab />
        </TabList>
        <TabPanels>
          <TabPanel />
          <TabPanel />
        </TabPanels>
      </Tabs>
    </div>
  )
}
