import React, { useState } from "react"
import { useAppState } from "app/app-state"
import Avatar from "app/Avatar"
import Minutes from "app/Minutes"
import { FaDumbbell } from "react-icons/fa"
import RecentPostsDropdown from "app/RecentPostsDropdown"

const errorClass = "NewPost_error"

const MAX_MESSAGE_LENGTH = 5

// npm install classnames
// classNames('NewPost', { [errorClass]: messageTooLong });

export default function NewPost({ takeFocus, date, onSuccess, showAvatar }) {
  const [message, setMessage] = useState("")
  const [{ auth }] = useAppState()
  const messageTooLong = message.length >= MAX_MESSAGE_LENGTH

  return (
    <div className={"NewPost" + (messageTooLong ? ` ${errorClass}` : "")}>
      {showAvatar && <Avatar uid={auth.uid} size={70} />}
      <form className="NewPost_form">
        <textarea
          value={message}
          onChange={event => {
            if (event.target.value.length > MAX_MESSAGE_LENGTH) return
            setMessage(event.target.value)
          }}
          className="NewPost_input"
          placeholder="Tell us about your workout!"
        />
        <div className="NewPost_char_count">
          {message.length}/{MAX_MESSAGE_LENGTH}
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
            <button type="submit" className="icon_button cta">
              <FaDumbbell /> <span>Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
