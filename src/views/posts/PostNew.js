import React from 'react'
import { withRouter } from 'react-router-dom'

import createPost from '../../actions/createPost'
import PostForm from './PostForm'
import {
  Wrapper
} from '../../styles/global'

const NewPost = ({history}) => {
  return <Wrapper>
    <PostForm onSubmit={values => createPost(values).then(p => history.push(`/${p.slug}`))} />
  </Wrapper>
}

export default withRouter(NewPost)
