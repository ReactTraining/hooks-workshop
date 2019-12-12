import React, {
  useState,
  useContext,
  createContext,
  Children
} from "react"

import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"

// We're going to be doing lecture 7 next!
// npm start lecture
// 7
// LoggedOut.js in 07-compound-components

function Tabs({
  data,
  tabPosition = "top",
  disabled = []
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  const tabs = (
    <div data-reach-tab-list>
      {data.map((tab, index) => {
        const isActive = index === activeIndex
        const isDisabled = disabled.includes(index)

        return (
          <div
            data-reach-tab
            key={index}
            className={
              isDisabled
                ? "disabled"
                : isActive
                ? "active"
                : ""
            }
            onClick={() => {
              if (!isDisabled) setActiveIndex(index)
            }}
          >
            {tab.label}
          </div>
        )
      })}
    </div>
  )

  const panels = (
    <div data-reach-tab-panels>
      {data[activeIndex].content}
    </div>
  )

  return (
    <div data-reach-tabs>
      {tabPosition === "bottom"
        ? [panels, tabs]
        : [tabs, panels]}
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
      <Tabs
        data={tabData}
        tabPosition="bottom"
        disabled={[1]}
      />
    </div>
  )
}
