import React, {
  useState,
  useContext,
  createContext,
  Children
} from "react"

import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"

// npm start lecture
// 7

// All the stuff from yesterday is
// in the `fall-tour-chicago` branch
// maybe pull that later and not now heh

const TabsContext = createContext()

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [switched, setSwitched] = useState(false)

  let arr = children.slice()

  return (
    <TabsContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        switched,
        setSwitched
      }}
    >
      <div data-reach-tabs>
        {switched ? arr.reverse() : children}
      </div>
    </TabsContext.Provider>
  )
}

const TabListContext = createContext()

function TabList({ children }) {
  return (
    <div data-reach-tab-list>
      {Children.map(children, (child, index) => (
        <TabListContext.Provider
          key={index}
          value={{ index }}
        >
          {child}
        </TabListContext.Provider>
      ))}
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

function SwitchButton() {
  const { switched, setSwitched } = useContext(TabsContext)
  return (
    <button
      className="button"
      onClick={() => {
        setSwitched(!switched)
      }}
    >
      SWITCH THE TABS
    </button>
  )
}

function TabPanel({ children }) {
  return children
}

function DataTabs({
  data,
  tabsPosition = "top",
  disabled = []
}) {
  const tabs = (
    <TabList>
      {data.map((item, index) => (
        <Tab
          key={index}
          disabled={disabled.includes(index)}
        >
          {item.label}
        </Tab>
      ))}
    </TabList>
  )

  const panels = (
    <TabPanels>
      {data.map((item, index) => (
        <TabPanel key={index}>{item.content}</TabPanel>
      ))}
    </TabPanels>
  )

  return (
    <Tabs>
      {tabsPosition === "bottom"
        ? [panels, tabs]
        : [tabs, panels]}
    </Tabs>
  )
}

export default function LoggedOut() {
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
            <SwitchButton />
            <LoginForm />
          </TabPanel>
          <TabPanel>
            <SwitchButton />
            <SignupForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )

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
        tabsPosition="bottom"
        disabled={[1]}
      />
    </div>
  )
}
