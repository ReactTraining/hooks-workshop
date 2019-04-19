import React from "react"
import { Link } from "app/packages/react-router-next"
import { FaCalendarAlt, FaTrophy } from "react-icons/fa"

export default function GlobalNav() {
  return (
    <nav className="GlobalNav">
      <Link href="/">
        <FaCalendarAlt /> <span>Calendar</span>
      </Link>
      <Link href="/feed">
        <FaTrophy /> <span>Feed</span>
      </Link>
    </nav>
  )
}

