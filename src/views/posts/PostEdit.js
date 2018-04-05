import React from 'react'
import { withRouter } from 'react-router-dom'

import deletePost from '../../actions/deletePost'
import updatePost from '../../actions/updatePost'
import PostSlugProvider from '../../data/PostSlugProvider'
import Error from '../Error'
import PostForm from './PostForm'
import {
  Wrapper
} from '../../styles/global'

const EditPost = ({slug, history}) => (
  <PostSlugProvider slug={slug} render={ ({loading, post, error}) => {

    if (loading) {
      return <Wrapper>
        <p>Loading post...</p>
      </Wrapper>
    }

    if (error) {
      return <Error error={error} />
    }

    return <Wrapper>
      <PostForm post={post} onSubmit={values => {
          updatePost(post.id, values).then(() => history.push(`/${post.slug}`))
        }} />
        <div onClick={() => {
          if (window.confirm(`Are you sure you want to delete this post?`)) {
            deletePost(post).then( () => history.push(`/`))
          }
        }}>delete post</div>
    </Wrapper>

  }} />
)

export default withRouter(EditPost)
