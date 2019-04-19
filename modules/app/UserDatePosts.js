import React from "react"
import { useParams } from "app/packages/react-router-next"
import Posts from "app/Posts"

export default function UserDatePosts() {
  const params = useParams()
  return (
    <div className="PostsRoute">
      <Posts params={params} />
    </div>
  )
}
