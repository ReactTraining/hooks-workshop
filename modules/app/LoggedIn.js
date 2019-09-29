import React, { useEffect, Fragment } from "react"
import { Router, Route, DefaultRoute } from "./packages/react-router-next"
import { fetchDoc, isValidDate } from "./utils"
import { useAppState } from "./app-state"
import UserDatePosts from "./UserDatePosts"
import Feed from "./Feed"
import Dashboard from "./Dashboard"
import TopBar from "./TopBar"
import User from "./User"
import NotFound from "./NotFound"

export default function LoggedIn() {
  const [{ auth, user }, dispatch] = useAppState()

  useEffect(() => {
    if (!user) {
      fetchDoc(`users/${auth.uid}`).then(user => {
        // okay to dispatch even if unmounted, might as well
        // get it in the app state cache
        dispatch({ type: "LOAD_USER", user })
      })
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

const hasValidDateParam = ({ params }) => {
  const [year, month, day] = params.date.split("-")
  const isValid = isValidDate(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10)
  )
  return isValid
}
