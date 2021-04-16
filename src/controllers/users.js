/**
 * @module UsersController
 */
const Server = require('../helpers/server')
const Permissions = require('./permissions')
const User = require('../models/sessions/user')

module.exports = {
	/**
	 * @function
	 * Seta as rotas dos Usuários
	 */
	setRoutes() {
		Server.addRoute('/users/:id', this.get, this).get(true)
		Server.addRoute('/users/', this.list, this).get(true)
		Server.addRoute('/users', this.create, this).post(true)
		Server.addRoute('/users/:id/restore', this.restore, this).put(true)
		Server.addRoute('/users/:id', this.change, this).put(true)
		Server.addRoute('/users/:id', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Retorna um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		if (await Permissions.check(req.token, 'users', 'select')) {
			const user = await User.findOne({ where: { id: req.params.id } })
			if (user && user.dataValues && user.dataValues.id) {
				res.send({ status: 'USER_GET_SUCCESS', data: user })
			} else {
				res.send({ status: 'USER_NOT_FOUND', error: 'User not found' })
			}
		} else {
			res.send({ status: 'USER_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Lista de Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		if (await Permissions.check(req.token, 'users', 'select')) {
			const users = await User.findAll({ where: {} })
			if (users && users.length > 0) {
				res.send({ status: 'USER_LIST_SUCCESS', data: users })
			} else {
				res.send({ status: 'USERS_QUERY_EMPTY', error: 'User not found' })
			}
		} else {
			res.send({ status: 'USER_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Cria um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		if (await Permissions.check(req.token, 'users', 'insert')) {
			delete req.body.id
			req.body.password = await Server.getHash(req.body.password)
			User.build(req.body)
				.save()
				.then((data) => {
					res.send({ status: 'USER_INSERT_SUCCESS', data })
				})
				.catch((error) => {
					res.send({ status: 'USER_INSERT_ERROR', error: error.parent.detail })
				})
		} else {
			res.send({ status: 'USER_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Altera um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		if (await Permissions.check(req.token, 'users', 'update')) {
			const result = await User.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.id = result.dataValues.id
				delete req.body.mail
				delete req.body.password
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'USER_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'USER_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'USER_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'USER_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Deleta um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		if (await Permissions.check(req.token, 'users', 'delete')) {
			const result = await User.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = false
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'USER_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'USER_DELETE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'USER_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'USER_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Deleta um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		if (await Permissions.check(req.token, 'users', 'restore')) {
			const result = await User.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = true
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'USER_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'USER_RESTORE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'USER_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'USER_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},
}
