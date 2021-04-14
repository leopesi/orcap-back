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
		Server.addRoute('/users', this.create, this).post(false)
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
		if (Permissions.check()) {
			delete req.body.id
			req.body.password = await Server.getHash(req.body.password)
			User.build(req.body)
				.save()
				.then((data) => {
					res.send(true)
				})
				.catch((error) => {
					console.log(error)
					res.send(false)
				})
		} else {
			res.send({ message: '.USER_INSERT_ERROR', data })
		}
	},

	/**
	 * @function
	 * Altera um usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	change(req, res, self) {
		if (Permissions.check()) {
			const id = Server.decodedIdByRequestHeader(req)
		} else {
			res.send({ error: 'USER_UPDATE_ERROR', data })
		}
	},

	/**
	 * @function
	 * Deleta um usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	delete(req, res, self) {},
}
