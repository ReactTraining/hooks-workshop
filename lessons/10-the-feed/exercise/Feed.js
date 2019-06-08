import React, { useReducer, useEffect } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
export default Feed

function Feed() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "LOAD_POSTS":
          return { ...state, posts: action.posts }
        case "LOAD_NEW_POSTS":
          return { ...state, newPosts: action.posts }
        case "VIEW_NEW_POSTS":
          return {
            ...state,
            posts: state.posts.concat(state.newPosts),
            time: Date.now(),
            newPosts: []
          }
        case "VIEW_MORE":
          return { ...state, limit: state.limit + 3 }
        default:
          return state
      }
    },
    {
      posts: null,
      newPosts: [],
      limit: 3,
      time: Date.now()
    }
  )

  const { posts, newPosts, limit, time } = state

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
    return subscribeToNewFeedPosts(time, posts => {
      dispatch({ type: "LOAD_NEW_POSTS", posts })
    })
  }, [time])

  const viewPosts = () => {
    dispatch({ type: "VIEW_NEW_POSTS" })
  }

  useEffect(() => {
    document.title = `Facebook (${newPosts.length})`
  }, [newPosts.length])

  return (
    <div className="Feed">
      {newPosts.length > 0 && (
        <div className="Feed_button_wrapper">
          <button
            className="Feed_new_posts_button icon_button"
            onClick={viewPosts}
          >
            View {newPosts.length} New Posts
          </button>
        </div>
      )}

      {Array.isArray(posts) &&
        posts.map(post => <FeedPost key={post.id} post={post} />)}

      <div className="Feed_button_wrapper">
        <button
          className="Feed_new_posts_button icon_button"
          onClick={() => dispatch({ type: "VIEW_MOREX" })}
        >
          View More
        </button>
      </div>
    </div>
  )
}
