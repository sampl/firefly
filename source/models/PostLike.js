import Supermodel from './Supermodel'

var PostLike = Object.create(Supermodel)

PostLike.init({
  name: 'Post like',
  location: '/post_like',
})

export default PostLike

// debugging
window.PostLike = PostLike
