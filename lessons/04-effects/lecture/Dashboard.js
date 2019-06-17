/******************************************************************************/
// open NewPost.js
import React from "react"

import NewPost from "app/NewPost"

// import App from "../../../modules/app/App"
// export default App

export default function App() {
  return (
    <div
      style={{
        background: "white",
        padding: "2rem",
        borderRadius: "0.8rem"
      }}
    >
      <NewPost date="2019-04-05" />
    </div>
  )
}
