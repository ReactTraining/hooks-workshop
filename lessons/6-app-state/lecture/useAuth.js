import { useState, useEffect } from "react"
import { onAuthStateChanged } from "app/utils"
import { useAppState } from "app/app-state"

/******************************************************************************/
// 1. What happens if we useAuth in two different places in the app?
//    We've got it in App.js and NewPost.js.
//
//    - We'll set up two onAuthStateChanged listeners. This might cause
//      flickering, and is just unnecessary.
//    - Every component down the tree has to account for a potential `null`
//      value, which complicates all the code, we should be able to just plan
//      on having it. We should see an error in the app when we run it already.
//    - Also, note we learned about unsubscribing, so we return the unsubscribe
//      now
//

export default function useAuth() {
  const [authAttempted, setAuthAttempted] = useState(false)
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    return onAuthStateChanged(auth => {
      setAuthAttempted(true)
      setAuth(auth)
    })
  }, [])

  return { auth, authAttempted }
}

/******************************************************************************/
// 2. A really simple solution is to maintain a little cache, especially since
//    we don't expect this stuff to change once we get it.

// const cache = {
//   authAttempted: false,
//   auth: null
// }

// export default function useAuth() {
//   const [authAttempted, setAuthAttempted] = useState(cache.authAttempted)
//   const [auth, setAuth] = useState(cache.auth)

//   useEffect(() => {
//     if (!authAttempted) {
//       return onAuthStateChanged(auth => {
//         cache.authAttempted = true
//         cache.auth = auth
//         // do this to get the updates to happen
//         setAuthAttempted(cache.authAttempted)
//         setAuth(cache.auth)
//       })
//     }
//   }, [authAttempted])

//   return { auth, authAttempted }
// }

/******************************************************************************/
// 3. [open SignupForm.js]

/******************************************************************************/
// 5. Let's forgo our own little cache here, and use our app state reducer.
// export default function useAuth() {
//   const [{ authAttempted, auth }, dispatch] = useAppState()

//   useEffect(() => {
//     if (!authAttempted) {
//       return onAuthStateChanged(auth => {
//         dispatch({
//           type: "AUTH_CHANGE",
//           auth: auth
//         })
//       })
//     }
//   }, [authAttempted, dispatch])

//   return { auth, authAttempted }
// }
