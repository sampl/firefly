import React from 'react'

import {
  InternalLink,
} from '../../styles/links'

const SearchResult = ({hit}) => (
  <InternalLink to={`/${hit.slug}`}>
    {hit.title}
  </InternalLink>
)

export default SearchResult
