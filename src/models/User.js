import Supermodel from './_Supermodel'

let User = Object.create(Supermodel)

User.init({
  name: 'User',
  location: '/user',
})

// Override Superclass "create" method in case you try to use it in a view
User.create = function() {
  throw new Error('users are created when they sign in')
}

export default User

// debugging
window.User = User
