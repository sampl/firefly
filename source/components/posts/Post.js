import React from 'react'

const Post = (props) => (
  <div>
    <h2>{props.post.title}</h2>
    <p>{props.post.content}</p>
    <hr/>
  </div>
)

export default Post
