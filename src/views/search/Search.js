import React from 'react'
import {
  InstantSearch,
  Hits,
  SearchBox
} from 'react-instantsearch-dom'

import SearchResult from './SearchResult'
import '../../styles/search'
import {
  Page,
} from '../../styles/layout'

// https://community.algolia.com/react-instantsearch/Getting_started.html#install-react-instantsearch
const Search = () => (
  <Page>
    <InstantSearch
      appId={process.env.REACT_APP_ALGOLIA_APP_ID}
      apiKey={process.env.REACT_APP_ALGOLIA_SEARCH_KEY}
      indexName="posts"
    >
      <SearchBox autofocus />
      <Hits hitComponent={SearchResult} />
    </InstantSearch>
  </Page>
)

export default Search
