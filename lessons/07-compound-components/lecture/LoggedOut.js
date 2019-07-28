import React, { useState, useContext } from "react"

import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"

const TabContext = React.createContext()

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <TabContext.Provider
      value={{
        activeTab,
        setActiveTab
      }}
    >
      <div data-reach-tabs>{children}</div>
    </TabContext.Provider>
  )
}

function TabList({ children }) {
  return <div data-reach-tab-list>{children}</div>
}

function Tab({ children, tab, onClick, disabled }) {
  const { activeTab, setActiveTab } = useContext(TabContext)

  const isActive = tab === activeTab
  return (
    <div
      data-reach-tab
      className={disabled ? "disabled" : isActive ? "active" : ""}
      onClick={disabled ? () => null : () => setActiveTab(tab)}
    >
      {children}
    </div>
  )
}

function TabPanels({ children }) {
  const { activeTab } = useContext(TabContext)

  children = React.Children.map(children, child => {
    if (child.props.tab === activeTab) {
      return child
    } else {
      return null
    }
  })

  return <div data-reach-tab-panels>{children}</div>
}

function TabPanel({ children }) {
  return children
}

export default function LoggedOut() {
  return (
    <div className="LoggedOut">
      <About />

      <Tabs defaultTab="login">
        <TabPanels>
          <TabPanel tab="login">
            <LoginForm />
          </TabPanel>
          <TabPanel tab="signup">
            <SignupForm />
          </TabPanel>
        </TabPanels>
        <TabList>
          <Tab tab="login">Login</Tab>
          <Tab tab="signup" isActive>
            Signup
          </Tab>
        </TabList>
      </Tabs>
    </div>
  )
}
