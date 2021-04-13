/**
 * @module SessionsController
 */
const Server = require('../helpers/server')
const Postgres = require('../helpers/postgres')
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
	async loginUser(req, res, self) {
		const users = await User.findAll({
			where: {
				mail: req.body.mail,
			},
		})
		const response = self.createLoginHash(req, users)
		if (response && response.token) {
			// Postgres.query(
			// 	"UPDATE users set last_login = now() where id = '" +
			// 		Server.decodeToken(response.token) +
			// 		"'",
			// 	() => {
			// 		res.send(response)
			// 	}
			// )
			await User.update(
				{ name: 'OLA', last_login: Date.now() },
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
		// 			res.send({ message: 'USER_NOT_FOUND' })
		// 		}
		// 	}
		// )

		// let user = await User.create({ id: 'fe2255c8-28a3-4133-b076-91fc3c1954fd' });
		// user = await User.findOne();
		// console.log(user.name);
		// const users = await User.findAll({
		// 	where: {
		// 		id: '31355dcd-3e5f-4dae-92d6-6c2e828e1169'
		// 	  }
		// })
		// // console.log(users.every((user) => user instanceof User)) // true
		// console.log(users)
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
			"SELECT id, password from shopkeepers where mail = '" +
				req.body.mail +
				"'",
			(data) => {
				const response = self.createLoginHash(req, data)
				if (response && response.token) {
					Postgres.query(
						"UPDATE shopkeepers set last_login = now() where id = '" +
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
	loginSalesPeople(req, res, self) {
		Postgres.query(
			"SELECT id, password from salespeople where mail = '" +
				req.body.mail +
				"'",
			(data) => {
				const response = self.createLoginHash(req, data)
				if (response && response.token) {
					Postgres.query(
						"UPDATE salespeople set last_login = now() where id = '" +
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
