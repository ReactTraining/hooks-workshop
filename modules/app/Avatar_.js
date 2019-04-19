import React from "react"
import useDocWithCache from "app/useDocWithCache"
import usePosts from "app/usePosts"
import { calculateTotalMinutes, calculateExpectedMinutes } from "app/utils"
import ProgressCircle from "app/ProgressCircle"

export default function Avatar({ uid, size = 50, bg, className, ...rest }) {
  const user = useDocWithCache(`users/${uid}`)

  if (!user) {
    return (
      <div
        className={"Avatar empty " + className}
        style={{ width: size, height: size }}
        {...rest}
      />
    )
  }

  const { photoURL, displayName } = user
  const stroke = size / 10
  const progress = 0
  const expectedProgress = 0

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
