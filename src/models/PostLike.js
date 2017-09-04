import Supermodel from './_Supermodel'

let PostLike = Object.create(Supermodel)

PostLike.init({
  name: 'Post like',
  location: '/post_like',
})

export default PostLike

// debugging
window.PostLike = PostLike
