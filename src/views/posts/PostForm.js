import React from 'react'

class PostForm extends React.Component {

  constructor(props) {
    super(props)
    const emptyPost = {
      title: '',
      content: '',
    }
    this.state = {
      post: this.props.post ? this.props.post : emptyPost,
    }
  }

  _onChange = event => {
    const post = this.state.post
    post[event.target.name] = event.target.value
    this.setState({
      post,
    })
  }

  _submit = event => {
    event.preventDefault()
    this.props.onSubmit(this.state.post)
  }

  render() {
    return (
      <form onSubmit={this._submit}>

        <label>
          Title
          <input name="title" value={this.state.post.title} onChange={this._onChange} />
        </label>

        <br />

        <label>
          Content
          <textarea name="content" value={this.state.post.content} onChange={this._onChange} />
        </label>

        <br />

        <button type="submit">Submit</button>

      </form>
    )
  }
}

export default PostForm
