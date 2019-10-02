import React, { useState, useContext, createContext, Children } from "react"

import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"

const TabsContext = createContext()

const TabListContext = createContext()

const TabList = ({ disabled = [] }) => {
  const { data, activeIndex, onIndexChange } = useContext(TabsContext)

  return (
    <div data-reach-tab-list>
      <TabListContext.Provider value={activeIndex}>
        {data.map((tab, index) => {
          return <Tab index={index} label={tab.label} />
        })}
      </TabListContext.Provider>
    </div>
  )
}

const TabPanels = () => {
  const { data, activeIndex } = useContext(TabsContext)
  return <div data-reach-tab-panels>{data[activeIndex].content}</div>
}

const Tab = ({ index, children, label }) => {
  const activeIndex = useContext(TabListContext)
  const isActive = index === activeIndex

  return (
    <div
      data-reach-tab
      key={index}
      className={isActive ? "active" : ""}
      onClick={() => {
        // onIndexChange(index)
      }}
    >
      {label}
    </div>
  )
}

function Tabs({ data, children }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div data-reach-tabs>
      <TabsContext.Provider
        value={{
          data,
          activeIndex,
          onIndexChange: index => setActiveIndex(index)
        }}
      >
        {children}
      </TabsContext.Provider>
    </div>
  )
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
      <Tabs data={tabData}>
        <TabPanels />
        <TabList />
      </Tabs>
    </div>
  )
}
