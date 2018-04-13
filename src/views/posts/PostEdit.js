import React from 'react'
import { withRouter } from 'react-router-dom'

import deletePost from '../../actions/deletePost'
import updatePost from '../../actions/updatePost'
import PostSlugProvider from '../../data/PostSlugProvider'
import PostForm from './PostForm'
import {
  Page,
} from '../../styles/global'

const EditPost = ({slug, history}) => (
  <Page>
    <PostSlugProvider slug={slug}>
      { post => (
        <div>
          <PostForm post={post} onSubmit={values => {
            updatePost(post.id, values).then(() => history.push(`/${post.slug}`))
          }} />
          <div onClick={() => {
            if (window.confirm(`Are you sure you want to delete this post?`)) {
              deletePost(post).then( () => history.push(`/`))
            }
          }}>delete post</div>
        </div>
      )}
    </PostSlugProvider>
  </Page>
)

export default withRouter(EditPost)
