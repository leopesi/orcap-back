/**
 * @module SessionsController
 */
const Server = require('../helpers/server')
const Postgres = require('../helpers/postgres')
const User = require('../models/user')

module.exports = {
	setRoutes() {
		Server.addRoute('/login/user', this.loginUser, this).get(false)
		Server.addRoute('/login/logist', this.loginUser, this).get(false)
		Server.addRoute('/login/seller', this.loginUser, this).get(false)
		Server.addRoute('/login/client', this.loginUser, this).get(false)
	},

	/**
	 * @function
	 * Fazer do login usuário admin
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async loginUser(req, res, self) {
		const users = await User.findAll({
			where: {
				mail: req.body.mail,
			},
		})
		const response = self.createLoginHash(req, users)
		if (response && response.token) {
			await User.update(
				{ last_login: Date.now() },
				{
					where: {
						id: Server.decodeToken(response.token),
					},
				}
			)
			res.send(response)
		} else {
			res.send({ message: 'USER_NOT_FOUND' })
		}
	},

	/**
	 * @function
	 * Fazer do login Lojistas admin
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	loginLogist(req, res, self) {
		Postgres.query(
			"SELECT id, password from logists where mail = '" +
				req.body.mail +
				"'",
			(data) => {
				const response = self.createLoginHash(req, data)
				if (response && response.token) {
					Postgres.query(
						"UPDATE logists set last_login = now() where id = '" +
							Server.decodeToken(response.token) +
							"'"
					)
				}
				res.send(response)
			}
		)
	},

	/**
	 * @function
	 * Fazer do login vendedores admin
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	loginSeller(req, res, self) {
		Postgres.query(
			"SELECT id, password from seller where mail = '" +
				req.body.mail +
				"'",
			(data) => {
				const response = self.createLoginHash(req, data)
				if (response && response.token) {
					Postgres.query(
						"UPDATE seller set last_login = now() where id = '" +
							Server.decodeToken(response.token) +
							"'"
					)
				}
				res.send(response)
			}
		)
	},

	/**
	 * @function
	 * Fazer do login clientes admin
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	loginClients(req, res, self) {
		Postgres.query(
			"SELECT id, password from clients where mail = '" + req.body.mail + "'",
			(data) => {
				const response = self.createLoginHash(req, data)
				if (response && response.token) {
					Postgres.query(
						"UPDATE clients set last_login = now() where id = '" +
							Server.decodeToken(response.token) +
							"'"
					)
				}
				res.send(response)
			}
		)
	},

	/**
	 * @function
	 * @param {Object} req
	 * @param {Object} data
	 * @returns {Object}
	 */
	createLoginHash(req, data) {
		if (data && data[0]) {
			data = data[0]
			if (req.body.password) {
				if (Server.compareHash(data.password, req.body.password)) {
					const token = Server.createToken(data.id)
					return { token }
				} else {
					return { error: 'Incorrect password' }
				}
			} else {
				return { error: 'Login data not found' }
			}
		}
	},
}
