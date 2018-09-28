import React from 'react'
import { FirestoreCollection } from 'react-firestore'

import Error from '../misc/Error'
import FireflySubscription from '../misc/FireflySubscription'
import {
  InternalLink,
} from '../../styles/links'
import {
  Page,
} from '../../styles/layout'

const PostList = () => (
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

    <hr />
    
    {/* For paid subscribers only */}
    <FireflySubscription>
      { ({isLoading, error, subscription}) => {

        if (error) {
          return <Error error={error} />
        }

        if (isLoading) {
          return <p>loading...</p>
        }

        if (!subscription) {
          return <div>
            <p>Only paid subscribers can see what goes here</p>
            <InternalLink to={`/account`}>Subscribe now</InternalLink>
          </div>
        }

        return <div>
          <p>Super-fancy subscription-only features go here!</p>
        </div>

      }}
    </FireflySubscription>
  </Page>
)

export default PostList
