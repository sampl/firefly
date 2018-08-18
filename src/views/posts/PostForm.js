// This is an uncontrolled React form, which is way simpler than
// the standard React form setup
// https://reactjs.org/docs/uncontrolled-components.html
//
// You can use browser form validation these days, and just
// get the form contents on submit.

import React from 'react'

import {
  FormRow,
  Label,
  Input,
} from '../../styles/forms'

class PostForm extends React.Component {

  state = {
    disabled: false,
  }

  submit = event => {
    event.preventDefault()

    this.setState({
      disabled: true,
    })

    const {title, content} = event.target.elements

    const values = {
      title: title.value,
      content: content.value,
    }

    this.props.onSubmit(values).then(() => {
      this.setState({
        disabled: false,
      })
    })
  }

  render() {
    return <form onSubmit={this.submit}>

      <FormRow>
        <Label for="title">Title</Label>
        <Input type="text" name="title" defaultValue={this.props.post.title || ''} required />
      </FormRow>

      <FormRow>
        <Label for="content">Content</Label>
        <Input type="text" name="content" defaultValue={this.props.post.content || ''} required />
      </FormRow>

      <button type="submit" disabled={this.state.disabled}>Save post</button>
    </form>
  }
}

export default PostForm
