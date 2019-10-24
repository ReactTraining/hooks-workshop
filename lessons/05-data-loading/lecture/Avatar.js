import React, { useState, useEffect } from "react"

import {
  calculateTotalMinutes,
  calculateExpectedMinutes,
  fetchUser,
  subscribeToPosts
} from "app/utils"
import ProgressCircle from "app/ProgressCircle"

/******************************************************************************/
// Alright, we know everything we need to know about React to start building
// out an entire application. We know how to render, how to change state and
// update the page, and how to perform effects.
//
// The most common effect is probably loading and subscribing to data. Let's
// take a look.
//
// For this Avatar to work, we need to load the user and all of their posts
// so we can calculate the rings on their avatar. Right now, it's just empty.

export default function Avatar({ uid, size = 50, bg, className, ...rest }) {
  const user = null
  const posts = null

  if (!user) {
    return (
      <div
        className={"Avatar empty " + className}
        style={{ width: size, height: size }}
        {...rest}
      />
    )
  }

  const { photoURL, displayName, goal } = user
  const stroke = size / 10

  const circles = (() => {
    if (!posts) return null
    const minutes = posts && calculateTotalMinutes(posts)
    const expectedMinutes = posts && calculateExpectedMinutes(user)
    const progress = (minutes / goal) * 100
    const expectedProgress = (expectedMinutes / goal) * 100

    return (
      <ProgressCircle
        radius={size / 2}
        stroke={stroke}
        progress={progress}
        expectedProgress={expectedProgress}
        bg={bg}
      />
    )
  })()

  return (
    <div
      className={"Avatar " + className}
      style={{ width: size, height: size }}
      {...rest}
    >
      <div
        role="img"
        aria-label={`Avatar for ${displayName}`}
        className="Avatar_image"
        style={{
          backgroundImage: `url(${photoURL})`,
          width: size - stroke * 2 + 1,
          height: size - stroke * 2 + 1,
          top: stroke,
          left: stroke
        }}
      />
      {circles}
    </div>
  )
}

/******************************************************************************/
// Everything in React is the same: if the user clicks, setState, if a network
// returns data, setState. If you need to do anything besides render elements,
// useEffect.
//
// So for data loading, we need state, and an effect.

// export default function Avatar({ uid, size = 50, bg, className, ...rest }) {
//   const [user, setUser] = useState(null)
//   const posts = null

//   useEffect(() => {
//     fetchUser(uid).then(user => {
//       console.log(user)
//       setUser(user)
//     })
//   })

//   if (!user) {
//     return (
//       <div
//         className={"Avatar empty " + className}
//         style={{ width: size, height: size }}
//         {...rest}
//       />
//     )
//   }

//   const { photoURL, displayName, goal } = user
//   const stroke = size / 10

//   const circles = (() => {
//     if (!posts) return null
//     const minutes = posts && calculateTotalMinutes(posts)
//     const expectedMinutes = posts && calculateExpectedMinutes(user)
//     const progress = (minutes / goal) * 100
//     const expectedProgress = (expectedMinutes / goal) * 100

//     return (
//       <ProgressCircle
//         radius={size / 2}
//         stroke={stroke}
//         progress={progress}
//         expectedProgress={expectedProgress}
//         bg={bg}
//       />
//     )
//   })()

//   return (
//     <div
//       className={"Avatar " + className}
//       style={{ width: size, height: size }}
//       {...rest}
//     >
//       <div
//         role="img"
//         aria-label={`Avatar for ${displayName}`}
//         className="Avatar_image"
//         style={{
//           backgroundImage: `url(${photoURL})`,
//           width: size - stroke * 2 + 1,
//           height: size - stroke * 2 + 1,
//           top: stroke,
//           left: stroke
//         }}
//       />
//       {circles}
//     </div>
//   )
// }

/******************************************************************************/
// YIKES! Why does it keep loading?
//
// useEffect is designed to synchronize every committed render to your own
// effects. When we were synching to localStorage, this was exactly what we
// want, but with data loading we aren't "synchronizing" doesn't really feel
// like what we're doing--even though it is.
//
// We can use [], which will only load the first time, but
// if the uid ever changes, and we're still rendered, we would be showing the
// wrong avatar.
//
// So, we put the uid in there to make sure we always display the right thing,
// make sure we "synchronize" our rendered elements (and our props) with the
// data in our database.

