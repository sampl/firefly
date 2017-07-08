import Supermodel from './Supermodel'
import yup from 'yup'

var postSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
})

// TODO - learn how to extend Posts with custom methods

var Posts = new Supermodel('Post', '/post', postSchema)

export default Posts
