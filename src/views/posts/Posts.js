import React from 'react'
import { FirestoreCollection } from 'react-firestore'

import Error from '../Error'
import {
  InternalLink,
} from '../../styles/links'
import {
  Page,
} from '../../styles/layout'

const Posts = () => (
  <Page>
    <InternalLink to="/new">New post</InternalLink>
    <hr/>
    <FirestoreCollection
      path={'posts'}
      sort="_likeCount:desc"
    >
      { ({error, isLoading, data}) => {

        if (error) {
          return <Error error={error} />
        }

        if (isLoading) {
          return <p>loading...</p>
        }

        if (data.length === 0) {
          return <p>No posts yet!</p>
        }

        return <div>
          {data.map(post => (
            <div key={post.id}>
              <InternalLink to={`/${post.slug}`}>{post.title}</InternalLink>
              <p>
                {post._likeCount || 0}
                {' '}
                {post._likeCount && post._likeCount === 1 ? 'like' : 'likes'}
              </p>
            </div>
          ))}
        </div>

      }}
    </FirestoreCollection>
  </Page>
)

export default Posts
