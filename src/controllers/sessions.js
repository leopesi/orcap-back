/**
 * @module SessionsController
 */
const Server = require('../helpers/server')
const Postgres = require('../helpers/postgres')
const MSG_USER = require('../messages/controllers/messages-users')
const User = require('../models/user')

module.exports = {

	setRoutes() {
		Server.addRoute('/login/user', this.loginUser, this).get(false)
		Server.addRoute('/login/shopkeepers', this.loginUser, this).get(false)
		Server.addRoute('/login/salespeople', this.loginUser, this).get(false)
		Server.addRoute('/login/client', this.loginUser, this).get(false)
	},

	/**
	 * @function
	 * Fazer do login usuário admin
	 * @param {Object} req 
	 * @param {Object} res 
	 * @param {Object} self
	 */
	loginUser(req, res, self) {
		// Postgres.query(
		// 	"SELECT id, password from users where mail = '" + req.body.mail + "'",
		// 	(data) => {
		// 		const response = self.createLoginHash(req, data)
		// 		if (response && response.token) {
		// 			Postgres.query(
		// 				"UPDATE users set last_login = now() where id = '" + Server.decodeToken(response.token) + "'",
		// 				() => {
		// 					res.send(response)
		// 				}
		// 			)
		// 		} else {
		// 			res.send({ message: MSG_USER.USER_NOT_FOUND })
		// 		}
		// 	}
		// )

		console.log(User.get())
		
	},

	/**
	 * @function
	 * Fazer do login Lojistas admin
	 * @param {Object} req 
	 * @param {Object} res 
	 * @param {Object} self
	 */
	 loginShopKeepers(req, res, self) {
		Postgres.query(
			"SELECT id, password from shopkeepers where mail = '" + req.body.mail + "'",
			(data) => {
				const response = self.createLoginHash(req, data)
				if (response && response.token) {
					Postgres.query(
						"UPDATE shopkeepers set last_login = now() where id = '" + Server.decodeToken(response.token) + "'",
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
	 loginSalesPeople(req, res, self) {
		Postgres.query(
			"SELECT id, password from salespeople where mail = '" + req.body.mail + "'",
			(data) => {
				const response = self.createLoginHash(req, data)
				if (response && response.token) {
					Postgres.query(
						"UPDATE salespeople set last_login = now() where id = '" + Server.decodeToken(response.token) + "'",
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
						"UPDATE clients set last_login = now() where id = '" + Server.decodeToken(response.token) + "'",
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
	}

}
