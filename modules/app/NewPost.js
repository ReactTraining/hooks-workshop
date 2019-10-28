import React, { useState, useRef, useEffect } from "react"
import { useAppState } from "app/app-state"
import { createPost, DATE_FORMAT } from "app/utils"
import { format as formatDate } from "date-fns"
import Avatar from "app/Avatar"
import Minutes from "app/Minutes"
import { FaDumbbell } from "react-icons/fa"
import RecentPostsDropdown from "app/RecentPostsDropdown"

const MAX_MESSAGE_LENGTH = 200

export default function NewPost({ takeFocus, date, onSuccess, showAvatar }) {
  const [{ auth }] = useAppState()

  const [message, setMessage] = useState(
    getLocalStorageValue(makeNewPostKey(date)) || ""
  )
  const [saving, setSaving] = useState(false)
  const formRef = useRef()
  const messageRef = useRef()

  useEffect(() => {
    setLocalStorage(makeNewPostKey(date), message)
  })

  useEffect(() => {
    if (takeFocus) {
      messageRef.current.focus()
    }
  }, [takeFocus])

  const handleAboutChange = event => {
    setMessage(event.target.value)
  }

  const tooMuchText = message.length > MAX_MESSAGE_LENGTH

  const submit = form => {
    setSaving(true)
    // Sometimes form.elements[3] is the "+" icon instead of the input, 
    // depending on the context in which NewPost is rendered.
    const minutesVal = form.elements[3].value ? form.elements[3].value : form.elements[2].value

    // eslint-disable-next-line
    createPost({
      message: messageRef.current.value,
      // We specifically want to avoid refs for Minutes because it would
      // require ref forwarding and not all Minutes components (lectures)
      // will use ref forwarding (because they don't need it)
      minutes: Math.max(parseInt(minutesVal, 10) || 1, 1),
      date: formatDate(date, DATE_FORMAT),
      uid: auth.uid
    }).then(post => {
      setSaving(false)
      setMessage("")
      onSuccess(post)
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    submit(event.target)
  }

  const handleMessageKeyDown = event => {
    if (event.metaKey && event.key === "Enter") {
      submit(event.target.form)
    }
  }

  const handleRecentSelect = text => {
    setMessage(text)
  }

  return (
    <div
      className={"NewPost" + (tooMuchText ? " NewPost_error" : "")}
      style={{ opacity: saving ? 0.25 : 1 }}
    >
      {showAvatar && <Avatar uid={auth.uid} size={70} />}
      <form ref={formRef} className="NewPost_form" onSubmit={handleSubmit}>
        <textarea
          ref={messageRef}
          className="NewPost_input"
          placeholder="Tell us about your workout!"
          value={message}
          onChange={handleAboutChange}
          onKeyDown={handleMessageKeyDown}
        />
        <div className="NewPost_char_count">
          {message.length}/{MAX_MESSAGE_LENGTH}
        </div>
        <RecentPostsDropdown uid={auth.uid} onSelect={handleRecentSelect} />
        <div className="NewPost_buttons">
          <Minutes date={date} />
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

function makeNewPostKey(date) {
  return `newPost:${formatDate(date, DATE_FORMAT)}`
}

function getLocalStorageValue(key) {
  const val = localStorage.getItem(key)
  if (!val) return null
  try {
    return JSON.parse(val)
  } catch (e) {
    return null
  }
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
