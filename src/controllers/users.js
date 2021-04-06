/**
 * @module UsersController
 */
const Server = require('../helpers/server')
const Postgres = require('../helpers/postgres')
const Permissions = require('./permissions')

module.exports = {
	setRoutes() {
		Server.addRoute('/users/:id', this.get, this).get(true)
		Server.addRoute('/users/', this.list, this).get(true)
		Server.addRoute('/users', this.create, this).post(true)
		Server.addRoute('/users/:id', this.change, this).put(true)
		Server.addRoute('/users/:id', this.delete, this).delete(true)
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
	create(req, res, self) {},

	/**
	 * @function
	 * Altera um usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	change(req, res, self) {
		if (Permissions.check()) {
			const id = Server.decodedID(req)
			Postgres.query(
				"UPDATE users set name = '" +
					req.body.name +
					"' where id = '" +
					id +
					"'",
				(data) => {
					res.send({ message: 'Atualizado' })
				}
			)
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
