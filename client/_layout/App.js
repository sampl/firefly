import React from 'react'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'
import ScrollToTop from '../_util/ScrollToTop'

// components
import Modal from './Modal'
import Main from './Main'
import Routes from './Routes'

class App extends React.Component {
  render() {
    // use Route to give the ModalWrapper props for location and history for the modal
    return(
      <BrowserRouter>
        <ScrollToTop>
          <Route component={ModalWrapper}/>
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}

class ModalWrapper extends React.Component {

  componentWillUpdate(nextProps) {
    // when the page changes, save where we just were so we can render it behind a modal
    this.previousLocation = this.props.location
  }

  render() {

    let renderInModal = (this.props.location && this.props.location.state && this.props.location.state.modal)
    let content
    if (renderInModal) {
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

export default App
