import React from 'react'
import { withRouter } from 'react-router-dom'

import Error from '../Error'
import updatePost from '../../actions/updatePost'
import deletePost from '../../actions/deletePost'
import PostForm from './PostForm'
import {
  Wrapper
} from '../../styles/global'

const EditPost = ({loading, post, error, history}) => {

  if (loading) {
    return <Wrapper>
      <h1>Loading post...</h1>
    </Wrapper>
  }

  if (error) {
    return <Error error={error} />
  }

  return <Wrapper>
    <PostForm post={post} onSubmit={post => updatePost(post).then(p => history.push(`/${p.slug}`))} />
    <div onClick={() => {
        if (window.confirm(`Are you sure you want to delete this post?`)) {
          deletePost(post).then( () => history.push(`/`))
        }
      }}>delete post</div>
  </Wrapper>
}

export default withRouter(EditPost)
