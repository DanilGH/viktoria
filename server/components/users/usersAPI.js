const router = require('express').Router()

const {
  postUsers,
  getUsers,
  getUser,
  putUser,
  deleteUser
} = require('./usersController')

router.route('/users')
  .post(postUsers)
  .get(getUsers)

router.route('/users/:id')
  .get(getUser)
  .put(putUser)
  .delete(deleteUser)

module.exports = router