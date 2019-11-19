import React, { useState, useEffect, useReducer } from 'react'
import FeedPost from 'app/FeedPost'
import { loadFeedPosts, subscribeToNewFeedPosts } from 'app/utils'
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

const fakePost = {
  createdAt: Date.now() - 10000,
  date: '2019-03-30',
  message: 'Went for a run',
  minutes: 45,
  uid: '0BrC0fB6r2Rb5MNxyQxu5EnYacf2'
}

const initialFeedState = {
  posts: [fakePost],
  limit: 3,
  time: Date.now(),
  newPosts: []
}

function feedReducer(state, action) {
  switch (action.type) {
    case 'VIEW_MORE_POSTS':
      return {
        ...state,
        limit: state.limit + 3
      }

    case 'RESOLVE_POSTS':
      return {
        ...state,
        posts: action.data
      }
    case 'RECEIVE_NEW_POSTS':
      return {
        ...state,
        newPosts: action.data
      }

    case 'VIEW_NEW_POSTS':
      // setLimit(limit + newPosts.length)
      // setTime(Date.now())
      // setNewPosts([])
      return {
        ...state,
        limit: state.limit + state.newPosts.length,
        time: Date.now(),
        newPosts: []
      }
    // handle when the action is "View more posts" or whatever
    // what changes?

    // handle when the action is "View X new posts"
    // what changes?
    default:
      return state
  }
}

function usePersistedReducer(reducer, initialState) {
  const persistedState = localStorage.getItem('feed')
    ? JSON.parse(localStorage.getItem('feed'))
    : initialState
  const [state, dispatch] = useReducer(reducer, persistedState)

  useEffect(() => {
    localStorage.setItem('feed', JSON.stringify(state))
  }, [state])

  return [state, dispatch]
}

function Feed() {
  const [state, dispatch] = usePersistedReducer(feedReducer, initialFeedState)

  const { posts, limit, time, newPosts } = state

  useEffect(() => {
    let canceled = false

    loadFeedPosts(time, limit).then(data => {
      if (canceled) return

      dispatch({
        type: 'RESOLVE_POSTS',
        data
      })
    })

    return () => {
      canceled = true
    }
  }, [limit, time])

  useEffect(() => {
    const cleanup = subscribeToNewFeedPosts(time, data => {
      dispatch({
        type: 'RECEIVE_NEW_POSTS',
        data
      })
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
              dispatch({ type: 'VIEW_NEW_POSTS' })
            }}
          >
            View {newPosts.length} New{' '}
            {newPosts.length === 1 ? 'Post' : 'Posts'}
          </button>
        </div>
      )}

      {posts.map(post => {
        return <FeedPost post={post} key={post.id} />
      })}

      <div className="Feed_button_wrapper">
        <button
          className="Feed_new_posts_button icon_button"
          onClick={() => {
            dispatch({ type: 'VIEW_MORE_POSTS' })
          }}
        >
          View 3 More
        </button>
      </div>
    </div>
  )
}
