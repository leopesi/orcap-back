/**
 * @module UsersController
 */
const Server = require('../helpers/server')
const Postgres = require('../helpers/postgres')
const Permissions = require('./permissions')
const User = require('../models/user')

module.exports = {
	/**
	 * @function
	 * Seta as rotas dos Usuários
	 */
	setRoutes() {
		Server.addRoute('/users/:id', this.get, this).get(true)
		Server.addRoute('/users/', this.list, this).get(true)
		Server.addRoute('/users', this.create, this).post(true)
		Server.addRoute('/users', this.change, this).put(true)
		Server.addRoute('/users', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Retorna um usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	get(req, res, self) {},

	/**
	 * @function
	 * Lista de usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	list(req, res, self) {},

	/**
	 * @function
	 * Cria um usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		if (await Permissions.check(req, 'users', 'insert')) {
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
	 * Altera um usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		if (await Permissions.check(req, 'users', 'update')) {
			const mail = req.body.mail
			const result = await User.findOne({ where: { mail } })
			req.body.name = req.body.name.split(' ')[0] + ' 2'
			req.body.id = result.dataValues.id
			delete req.body.mail
			delete req.body.password
			result
				.update(req.body)
				.then((data) => {
					res.send({ status: 'USER_UPDATE_SUCCESS', data })
				})
				.catch((error) => {
					res.send({ status: 'USER_UPDATE_ERROR', error: error.parent.detail })
				})
		} else {
			res.send({ status: 'USER_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Deleta um usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		if (await Permissions.check(req, 'users', 'delete')) {
			const mail = req.body.mail
			const result = await User.findOne({ where: { mail } })
			req.body.name = req.body.name.split(' ')[0] + ' 2'
			req.body.id = result.dataValues.id
			delete req.body.mail
			delete req.body.password
			result
				.update(req.body)
				.then((data) => {
					res.send({ status: 'USER_UPDATE_SUCCESS', data })
				})
				.catch((error) => {
					res.send({ status: 'USER_UPDATE_ERROR', error: error.parent.detail })
				})
		} else {
			res.send({ status: 'USER_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},
}
