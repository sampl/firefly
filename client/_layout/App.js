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

    if (nextProps.location.key !== this.props.location.key) {             // when going to a different route
      if (nextProps.location.state && nextProps.location.state.modal) {   // if new route is supposed to be a modal
        this.previousLocation = this.props.location                       // ...save the stuff on the current page for the background "behind" the modal
        document.getElementsByTagName("body")[0].style.overflow = "hidden"   // style body so it doesn't scroll in the bg
      } else {
        document.getElementsByTagName("body")[0].style.overflow = "auto"
      }
    }

  }

  render() {

    // are we supposed to be showing a modal
    let locationHasModalState = (this.props.location && this.props.location.state && this.props.location.state.modal)

    // do we have children to put "behind" the modal
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

export default App
