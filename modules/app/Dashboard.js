import React, { Fragment, useState, useCallback } from "react"
import { Link, useLocation, useParams } from "app/packages/react-router-next"
import { useTransition, animated } from "react-spring"
import { FaChevronDown, FaChevronUp, FaPlus } from "react-icons/fa"
import {
  format as formatDate,
  subDays,
  addDays,
  isFirstDayOfMonth,
  isToday,
  isFuture
} from "date-fns"

import AnimatedDialog from "app/AnimatedDialog"
import Posts from "app/Posts"
import usePosts from "app/usePosts"
import Meta from "app/Meta"
import { DATE_FORMAT, calculateWeeks, calculateTotalMinutes } from "app/utils"
import { useAppState } from "app/app-state"
import NewPost from "app/NewPost"
import AnimatedText from "app/AnimatedText"

export default function Dashboard() {
  const [{ user }] = useAppState()
  const { location, navigate } = useLocation()
  const showDayInModal = location.state && location.state.fromCalendar
  const params = useParams()
  const posts = usePosts(user.uid)

  return (
    <Fragment>
      <AnimatedDialog isOpen={showDayInModal} onDismiss={() => navigate(-1)}>
        <Posts params={params} />
      </AnimatedDialog>
      {posts ? (
        <div className="UserCalendar">
          <Meta user={user} />
          <Calendar user={user} posts={posts} modalIsOpen={showDayInModal} />
        </div>
      ) : null}
    </Fragment>
  )
}

function Calendar({ user, posts, modalIsOpen }) {
  const [{ auth }] = useAppState()

  const [newPostDate, setNewPostDate] = useState(null)
  const [dayWithNewPost, setDayWithNewPost] = useState(null)

  const today = formatDate(new Date(), DATE_FORMAT)
  const { navigate, location } = useLocation()

  const startDate =
    location.state && location.state.startDate
      ? location.state.startDate
      : today

  const showLater = startDate !== today

  const isOwner = auth.uid === user.uid
  const numWeeks = 5

  const weeks = calculateWeeks(posts, startDate, numWeeks)

  const [prevStart, setPrevStart] = useState(startDate)
  const [transitionDirection, setTransitionDirection] = useState()
  if (prevStart !== startDate) {
    setTransitionDirection(startDate < prevStart ? "earlier" : "later")
    setPrevStart(startDate)
  }

  const transitions = useTransition(
    { weeks, startDate },
    item => item.startDate,
    {
      from: { y: -105 },
      enter: { y: 0 },
      leave: { y: 105 },
      initial: null
    }
  )

  const handleNav = (addOrSubDays, direction) => {
    const date = formatDate(addOrSubDays(startDate, 7 * numWeeks), DATE_FORMAT)
    navigate(".", { state: { startDate: date, direction } })
  }

  const handleEarlierClick = () => handleNav(subDays, "earlier")
  const handleLaterClick = () => handleNav(addDays, "later")

  const closeDialog = () => setNewPostDate(null)

  const handleNewPostSuccess = () => {
    setDayWithNewPost(formatDate(newPostDate, DATE_FORMAT))
    closeDialog()
  }

  const handleAnimationRest = useCallback(() => {
    setDayWithNewPost(null)
  }, [setDayWithNewPost])

  if (!auth) return null

  return (
    <Fragment>
      <AnimatedDialog isOpen={!!newPostDate} onDismiss={closeDialog}>
        <NewPost date={newPostDate} onSuccess={handleNewPostSuccess} />
      </AnimatedDialog>
      <div className="Calendar">
        <Weekdays />
        <div className="Calendar_animation_overflow">
          {transitions.map(({ item, props: { y }, key }, index) => {
            if (!item) return null
            let transform = "translate3d(0px, 0%, 0px)"
            if (transitionDirection === "earlier") {
              transform = y.interpolate(y => `translate3d(0px, ${y}%, 0px)`)
            } else if (transitionDirection === "later") {
              transform = y.interpolate(y => `translate3d(0px, ${-y}%, 0px)`)
            }
            return (
              <animated.div
                key={key}
                className="Calendar_animation_wrapper"
                style={{ transform, zIndex: index }}
              >
                {item.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="Calendar_week">
                    {week.map((day, dayIndex) => {
                      const showMonth =
                        weekIndex + dayIndex === 0 ||
                        isFirstDayOfMonth(day.date)
                      return (
                        <Day
                          modalIsOpen={modalIsOpen}
                          user={user}
                          key={dayIndex}
                          showMonth={showMonth}
                          day={day}
                          isOwner={isOwner}
                          onNewPost={() => setNewPostDate(day.date)}
                          hasNewPost={
                            dayWithNewPost === formatDate(day.date, DATE_FORMAT)
                          }
                          onAnimatedTextRest={handleAnimationRest}
                        />
                      )
                    })}
                  </div>
                ))}
              </animated.div>
            )
          })}
        </div>
        <CalendarNav
          showLater={showLater}
          onEarlier={handleEarlierClick}
          onLater={handleLaterClick}
        />
      </div>
    </Fragment>
  )
}

function CalendarNav({ onEarlier, onLater, showLater }) {
  return (
    <div className="Calendar_nav">
      <button className="Calendar_earlier icon_button" onClick={onEarlier}>
        <FaChevronUp /> <span>Earlier</span>
      </button>
      {showLater && (
        <button className="Calendar_later icon_button" onClick={onLater}>
          <FaChevronDown /> <span>Later</span>
        </button>
      )}
    </div>
  )
}

function Weekdays() {
  return (
    <div className="Weekdays">
      <div>Sunday</div>
      <div>Monday</div>
      <div>Tuesday</div>
      <div>Wednesday</div>
      <div>Thursday</div>
      <div>Friday</div>
      <div>Saturday</div>
    </div>
  )
}

function Day({
  user,
  day,
  showMonth,
  isOwner,
  onNewPost,
  hasNewPost,
  modalIsOpen,
  onAnimatedTextRest
}) {
  const dayIsToday = isToday(day.date)
  const dayIsFuture = isFuture(day.date)
  const totalMinutes = calculateTotalMinutes(day.posts)
  const animateMinutes = hasNewPost && !modalIsOpen
  const { location } = useLocation()

  return (
    <div
      className={
        "Day" +
        (totalMinutes ? "" : " Day_no_minutes") +
        (dayIsToday ? " Day_is_today" : "") +
        (dayIsFuture ? " Day_is_future" : "")
      }
    >
      <div className="Day_date">
        {showMonth && (
          <div className="Day_month">{formatDate(day.date, "MMM")}</div>
        )}
        <div className="Day_number">{formatDate(day.date, "DD")}</div>
      </div>
      <div className="Day_minutes">
        {totalMinutes ? (
          <Link
            className="Day_link"
            href={`/${user.uid}/${formatDate(day.date, DATE_FORMAT)}`}
            state={{
              fromCalendar: true,
              ...location.state
            }}
          >
            {animateMinutes ? (
              <AnimatedText
                children={totalMinutes}
                className="Calendar_minutes_text"
                onRest={onAnimatedTextRest}
              />
            ) : (
              <span children={totalMinutes} className="Calendar_minutes_text" />
            )}
          </Link>
        ) : dayIsFuture ? (
          <span className="Calendar_future" />
        ) : isOwner ? (
          <button onClick={onNewPost} className="Calendar_add_post_button">
            <FaPlus />
          </button>
        ) : null}
      </div>
    </div>
  )
}
