import React, { useState, useEffect } from "react"

import {
  calculateTotalMinutes,
  calculateExpectedMinutes,
  fetchUser,
  subscribeToPosts
} from "app/utils"
import ProgressCircle from "app/ProgressCircle"

function useUser(uid) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    let isCurrent = true
    fetchUser(uid).then(user => {
      if (isCurrent) {
        setUser(user)
      }
    })
    return () => {
      isCurrent = false
    }
  }, [uid])

  return user
}

function usePosts(uid) {
  const [posts, setPosts] = useState(null)
  useEffect(() => {
    const unsubscribe = subscribeToPosts(uid, setPosts)
    return () => {
      unsubscribe()
    }
  }, [uid])
  return posts
}

export default function Avatar({ uid, size = 50, bg, className, ...rest }) {
  const user = useUser(uid)
  const posts = usePosts(uid)

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
