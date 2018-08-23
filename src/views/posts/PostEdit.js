import React from 'react'
import { FirestoreCollection } from 'react-firestore'

import Error from '../misc/Error'
import deletePost from '../../actions/deletePost'
import updatePost from '../../actions/updatePost'
import PostForm from './PostForm'
import {
  Page,
} from '../../styles/layout'

const PostEdit = ({slug, history}) => (
  <Page>
    <FirestoreCollection
      path={'posts'}
      filter={['slug', '==', slug]}
    >
      { ({error, isLoading, data}) => {
        if (error || data.length === 0) {
          return <Error error={error} />
        }

        if (isLoading) {
          return <p>loading...</p>
        }

        const post = data[0]

        return <div>

          <PostForm post={post} onSubmit={values => {
            return updatePost(post.id, values)
              .then(() => history.push(`/${post.slug}`))
          }} />

          or

          <button onClick={() => {
            if (window.confirm(`Are you sure you want to delete this post?`)) {
              deletePost(post)
                .then( () => history.push(`/`))
            }
          }}>delete post</button>

        </div>
      }}
    </FirestoreCollection>
  </Page>
)

export default PostEdit
