Three types of element animations:

1. Interpolating values on an element: width, opacity, position, etc.
2. Enter/Exit an element
3. Transitioning between elements

Two ways to interpolate:

1. Time-based on a bezier curve
2. Physics based with a spring

- create or review useTween
- illustrate how cool it is that a static value becomes a dynamically changing value :O so cool!
- add the animation to the calendar
- create `AnimatedText.js`
- add it to the modal
- note that the 30 pops in first and then animates
  - subscription fires w/ the new record before the createRecord calls back
- add `{ listen }` option to usePosts
  - in the render props world we could have just not rendered the element, but hooks are unconditional, so you pass in conditions to control it
- Do the dialog animation w/ react-spring

- Do the calendar animation (maybe as exercise w/ lots of hand holding?)
  - derived state conversation, might get heavy!



