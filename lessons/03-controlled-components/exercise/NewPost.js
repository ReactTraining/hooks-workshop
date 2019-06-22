import React, { useState } from "react"
import { useAppState } from "app/app-state"
import Avatar from "app/Avatar"
import Minutes from "app/Minutes"
import { FaDumbbell } from "react-icons/fa"
import RecentPostsDropdown from "app/RecentPostsDropdown"

const errorClass = "NewPost_error"

const MAX_MESSAGE_LENGTH = 3

export default function NewPost({ takeFocus, date, onSuccess, showAvatar }) {
  const [{ auth }] = useAppState()
  const [message, setMessage] = useState("run around late")
  const [errorMessage, setErrorMessage] = useState(null)

  function handleChangeMessage(e) {
    const message = e.target.value
    setMessage(message)
    setErrorMessage("")
    if (message.length > MAX_MESSAGE_LENGTH) {
      setErrorMessage("Too Long")
    }
  }

  return (
    <div className={"NewPost " + (errorMessage ? errorClass : "")}>
      {showAvatar && <Avatar uid={auth.uid} size={70} />}
      <form className="NewPost_form">
        {errorMessage}
        <textarea
          className="NewPost_input"
          placeholder="Tell us about your workout!"
          value={message}
          onChange={handleChangeMessage}
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
