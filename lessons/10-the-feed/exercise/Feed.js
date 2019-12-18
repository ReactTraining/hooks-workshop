import React, { useEffect, useState } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

const LIMIT_INCREMENT = 3

function Feed() {
  const [posts, setPosts] = useState(null)
  const [newPosts, setNewPosts] = useState([])
  const [time, setTime] = useState(Date.now())
  const [limit, setLimit] = useState(6)

  useEffect(() => {
    loadFeedPosts(time, limit).then(posts => {
      setPosts(posts)
    })
  }, [limit, time])

  useEffect(() => {
    return subscribeToNewFeedPosts(time, posts => {
      setNewPosts(posts)
    })
  }, [time])

  function loadNewPosts() {
    const combined = newPosts.concat(posts)
    setPosts(combined)
    setNewPosts([])
    setLimit(combined.length)
    setTime(Date.now())
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

      {Array.isArray(posts) &&
        posts.map(post => {
          return <FeedPost post={post} />
        })}

      <div className="Feed_button_wrapper">
        <button
          onClick={() => {
            setLimit(limit + LIMIT_INCREMENT)
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
