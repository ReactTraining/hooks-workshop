import React, { useEffect, useState, useReducer } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

function Feed() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "LOAD_POSTS":
          return { ...state, posts: action.posts }
        case "LOAD_NEW_POSTS":
          return { ...state, newPosts: action.newPosts }
        case "VIEW_NEW_POSTS":
          return {
            ...state,
            posts: state.newPosts.concat(state.posts),
            newPosts: [],
            time: Date.now()
          }
        case "CHANGE_LIMIT": {
          return { ...state, limit: state.limit + 3 }
        }
      }
    },
    {
      posts: null,
      newPosts: [],
      time: Date.now(),
      limit: 3
    }
  )

  const { posts, newPosts, time, limit } = state

  useEffect(() => {
    let isCurrent = true
    loadFeedPosts(time, limit).then(posts => {
      if (isCurrent) {
        dispatch({ type: "LOAD_POSTS", posts })
      }
    })
    return () => {
      isCurrent = false
    }
  }, [time, limit])

  useEffect(() => {
    return subscribeToNewFeedPosts(time, newPosts => {
      dispatch({ type: "LOAD_NEW_POSTS", newPosts })
      // setNewPosts(newPosts)
    })
  }, [time])

  function viewNewPosts() {
    dispatch({ type: "VIEW_NEW_POSTS" })
  }

  return (
    <div className="Feed">
      <div className="Feed_button_wrapper">
        <button
          onClick={viewNewPosts}
          className="Feed_new_posts_button icon_button"
        >
          View {newPosts.length} New Posts
        </button>
      </div>

      {Array.isArray(posts) &&
        posts.map(post => {
          return <FeedPost post={post} key={post.id} />
        })}

      <div className="Feed_button_wrapper">
        <button
          onClick={() => {
            dispatch({ type: "CHANGE_LIMIT" })
          }}
          className="Feed_new_posts_button icon_button"
        >
          View More
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
