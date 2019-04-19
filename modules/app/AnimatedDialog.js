import React, { useRef } from "react"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { useTransition, animated } from "react-spring"
import { FaTimes } from "react-icons/fa"

// TODO: why does animated need this?
// - render props let you isolate rerenders in the same owner
// - hooks do not, the entire owner rerenders
//    - could useMemo on elements to get the same effect but gross
// - also I think it mutates the style prop so it's even more performant?
animated.DialogOverlay = animated(DialogOverlay)
animated.DialogContent = animated(DialogContent)

export default function AnimatedDialog(props) {
  const rootRef = useRef(null)

  // TODO: what is item/state/props
  const updateRootElement = (item, state, props) => {
    if (item) {
      if (!rootRef.current) {
        rootRef.current = document.getElementById("root")
      }
      rootRef.current.style.filter = `blur(${props.blur}px)`
    }
  }

  const transitions = useTransition(props.isOpen ? props : false, null, {
    from: { opacity: 0, y: -10, blur: 0 },
    enter: { opacity: 1, y: 0, blur: 8 },
    leave: { opacity: 0, y: -10, blur: 0 },
    onFrame: updateRootElement
  })

  return transitions.map(
    ({ item, key, props: { opacity, y } }) =>
      item.isOpen && (
        <animated.DialogOverlay
          key={key}
          style={{ opacity }}
          onDismiss={item.onDismiss}
        >
          <animated.DialogContent
            style={{
              transform: y.interpolate(y => `translate3d(0px, ${y}px, 0px)`)
            }}
          >
            {item.children}
            <button
              className="Dialog_close icon_button"
              onClick={item.onDismiss}
            >
              <FaTimes aria-label="Close new post dialog" />
            </button>
          </animated.DialogContent>
        </animated.DialogOverlay>
      )
  )
}
