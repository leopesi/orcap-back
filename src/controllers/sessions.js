/**
 * @module SessionsController
 */
const Server = require('../helpers/server')
const Session = require('../models/sessions/session')
const User = require('../models/sessions/user')
const Logist = require('../models/sessions/logist')

module.exports = {
	setRoutes() {
		Server.addRoute('/login', this.login, this).get(false)
	},

	/**
	 * @function
	 * Fazer do login geral
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async login(req, res, self) {
		const session = await Session.findOne({ where: { mail: req.body.mail } })
		if (session) {
			const token = self.createLoginHash(session, req.body.password)			
			if (token) {
				let data = null
				if (session.table == 'users') {
					data = await self.loginUser(session.person)
				} else if (session.table == 'logists') {
					data = await self.loginLogist(session.person)
				}
				if (data) {
					res.send({ token, type: session.type })
				} else {
					res.send({ status: session.type.toUpperCase() + '_SESSION_NOT_FOUND' })
				}
			} else {
				res.send({ status: session.type.toUpperCase() + '_NOT_FOUND' })
			}
		} else {
			res.send({ status: 'SESSION_NOT_FOUND' })
		}
	},

	/**
	 * @function
	 * Fazer do login usuário admin
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async loginUser(id) {
		const user = await User.findOne({ where: { id } })
		if (user) {
			await User.update(
				{ last_login: Date.now() },
				{
					where: {
						id,
					},
				}
			)
			return true
		} else {
			return false
		}
	},

	/**
	 * @function
	 * Fazer do login Lojistas admin
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async loginLogist(id) {
		const logist = await Logist.findOne({ where: { id } })
		if (logist) {
			await Logist.update(
				{ last_login: Date.now() },
				{
					where: {
						id,
					},
				}
			)
			return true
		} else {
			return false
		}
	},

	/**
	 * @function
	 * Fazer do login vendedores admin
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async loginSeller(req, res, self) {
		const seller = await Seller.findOne({ where: { mail: req.body.mail } })
		const response = self.createLoginHash(req, seller)
		if (response && response.token) {
			await Seller.update(
				{ last_login: Date.now() },
				{
					where: {
						id: Server.decodeToken(response.token),
					},
				}
			)
			res.send({ token: response.token, type: seller.type })
		} else {
			res.send({ status: 'SELLER_NOT_FOUND' })
		}
	},

	/**
	 * @function
	 * Fazer do login clientes admin
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async loginClient(req, res, self) {
		const client = await Client.findOne({ where: { mail: req.body.mail } })
		const response = self.createLoginHash(req, client)
		if (response && response.token) {
			await Client.update(
				{ last_login: Date.now() },
				{
					where: {
						id: Server.decodeToken(response.token),
					},
				}
			)
			res.send({ token: response.token, type: client.type })
		} else {
			res.send({ status: 'CLIENT_NOT_FOUND' })
		}
	},

	/**
	 * @function
	 * @param {Object} req
	 * @param {Object} data
	 * @returns {Object}
	 */
	createLoginHash(data, password) {
		if (data) {
			if (password) {
				if (Server.compareHash(data.password, password)) {
					const token = Server.createToken(data.id)
					return token
				} else {
					return false
				}
			} else {
				return false
			}
		}
	},
}
