import React from "react"
import useDocWithCache from "./useDocWithCache"
import usePosts from "./usePosts"
import { calculateTotalMinutes, calculateExpectedMinutes } from "./utils"
import ProgressCircle from "./ProgressCircle"

export function AvatarImage({
  className,
  size,
  displayName,
  photoURL,
  progress,
  expectedProgress,
  bg,
  ...rest
}) {
  const stroke = size / 10

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
      <ProgressCircle
        radius={size / 2}
        stroke={stroke}
        progress={progress}
        expectedProgress={expectedProgress}
        bg={bg}
      />
    </div>
  )
}

export default function Avatar({ uid, size = 50, bg, className, ...rest }) {
  const user = useDocWithCache(`users/${uid}`)
  const posts = usePosts(uid)

  if (!user || !posts) {
    return (
      <div
        className={"Avatar empty " + className}
        style={{ width: size, height: size }}
        {...rest}
      />
    )
  }

  const { photoURL, displayName, goal } = user
  const minutes = calculateTotalMinutes(posts)
  const expectedMinutes = calculateExpectedMinutes(user)

  const progress = (minutes / goal) * 100
  const expectedProgress = (expectedMinutes / goal) * 100

  return (
    <AvatarImage
      className={className}
      size={size}
      displayName={displayName}
      photoURL={photoURL}
      progress={progress}
      expectedProgress={expectedProgress}
      bg={bg}
    />
  )
}