// export default function Avatar({ uid, size = 50, bg, className, ...rest }) {
//   const [user, setUser] = useState(null)
//   const posts = null

//   useEffect(() => {
//     fetchUser(uid).then(user => {
//       setUser(user)
//     })
//   }, [uid])

//   if (!user) {
//     return (
//       <div
//         className={"Avatar empty " + className}
//         style={{ width: size, height: size }}
//         {...rest}
//       />
//     )
//   }

//   const { photoURL, displayName, goal } = user
//   const stroke = size / 10

//   const circles = (() => {
//     if (!posts) return null
//     const minutes = posts && calculateTotalMinutes(posts)
//     const expectedMinutes = posts && calculateExpectedMinutes(user)
//     const progress = (minutes / goal) * 100
//     const expectedProgress = (expectedMinutes / goal) * 100

//     return (
//       <ProgressCircle
//         radius={size / 2}
//         stroke={stroke}
//         progress={progress}
//         expectedProgress={expectedProgress}
//         bg={bg}
//       />
//     )
//   })()

//   return (
//     <div
//       className={"Avatar " + className}
//       style={{ width: size, height: size }}
//       {...rest}
//     >
//       <div
//         role="img"
//         aria-label={`Avatar for ${displayName}`}
//         className="Avatar_image"
//         style={{
//           backgroundImage: `url(${photoURL})`,
//           width: size - stroke * 2 + 1,
//           height: size - stroke * 2 + 1,
//           top: stroke,
//           left: stroke
//         }}
//       />
//       {circles}
//     </div>
//   )
// }

/******************************************************************************/
// Oops, if we change routes real fast notice the error message.
//
// > Warning: Can't perform a React state update on an unmounted component. This
// > is a no-op, but it indicates a memory leak in your application. To fix,
// > cancel all subscriptions and asynchronous tasks in a useEffect cleanup
// > function.
//
// Let's clean it up

// export default function Avatar({ uid, size = 50, bg, className, ...rest }) {
//   const [user, setUser] = useState(null)
//   const posts = null

//   useEffect(() => {
//     let isMounted = true
//
//     fetchUser(uid).then(user => {
//       if (isMounted) setUser(user)
//     })
//
//     return () => {
//       isMounted = false
//     }
//   }, [uid])

//   if (!user) {
//     return (
//       <div
//         className={"Avatar empty " + className}
//         style={{ width: size, height: size }}
//         {...rest}
//       />
//     )
//   }

//   const { photoURL, displayName, goal } = user
//   const stroke = size / 10

//   const circles = (() => {
//     if (!posts) return null
//     const minutes = posts && calculateTotalMinutes(posts)
//     const expectedMinutes = posts && calculateExpectedMinutes(user)
//     const progress = (minutes / goal) * 100
//     const expectedProgress = (expectedMinutes / goal) * 100

//     return (
//       <ProgressCircle
//         radius={size / 2}
//         stroke={stroke}
//         progress={progress}
//         expectedProgress={expectedProgress}
//         bg={bg}
//       />
//     )
//   })()

//   return (
//     <div
//       className={"Avatar " + className}
//       style={{ width: size, height: size }}
//       {...rest}
//     >
//       <div
//         role="img"
//         aria-label={`Avatar for ${displayName}`}
//         className="Avatar_image"
//         style={{
//           backgroundImage: `url(${photoURL})`,
//           width: size - stroke * 2 + 1,
//           height: size - stroke * 2 + 1,
//           top: stroke,
//           left: stroke
//         }}
//       />
//       {circles}
//     </div>
//   )
// }

/******************************************************************************/
// Alright, let's load the posts, but let's use a subscription instead, so we
// get updates when we post. Some APIs return an "unsubscribe" function, and
// callback with the exact state we want, when that's the case, it's a pretty
// satisfying one-liner in React to subscribe to data.

// export default function Avatar({ uid, size = 50, bg, className, ...rest }) {
//   const [user, setUser] = useState(null)
//   const [posts, setPosts] = useState(null)

//   useEffect(() => {
//     let current = true
//     fetchUser(uid).then(user => {
//       if (current) {
//         setUser(user)
//       }
//     })
//     return () => current = false
//   }, [uid])

