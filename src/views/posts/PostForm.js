// This is an uncontrolled React form, which is way simpler than the standard
// React form setup
// https://reactjs.org/docs/uncontrolled-components.html
//
// You can often simply use browser form validation these days, and just get the
// form contents on submit (see example below).
//
// If you need more from your forms, consider using Formik
// https://github.com/jaredpalmer/formik

import React from 'react'

import {
  FormRow,
  Label,
  Input,
  Button,
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

      <Button type="submit" disabled={this.state.disabled}>Submit</Button>

    </form>
  }
}

export default PostForm
