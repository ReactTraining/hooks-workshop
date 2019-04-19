import React from "react"

const style = window.getComputedStyle(document.body)
const gray = style.getPropertyValue(`--middle-gray`)
const red = style.getPropertyValue(`--red`)
const accent = style.getPropertyValue(`--accent`)
const green = style.getPropertyValue(`--green`)

export default function ProgressCircle({
  radius = 30,
  stroke = 10,
  progress = 100,
  expectedProgress = 100,
  bg = gray
}) {
  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference
  const expectedStrokeDashoffset =
    circumference - (expectedProgress / 100) * circumference
  const deficit = progress < expectedProgress

  const progressBar = (
    <circle
      key="progress"
      stroke={deficit ? accent : green}
      fill="transparent"
      strokeWidth={stroke}
      strokeDasharray={circumference + " " + circumference}
      style={{
        strokeDashoffset,
        transform: "rotate(-90deg)",
        transformOrigin: "50% 50%"
      }}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
    />
  )

  const expectedBar = (
    <circle
      key="expected"
      stroke={deficit ? red : accent}
      fill="transparent"
      strokeWidth={stroke}
      strokeDasharray={circumference + " " + circumference}
      style={{
        strokeDashoffset: expectedStrokeDashoffset,
        transform: "rotate(-90deg)",
        transformOrigin: "50% 50%"
      }}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
    />
  )

  return (
    <svg
      aria-label={`Progress: ${progress}%`}
      height={radius * 2}
      width={radius * 2}
    >
      <circle
        stroke={bg}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{
          boxShadow: "1px 1px 1px hsla(0, 0%, 0%, 0.5)",
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%"
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {deficit ? [expectedBar, progressBar] : [progressBar, expectedBar]}
    </svg>
  )
}
