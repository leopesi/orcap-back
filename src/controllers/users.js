/**
 * @module UsersController
 */
const Server = require('../helpers/server')
const Postgres = require('../helpers/postgres')
const Permissions = require('./permissions')
const MSG_USER = require('../messages/controllers/messages-users')

module.exports = {
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
			const sql =
				"INSERT into users (name, mail, password, created_on, last_login) values ('" +
				req.body.name +
				"', '" +
				req.body.mail +
				"', '" +
				(await Server.getHash(req.body.password)) +
				"', now(), now())"
			Postgres.query(sql, (data) => {
				if (!data.error) {
					res.send({ message: MSG_USER.USER_CREATED, data })
				} else {
					res.send({ error: MSG_USER.USER_INSERT_ERROR })
				}
			})
		} else {
			res.send({ message: 'Açao nao permitida', data })
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
			Postgres.query(
				"UPDATE users set name = '" +
					req.body.name +
					"' where id = '" +
					id +
					"'",
				(data) => {
					res.send({ message: 'Atualizado', data })
				}
			)
		} else {
			res.send({ message: 'Açao nao permitida', data })
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
