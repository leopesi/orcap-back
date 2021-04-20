/**
 * @module SessionsController
 */
const Server = require('../helpers/server')
const Session = require('../models/sessions/session')
const User = require('../models/sessions/user')
const Logist = require('../models/sessions/logist')
const Seller = require('../models/sessions/seller')
const Client = require('../models/sessions/client')

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
		if (req.body.mail && req.body.password) {
			const session = await Session.findOne({ where: { mail: req.body.mail } })
			if (session) {
				const token = await self.createLoginHash(session, req.body.password)
				if (token) {
					let data = null
					if (session.table == 'users') {
						data = await self.loginUser(session.person)
					} else if (session.table == 'logists') {
						data = await self.loginLogist(session.person)
					} else if (session.table == 'sellers') {
						data = await self.loginSeller(session.person)
					}
					if (data) {
						res.send({ token, type: session.type })
					} else {
						res.send({
							status: session.type.toUpperCase() + '_SESSION_NOT_FOUND',
						})
					}
				} else {
					res.send({ status: session.type.toUpperCase() + '_NOT_FOUND' })
				}
			} else {
				res.send({ status: 'SESSION_NOT_FOUND' })
			}
		} else {
			res.send({ status: 'SESSION_DATA_NOT_FOUND' })
		}
	},

	/**
	 * @function
	 * Fazer do login usuário admin
	 * @param {String} id
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
	 * @param {String} id
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
	 * @param {String} id
	 */
	async loginSeller(id) {
		const seller = await Seller.findOne({ where: { id } })
		if (seller) {
			await Seller.update(
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
	 * Fazer do login clientes admin
	 * @param {String} id
	 */
	async loginClient(req, res, self) {
		const logist = await Client.findOne({ where: { id } })
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
	 * @param {Object} req
	 * @param {Object} data
	 * @returns {Object}
	 */
	async createLoginHash(data, password) {
		if (data) {
			if (password) {
				const result = await Server.compareHash(data.password, password)
				if (result !== false) {
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
