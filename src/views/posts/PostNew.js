import React from 'react'
import { withRouter } from 'react-router-dom'

import createPost from '../../actions/createPost'
import PostForm from './PostForm'
import {
  Page,
} from '../../styles/global'

const NewPost = ({history}) => {
  return <Page>
    <PostForm
      onSubmit={values => {
        return createPost(values)
          .then(p => history.push(`/${p.slug}`))
      }}
    />
  </Page>
}

export default withRouter(NewPost)
