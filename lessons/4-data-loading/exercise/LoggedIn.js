import React, { useEffect, Fragment } from "react"

import { AppStateProvider, useAppState } from "app/app-state"
import appReducer, { initialState } from "app/appReducer"
import { fetchDoc, isValidDate } from "app/utils"
import { Router, Route, DefaultRoute } from "app/packages/react-router-next"
import UserDatePosts from "app/UserDatePosts"
import Feed from "app/Feed"
import Dashboard from "app/Dashboard"
import TopBar from "app/TopBar"
import User from "app/User"
import NotFound from "app/NotFound"

function LoggedIn() {
  const [{ auth, user }, dispatch] = useAppState()

  useEffect(() => {
    if (!user) {
      let isCurrent = true
      fetchDoc(`users/${auth.uid}`).then(user => {
        if (isCurrent) {
          dispatch({ type: "LOAD_USER", user })
        }
      })
      return () => (isCurrent = false)
    }
  }, [user, auth.uid, dispatch])

  return user ? (
    <Fragment>
      <TopBar />
      <div className="Main">
        <Router>
          <Route path=".">
            <Dashboard />
          </Route>
          <Route
            path=":uid/:date"
            matchState={state => state && state.fromCalendar}
            validate={hasValidDateParam}
          >
            <Dashboard />
          </Route>
          <Route path=":uid/:date" validate={hasValidDateParam}>
            <UserDatePosts />
          </Route>
          <Route path=":uid">
            <User />
          </Route>
          <Route path="feed">
            <Feed />
          </Route>
          <DefaultRoute>
            <NotFound />
          </DefaultRoute>
        </Router>
      </div>
    </Fragment>
  ) : null
}

function hasValidDateParam({ params }) {
  const [year, month, day] = params.date.split("-")
  const isValid = isValidDate(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10)
  )
  return isValid
}

export default function({ auth }) {
  return (
    <AppStateProvider
      reducer={appReducer}
      initialState={{ ...initialState, auth }}
    >
      <LoggedIn />
    </AppStateProvider>
  )
}
