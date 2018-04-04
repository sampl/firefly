import React from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'

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
      <Form onSubmit={this._submit}>
        <div>
          Title
          <Input name="title" value={this.state.post.title} validations={['required']} onChange={this._onChange} />
        </div>
        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}

const required = value => {
  if (!value.toString().trim().length) {
    return <span style={{color: 'hsl(0, 80%, 60%)', display: 'block'}}>Required</span>
  }
}

export default PostForm
