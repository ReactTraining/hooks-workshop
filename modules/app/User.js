import React from "react"
import { sortByCreatedAtDescending } from "./utils"
import FeedPost from "./FeedPost"
import Meta from "./Meta"
import usePosts from "./usePosts"
import { useParams } from "./packages/react-router-next"
import useDocWithCache from "./useDocWithCache"

export default function User() {
  const { uid } = useParams()
  const user = useDocWithCache(`users/${uid}`)
  return user ? (
    <div>
      <Meta user={user} />
      <UserFeed user={user} />
    </div>
  ) : null
}

function UserFeed({ user }) {
  const posts = usePosts(user.uid)
  return posts ? (
    <div className="Feed">
      {posts.sort(sortByCreatedAtDescending).map(post => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  ) : null
}
