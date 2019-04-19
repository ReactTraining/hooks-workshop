import React from "react"
import { sortByCreatedAtDescending } from "app/utils"
import FeedPost from "app/FeedPost"
import Meta from "app/Meta"
import usePosts from "app/usePosts"
import { useParams } from "app/packages/react-router-next"
import useDocWithCache from "app/useDocWithCache"

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
