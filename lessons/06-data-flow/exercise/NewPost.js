// Don't edit this file, go to RecentPostsDropdown.js
import React, { useState, useRef } from "react"
import { format as formatDate } from "date-fns"
import { FaDumbbell } from "react-icons/fa"

import { useAppState } from "app/app-state"
import { createPost, DATE_FORMAT } from "app/utils"
import Avatar from "app/Avatar"
import Minutes from "app/Minutes"
import RecentPostsDropdown from "app/RecentPostsDropdown"

const MAX_MESSAGE_LENGTH = 200

export default function NewPost({ takeFocus, date, showAvatar, onSuccess }) {
  const [{ auth }] = useAppState()
  const [message, setMessage] = useState("")
  const [saving, setSaving] = useState(false)
  const formRef = useRef()
  const minutesRef = useRef()
  const messageRef = useRef()
  const tooMuchText = message.length > MAX_MESSAGE_LENGTH

  const handleAboutChange = event => setMessage(event.target.value)
  const handleRecentSelect = text => setMessage(text)

  const handleSubmit = event => {
    event.preventDefault()
    setSaving(false)
    createPost({
      message: messageRef.current.value,
      minutes: parseInt(minutesRef.current.value, 10),
      date: formatDate(date, DATE_FORMAT),
      uid: auth.uid
    }).then(post => {
      setSaving(false)
      setMessage("")
      onSuccess(post)
    })
  }

  return (
    <div className={"NewPost" + (tooMuchText ? " NewPost_error" : "")}>
      {showAvatar && <Avatar uid={auth.uid} size={70} />}
      <form ref={formRef} className="NewPost_form" onSubmit={handleSubmit}>
        <textarea
          ref={messageRef}
          className="NewPost_input"
          placeholder="Tell us about your workout!"
          value={message}
          onChange={handleAboutChange}
        />
        <div className="NewPost_char_count">
          {message.length}/{MAX_MESSAGE_LENGTH}
        </div>
        <RecentPostsDropdown uid={auth.uid} onSelect={handleRecentSelect} />
        <div className="NewPost_buttons">
          <Minutes date={date} ref={minutesRef} />
          <div>
            <button disabled={saving} type="submit" className="icon_button cta">
              <FaDumbbell /> <span>Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
