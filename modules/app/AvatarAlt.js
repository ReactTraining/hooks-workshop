import React, { useEffect, useState } from "react"
import useUser from "app/useUser"
import usePosts from "app/usePosts"
import { calculateTotalMinutes, calculateExpectedMinutes } from "app/utils"
import ProgressCircle from "app/ProgressCircle"

export default function Avatar({ uid, size = 50, bg, className, ...rest }) {
  const user = useUser(uid)
  const posts = usePosts(uid)

  if (!user || !posts) {
    return (
      <div
        data-testid="empty-avatar"
        className={"Avatar empty " + className}
        style={{ width: size, height: size }}
        {...rest}
      />
    )
  }

  const { photoURL, displayName, goal } = user
  const minutes = calculateTotalMinutes(posts)
  const expectedMinutes = calculateExpectedMinutes(user)
  const stroke = size / 10
  const progress = (minutes / goal) * 100
  const expectedProgress = (expectedMinutes / goal) * 100

  return (
    <div
      data-testid="avatar"
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
