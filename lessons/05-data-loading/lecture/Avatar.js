import React, { useState, useEffect } from "react"

import {
  calculateTotalMinutes,
  calculateExpectedMinutes,
  fetchUser,
  subscribeToPosts
} from "app/utils"
import ProgressCircle from "app/ProgressCircle"

class Posts extends React.Component {
  constructor(props) {
    super(props)
    this.state = { posts: [] }
  }

  setup() {
    this.cleanup = subscribeToPosts(
      this.props.uid,
      posts => {
        this.setState({ posts })
      }
    )
  }

  componentDidMount() {
    this.setup()
  }

  componentWillUnmount() {
    this.cleanup()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.uid !== this.props.uid) {
      this.cleanup()
      this.setup()
    }
  }

  render() {
    return this.props.children(this.state.posts)
  }
}

function useR(uid) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let isCurrent = true
    console.log("we are mounting")

    fetchUser(uid).then(cake => {
      if (isCurrent) setUser(cake)
    })

    return () => {
      console.log("we are unmounting")
      isCurrent = false
    }
  }, [uid])
  return user
}

function usePosts(uid) {
  const [posts, setPosts] = useState(null)

  useEffect(() => subscribeToPosts(uid, setPosts), [uid])
  return posts
}

function useUserAndPosts(uid) {
  const user = useR(uid)
  const posts = usePosts(uid)
  return [user, posts]
}

// https://codesandbox.io/s/stupefied-engelbart-g21mf

export default function Avatar({
  uid,
  size = 50,
  bg,
  className,
  ...rest
}) {
  const [user, posts] = useUserAndPosts(uid)

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
    const expectedMinutes =
      posts && calculateExpectedMinutes(user)
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
