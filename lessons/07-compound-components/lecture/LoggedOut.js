import React, { useState, useContext, createContext, Children } from "react"

import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"

const TabContext = React.createContext()

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <TabContext.Provider
      value={{
        activeIndex,
        setActiveIndex
      }}
    >
      <div data-reach-tabs>{children}</div>
    </TabContext.Provider>
  )
}

function TabList({ children, onClick }) {
  const { activeIndex, setActiveIndex } = useContext(TabContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isActive: index === activeIndex,
      onClick: () => setActiveIndex(index)
    })
  })

  return <div data-reach-tab-list>{children}</div>
}

function Tab({ children, isActive, disabled, onClick, ...rest }) {
  return (
    <div
      {...rest}
      data-reach-tab
      className={disabled ? "disabled" : isActive ? "active" : ""}
      onClick={() => (disabled ? null : onClick())}
    >
      {children}
    </div>
  )
}

function TabPanels({ children }) {
  const { activeIndex } = useContext(TabContext)
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
        <TabList>
          <Tab className="">Login</Tab>
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
        <TabList>
          <Tab>Login</Tab>
          <Tab>Signup</Tab>
        </TabList>
      </Tabs>
    </div>
  )
}