//   useEffect(() => subscribeToPosts(uid, setPosts), [uid])

//   if (!user) {
//     return (
//       <div
//         className={"Avatar empty " + className}
//         style={{ width: size, height: size }}
//         {...rest}
//       />
//     )
//   }

//   const { photoURL, displayName, goal } = user
//   const stroke = size / 10

//   const circles = (() => {
//     if (!posts) return null
//     const minutes = posts && calculateTotalMinutes(posts)
//     const expectedMinutes = posts && calculateExpectedMinutes(user)
//     const progress = (minutes / goal) * 100
//     const expectedProgress = (expectedMinutes / goal) * 100

//     return (
//       <ProgressCircle
//         radius={size / 2}
//         stroke={stroke}
//         progress={progress}
//         expectedProgress={expectedProgress}
//         bg={bg}
//       />
//     )
//   })()

//   return (
//     <div
//       className={"Avatar " + className}
//       style={{ width: size, height: size }}
//       {...rest}
//     >
//       <div
//         role="img"
//         aria-label={`Avatar for ${displayName}`}
//         className="Avatar_image"
//         style={{
//           backgroundImage: `url(${photoURL})`,
//           width: size - stroke * 2 + 1,
//           height: size - stroke * 2 + 1,
//           top: stroke,
//           left: stroke
//         }}
//       />
//       {circles}
//     </div>
//   )
// }

/******************************************************************************/
// In the past to abstract something like this data fetching was the topic of
// and entire day of our advanced react workshop. Render props, higher order
// components, redux and redux middleware, all sorts of stuff to try to compose
// behavior. Now, it's a cut & paste away.
//
// Watch how easily we can abstract these two behaviors:

// function useUser(uid) {
//   const [user, setUser] = useState(null)
//   useEffect(() => {
//     let current = true
//     fetchUser(uid).then(user => {
//       if (current) setUser(user)
//     })
//     return () => current = false
//   }, [uid])
//   return user
// }

// function usePosts(uid) {
//   const [posts, setPosts] = useState(null)
//   useEffect(() => subscribeToPosts(uid, setPosts), [uid])
//   return posts
// }

// export default function Avatar({ uid, size = 50, bg, className, ...rest }) {
//   const user = useUser(uid)
//   const posts = usePosts(uid)

//   if (!user) {
//     return (
//       <div
//         className={"Avatar empty " + className}
//         style={{ width: size, height: size }}
//         {...rest}
//       />
//     )
//   }

//   const { photoURL, displayName, goal } = user
//   const stroke = size / 10

//   const circles = (() => {
//     if (!posts) return null
//     const minutes = posts && calculateTotalMinutes(posts)
//     const expectedMinutes = posts && calculateExpectedMinutes(user)
//     const progress = (minutes / goal) * 100
//     const expectedProgress = (expectedMinutes / goal) * 100

//     return (
//       <ProgressCircle
//         radius={size / 2}
//         stroke={stroke}
//         progress={progress}
//         expectedProgress={expectedProgress}
//         bg={bg}
//       />
//     )
//   })()

//   return (
//     <div
//       className={"Avatar " + className}
//       style={{ width: size, height: size }}
//       {...rest}
//     >
//       <div
//         role="img"
//         aria-label={`Avatar for ${displayName}`}
//         className="Avatar_image"
//         style={{
//           backgroundImage: `url(${photoURL})`,
//           width: size - stroke * 2 + 1,
//           height: size - stroke * 2 + 1,
//           top: stroke,
//           left: stroke
//         }}
//       />
//       {circles}
//     </div>
//   )
// }

/******************************************************************************/
// useEffect is able to encapsulate BOTH setup and teardown. Also, it is able to
// limit running side effects based on need, so they don't run unnecessarily.
//
// Remember what this used to look like with classes??

// class UserPosts extends React.Component {
//   state = { posts: [] }
//   componentDidMount() {
//     // fetch
//   }
//   componentDidUpdate(prevProps) {
//     // compare uid
//     // if different, unsubscribe, then start a new fetch
//   }
//   componentWillUnmount() {
//     // cleanup
//   }
//   render() {
//     return this.props.children(this.state.posts)
//   }
// }
