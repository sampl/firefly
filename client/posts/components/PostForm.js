import React from 'react'
import { Link } from 'react-router-dom'
import Validation from 'react-validation'

class PostForm extends React.Component {

  constructor(props) {
    super(props)
    this._onChange = this._onChange.bind(this)
    this._submit = this._submit.bind(this)
    this.state = {
      post: this.props.post
    }
  }

  _onChange(e) {
    let post = this.state.post
    post[e.target.name] = e.target.value
    this.setState({
      post: this.props.post
    })
  }

  _submit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.post)
  }

  render() {
    return (
      <Validation.components.Form onSubmit={this._submit}>
        <div>
          Title
          <Validation.components.Input name="title" value={this.state.post.title} validations={['required']} onChange={this._onChange} />
        </div>
        <div>
          Content
          <Validation.components.Input name="content" value={this.state.post.content} validations={['required']} onChange={this._onChange} />
        </div>
        <Validation.components.Button type="submit">Submit</Validation.components.Button>
      </Validation.components.Form>
    )
  }
}

Object.assign(Validation.rules, {
  required: {
    rule: (value) => {
      return value.toString().trim()
    },
    hint: (value) => {
      return <span style={{color: 'hsl(0, 80%, 60%)', display: 'block'}}>Required</span>
    }
  },
})

export default PostForm
