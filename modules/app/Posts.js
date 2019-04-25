import React, { useRef, useState, useEffect } from "react"
import { Link } from "app/packages/react-router-next"
import { format as formatDate } from "date-fns"
import { useAppState } from "app/app-state"
import useDocWithCache from "app/useDocWithCache"
import Avatar from "app/Avatar"
import NewPost from "app/NewPost"
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa"
import AnimatedText from "app/AnimatedText"
import { deletePost } from "app/utils"
import usePosts from "app/usePosts"

export default function Posts({ params }) {
  // passed params as props because animations can't "retain" context
  const [{ auth }] = useAppState()
  const { uid, date } = params
  const user = useDocWithCache(`users/${uid}`)
  const [adding, setAdding] = useState(false)
  const [newPostId, setNewPostId] = useState(null)
  const addRef = useRef()

  const posts = usePosts(uid, { listen: !adding })

  const canAdd = auth.uid === uid

  const handleAddNew = () => setAdding(true)

  const handleNewPostSuccess = post => {
    setAdding(false)
    setNewPostId(post.id)
  }

  useEffect(() => {
    if (!adding && addRef.current) {
      addRef.current.focus()
    }
  }, [adding])

  const dayPosts = posts && posts.filter(post => post.date === date)

  return posts && user ? (
    <div className="Posts">
      <Avatar uid={user.uid} size={100} />
      <div className="Posts_content">
        <h1 className="Posts_user_name">
          <Link href={`/${user.uid}`}>{user.displayName}</Link>
        </h1>
        <h2 className="Posts_date">{formatDate(date, "MMM Do, YYYY")}</h2>
        <div className="Posts_posts">
          {dayPosts.length > 0 ? (
            dayPosts.map((post, index) => (
              <Post key={post.id} post={post} isNew={post.id === newPostId} />
            ))
          ) : (
            <div className="Posts_empty">No posts today.</div>
          )}
        </div>
        {canAdd &&
          (adding ? (
            <div className="Posts_adding">
              <NewPost
                takeFocus={adding}
                date={date}
                onSuccess={handleNewPostSuccess}
                showAvatar={false}
              />
            </div>
          ) : (
            <div className="Posts_add">
              <button
                ref={addRef}
                className="Posts_add_button icon_button"
                onClick={handleAddNew}
              >
                <FaPlusCircle />{" "}
                <span>{posts.length > 0 ? "Add another" : "Add one"}</span>
              </button>
            </div>
          ))}
      </div>
    </div>
  ) : null
}

function Post({ post, isNew }) {
  const [{ auth }] = useAppState()
  const canDelete = auth.uid === post.uid
  const handleDelete = () => deletePost(post.id)

  return (
    <div className="Post">
      <div className="Post_title">
        <div className="Post_minutes">
          {isNew ? (
            <AnimatedText children={post.minutes} />
          ) : (
            <span>{post.minutes}</span>
          )}{" "}
          Minutes
        </div>
        {canDelete && (
          <button
            className="Post_delete_button icon_button"
            onClick={handleDelete}
          >
            <FaTrashAlt /> <span>Delete</span>
          </button>
        )}
      </div>
      <div className="Post_message">{post.message}</div>
    </div>
  )
}
