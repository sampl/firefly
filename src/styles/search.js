// aloglia makes you style search widgets with global css
// https://community.algolia.com/react-instantsearch/guide/Styling_widgets.html
// https://www.styled-components.com/docs/api#injectglobal

import { injectGlobal } from 'styled-components'

injectGlobal`
  .ais-SearchBox-input {
    padding: .5rem;
    border-radius: 3px;
    font-size: 16px;
    outline: none;
    border: 1px solid #ddd;
    margin: 0 0 1rem;

    &:focus {
      box-shadow: 0 0 0 1px;
    }
  }

  .ais-SearchBox-submit,
  .ais-SearchBox-reset {
    display: none;
  }

  .ais-Hits-list {
    margin: 0;
    padding: 0;
  }

  .ais-Hits-item {
    list-style: none;
  }
  .ais-Hits-item a {
    display: block;
    text-decoration: none;
    padding: 1rem 0;
  }
`
