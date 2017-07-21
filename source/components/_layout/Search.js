import React from 'react'
import { Redirect } from 'react-router-dom'
import Autosuggest from 'react-autosuggest'
import Algolia from 'algoliasearch'
import algoliaConfig from '../../../algolia-config.json'

var algolia = Algolia(algoliaConfig.app_id, algoliaConfig.app_key)
var index = algolia.initIndex('posts')

class Search extends React.Component {
  constructor() {
    super()

    this._onChange = this._onChange.bind(this)
    this._fetchSuggestions = this._fetchSuggestions.bind(this)
    this._clearSuggestions = this._clearSuggestions.bind(this)
    this._onSuggestionSelected = this._onSuggestionSelected.bind(this)

    this.state = {
      value: '',
      suggestions: [],
      redirect: null,
    }

  }

  _onChange(event, params) {
    this.setState({
      value: params.newValue
    })
  }

  _fetchSuggestions({ value }) {
    value = value.trim().toLowerCase()

    if (value.length === 0) {
      var suggestions = []
    } else {
      index.search(value, function(err, content) {
        this.setState({
          suggestions: content.hits
        })
      }.bind(this))
    }
  }

  _clearSuggestions() {
    this.setState({
      suggestions: []
    })
  }

  _onSuggestionSelected(event, attrs) {
    this.setState({
      redirect: '/posts/'+attrs.suggestion.key
    })
  }

  render() {

    var inputProps = {
      placeholder: 'Type to search',
      value: this.state.value,
      onChange: this._onChange,
    }

    if (this.state.redirect) {
      return( <Redirect to={this.state.redirect} /> )
    }

    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this._fetchSuggestions}
        onSuggestionsClearRequested={this._clearSuggestions}
        renderSuggestion={ (x) => x.title }
        getSuggestionValue={ (x) => x.title }
        onSuggestionSelected={this._onSuggestionSelected}
        inputProps={inputProps}
        theme={styles}
      />
    )

  }
}

// more classes: https://github.com/moroshko/react-autosuggest#themeProp
var styles = {
  container: {
    position: 'relative',
    display: 'inline',
  },
  suggestionsContainerOpen: {
    border: '1px solid',
    position: 'absolute',
    top: '2rem',
    left: 0,
  },
  suggestionsList: {
    padding: 0,
    margin: 0,
  },
  suggestion: {
    padding: '.5rem',
    listStyle: 'none',
    minWidth: '100px',
    background: 'white',
  },
  suggestionHighlighted: {
    background: '#eee',
  },
}

export default Search
