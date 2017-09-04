import Supermodel from './_Supermodel'
import slugify from 'slugify'

let Post = Object.create(Supermodel)

Post.init({
  name: 'Post',
  location: '/post',
})

Post.getBySlug = function(slug) {
  return Supermodel.getAllWithAttrValue.bind(this)('slug', slug).then( (posts) => {
    if (posts.length === 0) {
      throw new Error("Couldn't find post with slug "+slug)
    } else {
      return posts[0]
    }
  })
}

Post.create = function(post_data) {
  post_data.slug = slugify(post_data.title).toLowerCase()
  return Supermodel.create.bind(this)(post_data)
}

Post.update = function(post_key, post_data) {
  if (post_data.title) {
    post_data.slug = slugify(post_data.title).toLowerCase()
  }
  return Supermodel.update.bind(this)(post_key, post_data)
}

export default Post

// debugging
window.Post = Post
