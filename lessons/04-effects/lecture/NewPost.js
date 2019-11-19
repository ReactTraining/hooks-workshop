import React, { useState, useRef, useEffect } from "react"
import { FaDumbbell } from "react-icons/fa"

import { useAppState } from "app/app-state"
import Avatar from "app/Avatar"
import Minutes from "app/Minutes"
import RecentPostsDropdown from "app/RecentPostsDropdown"

const errorClass = "NewPost_error"
const MAX_MESSAGE_LENGTH = 200

// npm start lecture
// 4
// NewPost.js

function useDocumentTitle(message) {
  // empty array: runs on mount
  // populated array: runs on mount, whenever variables change
  // nothing: on mount, runs on every state change

  let newTitle = (
    "New Post" + (message.length ? `: ${message}` : message)
  ).substr(0, 30)

  useEffect(() => {
    document.title = newTitle
    console.log("changed!")
  }, [newTitle])
  // is state, uses state, changes state
}

export default function NewPost({
  takeFocus,
  date,
  onSuccess,
  showAvatar
}) {
  const [{ auth }] = useAppState()
  const [message, setMessage] = useState(
    "Ran along the lake."
  )
  const messageTooLong = message.length > MAX_MESSAGE_LENGTH

  const countRef = useRef()

  useDocumentTitle(message)

  function handleMessageChange(event) {
    setMessage(event.target.value)
  }

  return (
    <div
      className={
        "NewPost" + (messageTooLong ? ` ${errorClass}` : "")
      }
    >
      {showAvatar && <Avatar uid={auth.uid} size={70} />}
      <form className="NewPost_form">
        <textarea
          className="NewPost_input"
          placeholder="Tell us about your workout!"
          value={message}
          onChange={handleMessageChange}
        />
        <div className="NewPost_char_count">
          <span ref={countRef}>{message.length}</span>/
          {MAX_MESSAGE_LENGTH}
        </div>
        <RecentPostsDropdown
          uid={auth.uid}
          onSelect={message => {
            setMessage(message)
          }}
        />
        <div className="NewPost_buttons">
          <Minutes date={date} />
          <div>
            <button
              type="submit"
              className="icon_button cta"
            >
              <FaDumbbell /> <span>Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
