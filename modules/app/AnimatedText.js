import React from "react"
import useTween from "app/useTween"
// import playSound from "app/playSound"

export default function AnimatedText({ children, onRest, ...props }) {
  const tweenedValue = useTween(children * 50, onRest)
  const integer = Math.round(tweenedValue * children)
  // useEffect(playSound, [integer])
  return <span {...props}>{integer}</span>
}

// TODO: add prop-types
const number = () => {}
AnimatedText.propTypes = { children: number }
