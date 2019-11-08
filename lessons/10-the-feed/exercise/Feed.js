import React, { useState, useEffect, useReducer } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

const initialFeedState = {
  newPosts: [],
  posts: [],
  time: Date.now(),
  limit: 3
}

function feedReducer(state, action) {
  switch (action.type) {
    case "POSTS_LOADED":
      return {
        ...state,
        posts: action.data
      }
    case "SHOW_MORE_POSTS":
      return {
        ...state,
        limit: state.limit + 3
      }
    case "NEW_POSTS_LOADED":
      return {
        ...state,
        newPosts: action.data
      }
    case "VIEW_NEW_POSTS":
      // setTime(Date.now())
      // setLimit(limit + newPosts.length)
      // setNewPosts([])
      return {
        ...state,
        time: Date.now(),
        limit: state.limit + state.newPosts.length,
        newPosts: []
      }
    // ...
    default:
      return state
  }
}

function usePersistentReducer(reducer, initialState) {
  const randomKey = `${Date.now() * Math.random()}`

  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem(randomKey)) || initialState
  )

  useEffect(() => {
    localStorage.setItem(randomKey, JSON.stringify(state))
  }, [state])

  return [state, dispatch]
}

function Feed() {
  const [feedState, dispatch] = usePersistentReducer(
    feedReducer,
    initialFeedState
  )
  const { newPosts, posts, time, limit } = feedState

  useEffect(() => {
    localStorage.setItem("feed", JSON.stringify(feedState))
  }, [feedState])

  useEffect(() => {
    let canceled = false

    loadFeedPosts(time, limit).then(data => {
      if (!canceled) {
        dispatch({
          type: "POSTS_LOADED",
          data
        })
      }
    })

    return () => {
      canceled = true
    }
  }, [time, limit])

  useEffect(() => {
    const cleanup = subscribeToNewFeedPosts(time, data => {
      dispatch({ type: "NEW_POSTS_LOADED", data })
    })

    return cleanup
  }, [time])

  return (
    <div className="Feed">
      {newPosts.length > 0 && (
        <div className="Feed_button_wrapper">
          <button
            className="Feed_new_posts_button icon_button"
            onClick={() => {
              dispatch({ type: "VIEW_NEW_POSTS" })
            }}
          >
            View {newPosts.length} New Posts
          </button>
        </div>
      )}

      {posts.map(post => {
        return <FeedPost key={post.id} post={post} />
      })}

      <div className="Feed_button_wrapper">
        <button
          className="Feed_new_posts_button icon_button"
          onClick={() => {
            dispatch({
              type: "SHOW_MORE_POSTS"
            })
          }}
        >
          View 3 More
        </button>
      </div>
    </div>
  )
}

// you can delete this
const fakePost = {
  createdAt: Date.now() - 10000,
  date: "2019-03-30",
  message: "Went for a run",
  minutes: 45,
  uid: "0BrC0fB6r2Rb5MNxyQxu5EnYacf2"
}
