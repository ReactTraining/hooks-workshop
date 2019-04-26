import React, { useState, useRef } from "react"
import { FaDumbbell } from "react-icons/fa"
import { format as formatDate } from "date-fns"

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

  function handleAboutChange(event) {
    setMessage(event.target.value)
  }

  function handleRecentSelect(text) {
    setMessage(text)
  }

  function handleSubmit(event) {
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

/******************************************************************************/
// Right now, after we create the message we have to close the modal as the user
// to see the new post. We'd rather have the modal close automatically.
//
// - How can we handle that? (pass a function in, call it when we need to)
// - Who owns the Modal? Let's check it out (app/Dashboard.js Calendar)

// export default function NewPost({ takeFocus, date, showAvatar, onSuccess }) {
//   const [{ auth }] = useAppState()
//   const [message, setMessage] = useState("")
//   const [saving, setSaving] = useState(false)
//   const formRef = useRef()
//   const minutesRef = useRef()
//   const messageRef = useRef()
//   const tooMuchText = message.length > MAX_MESSAGE_LENGTH

//   function handleAboutChange(event) {
//     setMessage(event.target.value)
//   }

//   function handleRecentSelect(text) {
//     setMessage(text)
//   }

//   function handleSubmit(event) {
//     event.preventDefault()
//     setSaving(false)
//     createPost({
//       message: messageRef.current.value,
//       minutes: parseInt(minutesRef.current.value, 10),
//       date: formatDate(date, DATE_FORMAT),
//       uid: auth.uid
//     }).then(post => {
//       setSaving(false)
//       setMessage("")
//     })
//   }

//   return (
//     <div className={"NewPost" + (tooMuchText ? " NewPost_error" : "")}>
//       {showAvatar && <Avatar uid={auth.uid} size={70} />}
//       <form ref={formRef} className="NewPost_form" onSubmit={handleSubmit}>
//         <textarea
//           ref={messageRef}
//           className="NewPost_input"
//           placeholder="Tell us about your workout!"
//           value={message}
//           onChange={handleAboutChange}
//         />
//         <div className="NewPost_char_count">
//           {message.length}/{MAX_MESSAGE_LENGTH}
//         </div>
//         <RecentPostsDropdown uid={auth.uid} onSelect={handleRecentSelect} />
//         <div className="NewPost_buttons">
//           <Minutes date={date} ref={minutesRef} />
//           <div>
//             <button disabled={saving} type="submit" className="icon_button cta">
//               <FaDumbbell /> <span>Post</span>
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }

/******************************************************************************/
// That's it. Data goes down through props, and back up through prop callbacks.
// Every time you need to communicate from one component to another, it will
// likely happen this way. If two components far apart need to communicate,
// then they can do so through a common parent.
/*
TODO: make a cool animation for this, or draw it on a board.

         Parent
            +
            |
            |
      +-----+-----+
      |           |
      |           |
      +           +
  Child A     Child B

*/
