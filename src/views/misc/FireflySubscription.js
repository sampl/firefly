// if the currently logged-in user is a paid subscriber,
// this will provide their Firefly subscription

import React from 'react'
import FirebaseAuth from './FirebaseAuth'
import { FirestoreCollection } from 'react-firestore'

const FireflySubscription = ({children}) => (
  <FirebaseAuth>
    { ({isLoading, error, auth}) => {

      if (error || isLoading || !auth) {
        return children({
          error,
          isLoading,
          subscription: null,
        })
      }

      return <FirestoreCollection
        path="subscriptions"
        filter={['createdBy', '==', auth.uid]}
      >
        { ({error, isLoading, data}) => {
          return children({
            error,
            isLoading,
            subscription: data.length > 0 ? data[0] : null,
          })
        }}
      </FirestoreCollection>

    }}
  </FirebaseAuth>
)

export default FireflySubscription
