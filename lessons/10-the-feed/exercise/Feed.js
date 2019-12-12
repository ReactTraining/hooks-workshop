import React, { useState, useEffect } from "react"
import FeedPost from "app/FeedPost"
import {
  loadFeedPosts,
  subscribeToNewFeedPosts
} from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

function Feed() {
  const [posts, setPosts] = useState([])
  const [limit, setLimit] = useState(3)
  const [time, setTime] = useState(Date.now())
  const [newPosts, setNewPosts] = useState([])

  useEffect(() => {
    let isCurrent = true

    loadFeedPosts(time, limit).then(p => {
      if (isCurrent) setPosts(p)
    })

    return () => {
      isCurrent = false
    }
  }, [time, limit])

  useEffect(
    () => subscribeToNewFeedPosts(time, setNewPosts),
    [time]
  )

  return (
    <div className="Feed">
      {newPosts.length > 0 && (
        <div className="Feed_button_wrapper">
          <button className="Feed_new_posts_button icon_button">
            View {newPosts.length} New Posts
          </button>
        </div>
      )}

      {posts.map(post => {
        return (
          <FeedPost key={"Post_" + post.id} post={post} />
        )
      })}

      <div className="Feed_button_wrapper">
        <button
          className="Feed_new_posts_button icon_button"
          onClick={() => {
            setLimit(limit + 3)
          }}
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
