import React from 'react'

import createPost from '../../actions/createPost'
import PostForm from './PostForm'
import {
  Page,
} from '../../styles/layout'

const PostNew = ({history}) => (
  <Page>
    <PostForm
      post={{
        title: '',
        content: '',
      }}
      onSubmit={values => {
        return createPost(values)
          .then(post => history.push(`/${post.slug}`))
      }}
    />
  </Page>
)

export default PostNew
