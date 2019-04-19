import React, { Fragment } from "react"
import usePosts from "app/usePosts"
import {
  calculateTotalMinutes,
  calculateExpectedMinutes,
  calculateMakeup
} from "app/utils"
import Avatar from "app/Avatar"

export default function Meta({ user }) {
  const posts = usePosts(user.uid)
  if (!posts) return null

  const total = calculateTotalMinutes(posts)
  const expected = calculateExpectedMinutes(user)
  const deficit = expected - total

  return (
    <div className="Meta">
      <Avatar className="Meta_avatar" uid={user.uid} size={200} bg="white" />
      <div className="Meta_data">
        <div className="Meta_point Meta_expected">
          <div className="Meta_heading">Expected Minutes:</div>
          <div className="Meta_value">{expected}</div>
        </div>
        <div className="Meta_point Meta_total">
          <div className="Meta_heading">Total Minutes:</div>
          <div className="Meta_value">{total}</div>
        </div>
        {deficit === 0 ? (
          <div className="Meta_point Meta_on_track">
            <div className="Meta_heading">On Track:</div>
            <div className="Meta_value">{deficit}</div>
          </div>
        ) : deficit > 0 ? (
          <Fragment>
            <div className="Meta_point Meta_deficit">
              <div className="Meta_heading">Minutes Short:</div>
              <div className="Meta_value">{deficit}</div>
            </div>
            <div className="Meta_point Meta_makeup">
              <div className="Meta_heading">Makeup Workouts:</div>
              <div className="Meta_value">
                {calculateMakeup(total, expected, user.goal)}
              </div>
            </div>
          </Fragment>
        ) : deficit < 0 ? (
          <div className="Meta_point Meta_surplus">
            <div className="Meta_heading">Surplus:</div>
            <div className="Meta_value">{-deficit}</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
