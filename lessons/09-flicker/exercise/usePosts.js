import { useState, useEffect } from "react"
import { subscribeToPosts, fetchPosts } from "app/utils"

// TODO: don't have avatars fetch everything about a user

// Let's code along this one together
// Check out Dashboard.js, it called usePosts but we aren't doing anything yet!

// export default function usePosts(uid) {
//   return null
// }

/******************************************************************************/
// We've got a `subscribeToPosts(uid, posts => {})` method, what do we do?

// export default function usePosts(uid) {
//   const [posts, setPosts] = useState(null)
//   useEffect(() => {
//     subscribeToPosts(uid, posts => {
//       setPosts(posts)
//     })
//   })
//   return posts
// }

/******************************************************************************/
// Oops, what did we miss? Unsubscribe (click between Calendar/Feed to trigger
// the error)

// export default function usePosts(uid) {
//   const [posts, setPosts] = useState(null)
//   useEffect(() => {
//     return subscribeToPosts(uid, posts => {
//       setPosts(posts)
//     })
//   })
//   return posts
// }

/******************************************************************************/
// Notice that gross flicker? How can we fix it?
//
// 1. cache it in useAppState and dispatch
// 2. cache it here
//
// Let's go with option 2 cause we just did option 1. Don't forget the second
// arg to useEffect!

// const cache = {}

// export default function usePosts(uid) {
//   const cached = cache[uid]
//   const [posts, setPosts] = useState(cached)
//   useEffect(() => {
//     return subscribeToPosts(uid, posts => {
//       cache[uid] = posts
//       setPosts(posts)
//     })
//   }, [uid])
//   return posts
// }

/******************************************************************************/
// Flicker is gone!
//
// Alright, is there a way to avoid the loading state before you get to the page?
// When suspense is shipped we may have more options, but today, the best option
// is to preload your cache on your Links.
//
// [open TopBar.js]


const cache = {}

export default function usePosts(uid) {
  const cached = cache[uid]
  const [posts, setPosts] = useState(cached)
  useEffect(() => {
    return subscribeToPosts(uid, posts => {
      cache[uid] = posts
      setPosts(posts)
    })
  }, [uid])
  return posts
}

export async function preloadPosts(uid) {
  cache[uid] = await fetchPosts(uid)
  return
}
