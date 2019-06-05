import React, { useState, useContext } from "react"

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

function TabsList({ children }) {
  const context = useContext(TabContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isActive: index === context.activeIndex,
      onClick: () => {
        context.setActiveIndex(index)
      }
    })
  })

  return <div data-reach-tab-list>{children}</div>
}

function Tab({ children, isActive, onClick, disabled, ...rest }) {
  return (
    <div
      data-reach-tab
      className={disabled ? "disabled" : isActive ? "active" : ""}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  )
}

function TabPanels({ children }) {
  const context = useContext(TabContext)
  return <div data-reach-tab-panels>{children[context.activeIndex]}</div>
}

function TabPanel({ children }) {
  return children
}

export { Tabs, TabsList, Tab, TabPanels, TabPanel }
