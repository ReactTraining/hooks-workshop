import React, {
  useState,
  useContext,
  createContext,
  Children
} from "react"

import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"

const TabsContext = createContext()

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <TabsContext.Provider
      value={{ activeIndex, setActiveIndex }}
    >
      <div data-reach-tabs>{children}</div>
    </TabsContext.Provider>
  )
}

const TabListContext = createContext()

function TabList({ children }) {
  return (
    <div data-reach-tab-list>
      {children.map((child, index) => {
        return (
          <TabListContext.Provider
            key={"TabList_" + index}
            value={{ index }}
          >
            {child}
          </TabListContext.Provider>
        )
      })}
    </div>
  )
}

function Tab({ children, disabled }) {
  const { index } = useContext(TabListContext)
  const { activeIndex, setActiveIndex } = useContext(
    TabsContext
  )
  const isActive = index === activeIndex

  return (
    <div
      data-reach-tab
      className={
        disabled ? "disabled" : isActive ? "active" : ""
      }
      onClick={() => {
        if (!disabled) setActiveIndex(index)
      }}
    >
      {children}
    </div>
  )
}

function TabPanels({ children }) {
  const { activeIndex } = useContext(TabsContext)
  return (
    <div data-reach-tab-panels>{children[activeIndex]}</div>
  )
}

function TabPanel({ children }) {
  return <div data-reach-tab-panel>{children}</div>
}

function DataTabs({
  data,
  tabPosition = "top",
  disabled = []
}) {
  const tabs = (
    <TabList>
      {data.map((item, index) => {
        return (
          <Tab
            key={"Tab_" + index}
            disabled={disabled.includes(index)}
          >
            {item.label}
          </Tab>
        )
      })}
    </TabList>
  )

  const panels = (
    <TabPanels>
      {data.map((item, index) => {
        return (
          <TabPanel key={"TabPanel_" + index}>
            {item.content}
          </TabPanel>
        )
      })}
    </TabPanels>
  )

  return (
    <Tabs>
      {tabPosition === "bottom"
        ? [panels, tabs]
        : [tabs, panels]}
    </Tabs>
  )
}

export default function LoggedOut() {
  // return (
  //   <div className="LoggedOut">
  //     <About />
  //     <Tabs>
  //       <TabList>
  //         <Tab>Login</Tab>
  //         <Tab>Signup</Tab>
  //       </TabList>
  //       <TabPanels>
  //         <TabPanel>
  //           <LoginForm />
  //         </TabPanel>
  //         <TabPanel>
  //           <SignupForm />
  //         </TabPanel>
  //       </TabPanels>
  //     </Tabs>
  //   </div>
  // )

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
      <DataTabs
        data={tabData}
        tabPosition="top"
        disabled={[1]}
      />
    </div>
  )
}
