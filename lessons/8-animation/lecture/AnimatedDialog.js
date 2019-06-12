import React, { useRef, useEffect } from "react"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { useTransition, animated } from "react-spring"
import { FaTimes } from "react-icons/fa"

/******************************************************************************/
// Let's animate the dialog when it opens and closes with react-spring
export default function AnimatedDialog(props) {
  const rootRef = useRef(null)
  if (!rootRef.current) {
    rootRef.current = document.getElementById("root")
  }

  const opacity = 1
  const y = 0
  const blur = props.isOpen ? 8 : 0

  useEffect(() => {
    rootRef.current.style.filter = `blur(${blur}px)`
  }, [blur])

  return props.isOpen ? (
    <DialogOverlay style={{ opacity }} onDismiss={props.onDismiss}>
      <DialogContent
        style={{
          transform: `translate3d(0px, ${y}px, 0px)`
        }}
      >
        {props.children}
        <button className="Dialog_close icon_button" onClick={props.onDismiss}>
          <FaTimes aria-label="Close new post dialog" />
        </button>
      </DialogContent>
    </DialogOverlay>
  ) : null
}

/******************************************************************************/
// I like to start with just static values first, as you can we've got 3 things
// we're going to animate, the opacity, y position, and background blur.
//
// Side note: check out the lazy init of the ref.
//
// useTransition will return to us an array of data objects that represent each
// screen as it animates. Doesn't make a whole lot of sense for us here because
// we're only ever animating one, but we still treat it as though we have
// multiple (the next example uses multiple)
//
// So, when the dialog enters, we're going to animate it.
//
// The first argument to useTransition is the data that represents the
// animating screen, but it's just a bag of props. Since we're only animating
// one item in and out, we're going to pass in the props, or false to indicate
// to animate anything for this render.
//
// The second argument is the "key", but we don't have to worry about that for
// this animation, so we'll just do null, and the third is our animation config
// that describes the values we want to interpolate:
//
// from, enter, leave
//
// They have pretty descriptive names, from is where it starts, enter is where
// it ends when the element appears, leave is where it goes when the element
// leaves.
//
// The trick here is that useTransition helps us continue to render elements
// that are not technically on the page anymore. So anywhere we used `props`
// before, we now need to use `item`, because that represents the props for
// that screen when it wasn't being animated out.
//
// We also have to wrap our components in animated() for performance reasons.
// react-spring will skip react's normal updating mechanisms and animate the
// element styles directly, which keeps the whole component from being rendered
// a lot. Bailing out of react's updates makes sense here because for
// animations we really want at solid frames per second.

// animated.DialogOverlay = animated(DialogOverlay)
// animated.DialogContent = animated(DialogContent)

// export default function AnimatedDialog(props) {
//   const rootRef = useRef(null)
//   if (!rootRef.current) {
//     rootRef.current = document.getElementById("root")
//   }

//   const transitions = useTransition(props.isOpen ? props : false, null, {
//     from: { opacity: 0, y: -10, blur: 0 },
//     enter: { opacity: 1, y: 0, blur: 8 },
//     leave: { opacity: 0, y: 10, blur: 0 }
//   })

//   const blur = props.isOpen ? 8 : 0

//   useEffect(() => {
//     rootRef.current.style.filter = `blur(${blur}px)`
//   }, [blur])

//   return transitions.map(
//     ({ item, key, props: { opacity, y } }) =>
//       item.isOpen && (
//         <animated.DialogOverlay
//           key={key}
//           style={{ opacity }}
//           onDismiss={item.onDismiss}
//         >
//           <animated.DialogContent
//             style={{
//               transform: y.interpolate(y => `translate3d(0px, ${y}px, 0px)`)
//             }}
//           >
//             {item.children}
//             <button
//               className="Dialog_close icon_button"
//               onClick={item.onDismiss}
//             >
//               <FaTimes aria-label="Close new post dialog" />
//             </button>
//           </animated.DialogContent>
//         </animated.DialogOverlay>
//       )
//   )
// }

/******************************************************************************/
// Lets animate the blur on the background. Since the root element isn't owned
// by our React app, we use another transition config called onFrame, it gets
// called for every frame of the animation, allowing us to synchronize this
// animation to things outside of this component

// animated.DialogOverlay = animated(DialogOverlay)
// animated.DialogContent = animated(DialogContent)

// export default function AnimatedDialog(props) {
//   const rootRef = useRef(null)
//   if (!rootRef.current) {
//     rootRef.current = document.getElementById("root")
//   }

//   const transitions = useTransition(props.isOpen ? props : false, null, {
//     from: { opacity: 0, y: -10, blur: 0 },
//     enter: { opacity: 1, y: 0, blur: 8 },
//     leave: { opacity: 0, y: 10, blur: 0 },
//     onFrame: (item, state, { blur }) => {
//       if (item.isOpen) rootRef.current.style.filter = `blur(${blur}px)`
//     }
//   })

//   return transitions.map(
//     ({ item, key, props: { opacity, y } }) =>
//       item.isOpen && (
//         <animated.DialogOverlay
//           key={key}
//           style={{ opacity }}
//           onDismiss={item.onDismiss}
//         >
//           <animated.DialogContent
//             style={{
//               transform: y.interpolate(y => `translate3d(0px, ${y}px, 0px)`)
//             }}
//           >
//             {item.children}
//             <button
//               className="Dialog_close icon_button"
//               onClick={item.onDismiss}
//             >
//               <FaTimes aria-label="Close new post dialog" />
//             </button>
//           </animated.DialogContent>
//         </animated.DialogOverlay>
//       )
//   )
// }

/******************************************************************************/
// Alright, now lets look at adding transitions between two different elements
// on the Calendar
//
// - log how many items there are rendering at once when you atomic click
// - call out the "derived state" to figure out the direction
// - call out how it's linked to the router's location
