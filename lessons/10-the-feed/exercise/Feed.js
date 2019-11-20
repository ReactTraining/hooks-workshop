import React, { useState, useEffect } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
export default Feed

const LIMIT = 3

function Feed() {
  const [posts, setPosts] = useState([])
  const [newPosts, setNewPosts] = useState([])
  const [time, setTime] = useState(Date.now())
  const [limit, setLimit] = useState(LIMIT)

  useEffect(() => {
    let isCurrent = true
    loadFeedPosts(time, limit).then(posts => {
      if (isCurrent) {
        setPosts(posts)
      }
    })
    return () => (isCurrent = false)
  }, [limit, time])

  useEffect(() => {
    const unsubscribe = subscribeToNewFeedPosts(time, newPosts => {
      setNewPosts(newPosts)
    })
    return () => {
      unsubscribe()
    }
  }, [time])

  function loadNewPosts() {
    const x = newPosts.concat(posts)
    setPosts(x)
    setNewPosts([])
    setTime(Date.now())
    setLimit(x.length)
  }

  return (
    <div className="Feed">
      {newPosts.length > 0 && (
        <div className="Feed_button_wrapper">
          <button
            onClick={loadNewPosts}
            className="Feed_new_posts_button icon_button"
          >
            View {newPosts.length} New Posts
          </button>
        </div>
      )}

      {posts.map(post => (
        <FeedPost key={post.id} post={post} />
      ))}

      <div className="Feed_button_wrapper">
        <button
          onClick={() => {
            setLimit(limit + LIMIT)
          }}
          className="Feed_new_posts_button icon_button"
        >
          View More
        </button>
      </div>
    </div>
  )
}

// // you can delete this
// const fakePost = {
//   createdAt: Date.now() - 10000,
//   date: "2019-03-30",
//   message: "Went for a run",
//   minutes: 45,
//   uid: "0BrC0fB6r2Rb5MNxyQxu5EnYacf2"
// }
