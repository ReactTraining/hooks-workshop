import React from "react"
import { logout } from "app/utils"
import { useAppState } from "app/app-state"
import Avatar from "app/Avatar"
import { FaPowerOff } from "react-icons/fa"
import { FaSearch } from "react-icons/fa"
import GlobalNav from "app/GlobalNav"

export default function TopBar({ children }) {
  return (
    <div className="TopBar">
      <div className="TopBar_inner">
        <GlobalNav />
        <Search />
        <Account />
      </div>
    </div>
  )
}

function Account() {
  const [{ user }] = useAppState()

  return user ? (
    <div className="Account">
      <Avatar uid={user.uid} />
      <div className="Account_user_name">{user.displayName}</div>
      <button
        aria-label="Log out"
        title="Log out"
        className="Account_logout icon_button"
        onClick={logout}
      >
        <FaPowerOff />
      </button>
    </div>
  ) : (
    <div>Loading user</div>
  )
}

function Search() {
  return (
    <div className="Search">
      <FaSearch className="Search_icon" />
      <input type="text" aria-label="Search" className="Search_input" />
    </div>
  )
}
