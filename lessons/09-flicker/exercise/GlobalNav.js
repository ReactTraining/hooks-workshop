import React from "react"
import { Link } from "app/packages/react-router-next"
import { FaCalendarAlt, FaTrophy } from "react-icons/fa"
import useAuth from "app/useAuth"
import { preloadPosts } from "app/usePosts"

// Start in usePosts.js

/******************************************************************************/
// Right now we have just a normal link
// export default function GlobalNav() {
//   return (
//     <nav className="GlobalNav">
//       <Link href="/">
//         <FaCalendarAlt /> <span>Calendar</span>
//       </Link>
//       <Link href="/feed">
//         <FaTrophy /> <span>Feed</span>
//       </Link>
//     </nav>
//   )
// }

/******************************************************************************/
// Let's wrap the link and get it to preload when hovered or focused:

function CalendarLink(props) {
  const { auth } = useAuth()
  const preload = () => preloadPosts(auth.uid)
  // const preload = () => {}
  return <Link onMouseEnter={preload} onFocus={preload} href="/" {...props} />
}

export default function GlobalNav() {
  return (
    <nav className="GlobalNav">
      <CalendarLink>
        <FaCalendarAlt /> <span>Calendar</span>
      </CalendarLink>
      <Link href="/feed">
        <FaTrophy /> <span>Feed</span>
      </Link>
    </nav>
  )
}
