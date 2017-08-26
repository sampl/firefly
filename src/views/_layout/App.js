import React from 'react'
import {withRouter} from 'react-router-dom'

import Modal from './Modal'
import Main from './Main'

class App extends React.Component {

  // scroll to top on route change
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  componentWillUpdate(nextProps) {
    // when going to a different route...
    if (nextProps.location.key !== this.props.location.key) {
      // if new route is supposed to be a modal...
      if (nextProps.location.state && nextProps.location.state.modal) {
        // ...save the stuff on the current page for the background "behind" the modal...
        this.previousLocation = this.props.location
        // ...and style body so it doesn't scroll in the bg
        document.getElementsByTagName("body")[0].style.overflow = "hidden"
      } else {
        document.getElementsByTagName("body")[0].style.overflow = "auto"
      }
    }
  }

  render() {

    // are we supposed to be showing a modal?
    let locationHasModalState = (this.props.location && this.props.location.state && this.props.location.state.modal)

    // and do we have children to put "behind" the modal?
    let isModal = (locationHasModalState && this.previousLocation )

    let content
    if (isModal) {
      content =
        <div>
          <Modal goBack={this.props.history.goBack} />
          <Main location={this.previousLocation} />
        </div>
    } else {
      content = <Main />
    }

    return(content)
  }
}

export default withRouter(App)
