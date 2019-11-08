import React, { useEffect, useState } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
export default Feed

function Feed() {
  const [posts, setPosts] = useState([])
  const [newPosts, setNewPosts] = useState([])
  const [createdBefore, setCreatedBefore] = useState(Date.now())
  const [limit, setLimit] = useState(6)

  useEffect(() => {
    loadFeedPosts(createdBefore, limit).then(posts => {
      setPosts(posts)
    })
  }, [createdBefore, limit])

  useEffect(() => {
    return subscribeToNewFeedPosts(createdBefore, newPosts => {
      console.log(newPosts)
      setNewPosts(newPosts)
    })
  }, [createdBefore])

  function loadNewPosts() {
    const mergedPosts = newPosts.concat(posts)
    setPosts(mergedPosts)
    setLimit(mergedPosts.length)
    setNewPosts([])
    setCreatedBefore(Date.now())
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
        <FeedPost post={post} key={post.id} />
      ))}

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

// // you can delete this
// const fakePost = {
//   createdAt: Date.now() - 10000,
//   date: "2019-03-30",
//   message: "Went for a run",
//   minutes: 45,
//   uid: "0BrC0fB6r2Rb5MNxyQxu5EnYacf2"
// }
