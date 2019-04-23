import React, { useState, useContext, createContext, Children } from 'react'

import LoginForm from 'app/LoginForm'
import SignupForm from 'app/SignupForm'
import About from 'app/About'

// function Tabs({ data, tabsPosition = 'top', disabled = [] }) {
//   const [activeIndex, setActiveIndex] = useState(0)

//   const tabList = (
//     <div data-reach-tab-list>
//       {data.map((tab, index) => {
//         const isActive = index === activeIndex
//         const isDisabled = disabled.includes(index)
//         return (
//           <div
//             data-reach-tab
//             key={index}
//             className={isDisabled ? 'disabled' : isActive ? 'active' : ''}
//             onClick={isDisabled ? undefined : () => setActiveIndex(index)}
//           >
//             {tab.label}
//           </div>
//         )
//       })}
//     </div>
//   )

//   const tabPanels = <div data-reach-tab-panels>{data[activeIndex].content}</div>

//   return (
//     <div data-reach-tabs>
//       {tabsPosition === 'bottom' ? [tabPanels, tabList] : [tabList, tabPanels]}
//     </div>
//   )
// }

const TabsContext = createContext()

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div data-reach-tabs>{children}</div>
    </TabsContext.Provider>
  )
}

const TabContext = createContext()

function TabList({ children }) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext)
  return (
    <div data-reach-tab-list>
      {Children.map(children, (child, index) => (
        <TabContext.Provider
          value={{
            isActive: index === activeIndex,
            onSelect: () => setActiveIndex(index)
          }}
        >
          {child}
        </TabContext.Provider>
      ))}
    </div>
  )
}

function Tab({ children, disabled = false }) {
  const { isActive, onSelect } = useContext(TabContext)
  return (
    <div
      data-reach-tab
      className={disabled ? 'disabled' : isActive ? 'active' : ''}
      onClick={disabled ? undefined : onSelect}
    >
      {children}
    </div>
  )
}

function TabPanels({ children }) {
  const { activeIndex } = useContext(TabsContext)
  return (
    <div data-reach-tab-panels>{Children.toArray(children)[activeIndex]}</div>
  )
}

function TabPanel({ children }) {
  return <div>{children}</div>
}

export default function LoggedOut() {
  return (
    <div className="LoggedOut">
      <About />
      <Tabs>
        <TabList>
          <Tab>Login</Tab>
          <Tab disabled>Signup</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginForm />
          </TabPanel>
          <TabPanel>
            <SignupForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )

  // const tabData = [
  //   {
  //     label: 'Login',
  //     content: <LoginForm />
  //   },
  //   {
  //     label: 'Signup',
  //     content: <SignupForm />
  //   }
  // ]

  // return (
  //   <div className="LoggedOut">
  //     <About />
  //     <Tabs data={tabData} tabsPosition="bottom" disabled={[1]} />
  //   </div>
  // )
}
