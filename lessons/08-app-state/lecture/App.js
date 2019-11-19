import React from "react"
import LoggedIn from "app/LoggedIn"
import LoggedOut from "app/LoggedOut"
import { AppStateProvider } from "app/app-state"
import appReducer, { initialState } from "app/appReducer"
import useAuth from "app/useAuth"

// function someAsyncFunction() {
//   // fetch('whatever').then(() => {
//   //   dispatch(...)
//   // })
// }

function App() {
  const { authAttempted, auth } = useAuth()

  // const [ example, setExample ] = useState({
  //   fish: 'true',
  //   cake: false
  // })

  // setExample( { ...example, cake: true } )

  if (!authAttempted) return null

  return (
    <div className="Layout">
      {/* <button onClick={someAsyncFunction}> AHHHH </button> */}
      {auth ? <LoggedIn /> : <LoggedOut />}
    </div>
  )
}

export default () => (
  <AppStateProvider
    reducer={appReducer}
    initialState={initialState}
  >
    <App />
  </AppStateProvider>
)
