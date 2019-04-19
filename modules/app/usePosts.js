import { useEffect, useState } from "react"
import { subscribeToPosts, fetchPosts } from "app/utils"

const cache = {}

export default function usePosts(uid, { listen } = { listen: true }) {
  const cached = cache[uid]
  const [posts, setPosts] = useState(cached)
  useEffect(() => {
    if (listen) {
      return subscribeToPosts(uid, posts => {
        cache[uid] = posts
        setPosts(posts)
      })
    }
  }, [uid, listen])
  return posts
}

export async function preloadPosts(uid) {
  cache[uid] = await fetchPosts(uid)
  return
}
