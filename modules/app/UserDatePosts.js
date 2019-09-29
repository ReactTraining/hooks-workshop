import React from "react"
import { useParams } from "./packages/react-router-next"
import Posts from "./Posts"

export default function UserDatePosts() {
  const params = useParams()
  return (
    <div className="PostsRoute">
      <Posts params={params} />
    </div>
  )
}
