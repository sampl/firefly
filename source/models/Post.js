import Supermodel from './Supermodel'
import slugify from 'slugify'

var Post = Object.create(Supermodel)

Post.init({
  name: 'Post',
  location: '/post',
})

Post.getBySlug = function(slug, callback) {
  Supermodel.getAllWithAttrValue.bind(this)('slug', slug, function(err, posts){
    if (err) {
      callback(null, err)
    } else {
      if (posts.length == 0) {
        callback(new Error("Couldn't find post with slug "+slug), null)
      } else {
        callback(null, posts[0])
      }
    }
  })
}

Post.create = function(post_data, callback) {
  post_data.slug = slugify(post_data.title).toLowerCase()
  Supermodel.create.bind(this)(post_data, callback)
}

Post.update = function(post_key, post_data, callback) {
  if (post_data.title) {
    post_data.slug = slugify(post_data.title).toLowerCase()
  }
  Supermodel.update.bind(this)(post_key, post_data, callback)
}

export default Post

// debugging
window.Post = Post
