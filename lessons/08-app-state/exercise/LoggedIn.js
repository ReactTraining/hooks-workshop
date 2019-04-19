import React, { useEffect, Fragment } from "react"
import { Router, Route, DefaultRoute } from "app/packages/react-router-next"
import { fetchUser, isValidDate } from "app/utils"
import { useAppState } from "app/app-state"
import UserDatePosts from "app/UserDatePosts"
import Feed from "app/Feed"
import Dashboard from "app/Dashboard"
import TopBar from "app/TopBar"
import User from "app/User"
import NotFound from "app/NotFound"

export default function LoggedIn() {
  const user = null

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
  ) : <div>No user! Go fix it :D</div>
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
