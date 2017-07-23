import React from 'react'
import { Link } from 'react-router-dom'

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
    var post = this.state.post
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
      <form onSubmit={this._submit}>
        <div>
          Title
          <input name="title" value={this.state.post.title} onChange={this._onChange} />
        </div>
        <div>
          Content
          <input name="content" value={this.state.post.content} onChange={this._onChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default PostForm
