import React from 'react'
import { InstantSearch, Hits, SearchBox} from 'react-instantsearch/dom'

import './algolia-instant-search-reset.css'

import {
  Page,
} from '../../styles/global'
import {
  Hit,
} from '../../styles/search'

// https://community.algolia.com/react-instantsearch/Getting_started.html#install-react-instantsearch
const Search = () => (
  <Page>
    <h1>Search</h1>
    <InstantSearch
      appId={process.env.REACT_APP_ALGOLIA_APP_ID}
      apiKey={process.env.REACT_APP_ALGOLIA_SEARCH_KEY}
      indexName="posts"
      >
      <SearchBox />
      <Hits hitComponent={Product} />
    </InstantSearch>
  </Page>
)

const Product = ({hit}) => <Hit to={`/${hit.slug}`}>{hit.title}</Hit>

export default Search
