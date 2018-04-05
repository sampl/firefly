import React from 'react'
import { Formik } from 'formik'

import {
  Label,
  Input,
  ValidationError,
  Button,
} from '../../styles/forms'

class PostForm extends React.Component {

  _validate = values => {
    let errors = {}
    if (!values.title) {
      errors.title = 'You have to add a title to your post'
    }
    return errors
  }

  _submit = values => {
    this.props.onSubmit(values)
  }

  render() {
    return <Formik
      initialValues={{
        title: this.props.post ? this.props.post.title : '',
        content: this.props.post ? this.props.post.content : '',
      }}
      validate={this._validate}
      onSubmit={this._submit}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>

          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
          />
          {touched.title && errors.title && <ValidationError>{errors.title}</ValidationError>}

          <br />

          <Label for="content">Content</Label>
          <Input
            type="text"
            name="content"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.content}
          />
          {touched.content && errors.content && <ValidationError>{errors.content}</ValidationError>}

          <br />

          <Button type="submit" disabled={isSubmitting}>Submit</Button>

        </form>
      )}
    />

  }
}

export default PostForm
