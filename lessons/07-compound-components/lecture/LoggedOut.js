import React, { useState, useContext, createContext, Children } from "react"

import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"

const TabContext = React.createContext()

function Tabs({ children, disabled = [] }) {
  const [activeIndex, setActiveIndex] = useState(1)

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

function TabList({ children }) {
  const { activeIndex, setActiveIndex } = useContext(TabContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isActive: index === activeIndex,
      onClick: () => setActiveIndex(index)
    })
  })

  return <div data-reach-tab-list>{children}</div>
}

function Tab({ children, isActive, onClick, disabled }) {
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
  const { activeIndex } = useContext(TabContext)
  return <div data-reach-tab-panels>{children[activeIndex]}</div>
}

function TabPanel({ children }) {
  return children
}

export default function LoggedOut() {
  // const tabData = [
  //   {
  //     label: "Login",
  //     content:
  //   },
  //   {
  //     label: "Signup",
  //     content:
  //   }
  // ]

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
          <Tab disabled>Login</Tab>
          <Tab>Signup</Tab>
        </TabList>
      </Tabs>
    </div>
  )
}
