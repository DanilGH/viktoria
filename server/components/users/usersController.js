const knex = require('../../config/database')
const config = require('config')
const initUser = require('./user')
const User = initUser(knex)

/**
 * Создать нового пользователя
 * @method POST /api/users
 * @param req
 * @param res
 * @param next
 */
const postUsers = (req, res, next) => {
  const props = req.body.user

  User.create(props)
    .then(user => res.json({
      ok: true,
      message: 'User created',
      user
    }))
    .catch((err) => {
      if (err.code === '23505') {
        next({
          message: 'Пользователь с данным телефоном уже существует!'
        })
      } else {
        next(err)
      }
    })
}

/**
 * Получить пользователей согласно выбранной страницы
 * @method GET /api/users
 * @param req
 * @param res
 * @param next
 */
const getUsers = (req, res, next) => {
  let page = req.query.page
  let limit = config.get('pagination.limit')
  let offset = 0

  if (!page || page <= 0) {
    page = 1
  }

  if (page > 1) {
    offset = (page - 1) * limit
  }

  User.findAll(limit, offset)
    .then(users => {
      return User.countAll()
        .then(data => res.json({
          ok: true,
          message: 'Users found',
          pagination: {
            limit: +limit,
            page: +page,
            countUsers: +data.count,
            countPages: Math.ceil((+data.count) / limit),
            nextPage: +page + 1,
            prePage: +page - 1
          },
          users
        }))
    })
    .catch(next)
}

/**
 * Получение пользователя по id
 * @method GET /api/users/:id
 * @param req
 * @param res
 * @param next
 */
const getUser = (req, res, next) => {
  const userId = req.params.id

  User.findById(userId)
    .then(user => res.json({
      ok: true,
      message: 'User found',
      user
    }))
    .catch(next)
}

/**
 * Изменение пользователя по id
 * @method PUT /api/users/:id
 * @param req
 * @param res
 * @param next
 */
const putUser = (req, res, next) => {
  const userId = req.params.id
  const props = req.body.user

  User.update(userId, props)
    .then(user => res.json({
      ok: true,
      message: 'User updated',
      user
    }))
    .catch((err) => {
      if (err.code === '23505') {
        next({
          message: 'Пользователь с данным телефоном уже существует!'
        })
      } else {
        next(err)
      }
    })
}

/**
 * Удаление пользователя по id
 * @method DELETE /api/users/:id
 * @param req
 * @param res
 * @param next
 */
const deleteUser = (req, res, next) => {
  const userId = req.params.id

  User.destroy(userId)
    .then(deleteCount => res.json({
      ok: true,
      message: `User '${userId}' deleted`,
      deleteCount
    }))
    .catch(next)
}

module.exports = {
  postUsers,
  getUsers,
  getUser,
  putUser,
  deleteUser
}