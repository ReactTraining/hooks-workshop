import React, { useState, useContext } from "react"

import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"

const TabsContext = React.createContext()

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <TabsContext.Provider
      value={{
        activeIndex,
        setActiveIndex
      }}
    >
      <div data-reach-tabs>{children}</div>
    </TabsContext.Provider>
  )
}

function TabList({ children }) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isActive: activeIndex === index,
      onClick: () => setActiveIndex(index)
    })
  })

  return <div data-reach-tab-list>{children}</div>
}

function Tab({ children, isActive, onClick, disabled = false }) {
  return (
    <div
      data-reach-tab
      className={disabled ? "disabled" : isActive ? "active" : ""}
      onClick={disabled ? () => null : onClick}
    >
      {children}
    </div>
  )
}

function TabPanels({ children }) {
  const { activeIndex } = useContext(TabsContext)
  return <div data-reach-tab-panels>{children[activeIndex]}</div>
}

function TabPanel({ children }) {
  return children
}

export default function LoggedOut() {
  return (
    <div className="LoggedOut">
      <About />
      <Tabs>
        <TabPanels>
          <TabPanel>
            <LoginForm />
          </TabPanel>
          <TabPanel>
            <SignupForm />
          </TabPanel>
        </TabPanels>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Logout</Tab>
        </TabList>
      </Tabs>
    </div>
  )
}
