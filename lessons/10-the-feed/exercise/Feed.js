import React, { useEffect, useState } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from "./Feed.final"
// export default FeedFinal
export default Feed

function Feed() {
  const [posts, setPosts] = useState([])
  const [newPosts, setNewPosts] = useState([])
  const [countAtTime, setCountAtTime] = useState({
    count: 3,
    timestamp: Date.now()
  })

  const { count, timestamp } = countAtTime

  useEffect(() => {
    loadFeedPosts(timestamp, count).then(data => {
      setPosts(data)
    })
  }, [count, timestamp])

  useEffect(() => {
    const unsubscribe = subscribeToNewFeedPosts(timestamp, data => {
      setNewPosts(data)
    })

    return () => {
      unsubscribe()
    }
  }, [timestamp])

  return (
    <div className="Feed">
      <div className="Feed_button_wrapper">
        {newPosts.length > 0 ? (
          <button
            className="Feed_new_posts_button icon_button"
            onClick={() => {
              setCountAtTime({
                timestamp: Date.now(),
                count: count + newPosts.length
              })
              setNewPosts([])
            }}
          >
            View {newPosts.length} New{" "}
            {newPosts.length === 1 ? "Post" : "Posts"}
          </button>
        ) : (
          <div>No new posts</div>
        )}
      </div>

      {posts.map(post => {
        return <FeedPost post={post} key={post.id} />
      })}

      <div className="Feed_button_wrapper">
        <button
          className="Feed_new_posts_button icon_button"
          onClick={() => {
            setCountAtTime({
              ...countAtTime,
              count: count + 3
            })
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
