/**
 * @module SellersController
 */
const Server = require('../../helpers/server')
const SessionBasicsController = require('../defaults/session-basics')
const Sessions = require('./sessions')
const Permissions = require('./permissions')
const Session = require('../../models/sessions/session')
const Seller = require('../../models/sessions/seller')
const Logist = require('../../models/sessions/logist')

module.exports = {
	/**
	 * @function
	 * Seta as rotas dos Usuários
	 */
	setRoutes() {
		Server.addRoute('/sellers-by-token/:id', this.getByToken, this).get(true)
		Server.addRoute('/sellers/:id', this.get, this).get(true)
		Server.addRoute('/sellers/', this.list, this).get(true)
		Server.addRoute('/sellers', this.create, this).post(true)
		Server.addRoute('/sellers/:id/restore', this.restore, this).put(true)
		Server.addRoute('/sellers/:id', this.change, this).put(true)
		Server.addRoute('/sellers/:id', this.delete, this).delete(true)
		this.setForeignKey()
	},

	/**
	 * @function
	 * Seta as as chaves dos models
	 */
	async setForeignKey() {
		Seller.belongsTo(Session, { foreignKey: 'session_id', as: 'sessions' })
		Seller.belongsTo(Logist, { foreignKey: 'logist_id', as: 'logists' })
	},

	/**
	 * @function
	 * Retorna um Vendedor pelo Token de autenticação
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async getByToken(req, res, self) {
		if (await Permissions.check(req.token, 'sellers', 'select')) {
			const md = await Seller.findOne({
				where: { session_id: Server.decodedIdByToken(req.token) },
				include: ['sessions', 'logists'],
			})
			if (md && md.id) {
				delete md.password
				res.send({ status: 'SELLER_GET_SUCCESS', data: md })
			} else {
				res.send({
					status: 'SELLER_NOT_FOUND',
					error: 'Seller not found',
				})
			}
		} else {
			res.send({
				status: 'SELLER_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},

	/**
	 * @function
	 * Retorna um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		const logist_id = await Sessions.getSessionId(req)
		SessionBasicsController.get(req, res, Seller, { where: { logist_id } })
	},

	/**
	 * @function
	 * Lista de Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		const logist_id = await Sessions.getSessionId(req)
		SessionBasicsController.list(req, res, Seller, { where: { logist_id } })
	},

	/**
	 * @function
	 * Cria um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */

	async create(req, res, self) {
		delete req.body.id
		req.body.password = await Server.getHash(req.body.password)
		req.body.table = 'sellers'
		req.body.logist_id = await Sessions.getSessionId(req)
		const checkSeller = await Session.findOne({
			where: { mail: req.body.mail },
		})
		if (!checkSeller) {
			if (req.body.logist_id) {
				Session.build(req.body)
					.save()
					.then((data) => {
						req.body.session_id = data.id
						req.body.active = true
						Seller.build(req.body)
							.save()
							.then(async (data) => {
								res.send({ status: 'SELLER_INSERT_SUCCESS', data })
							})
							.catch((error) => {
								res.send({
									status: 'SELLER_INSERT_ERROR',
									error: error.parent ? error.parent.detail : error,
								})
							})
					})
					.catch((error) => {
						res.send({
							status: 'SESSION_INSERT_ERROR',
							error: error.parent ? error.parent.detail : error,
						})
					})
			} else {
				res.send({
					status: 'LOGIST_TOKEN_NOT_FINDED',
					error: '',
				})
			}
		} else {
			res.send({
				status: 'MAIL_SELLER_EXISTS',
				error: 'Seller email already exists in the system',
			})
		}
	},

	async deleteSessions(session_id, equipments) {
		const md = await Session.findOne({
			where: { id: session_id },
		})
		if (md) {
			await Session.destroy({ where: { id: session_id } })
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
		const logist_id = await Sessions.getSessionId(req)
		const result = await Seller.findOne({ where: { id: req.body.id, logist_id } })
		if (result) {
			SessionBasicsController.change(req, res, Seller)
		} else {
			res.send({ status: 'SELLER_UPDATE_SESSION_ERROR', error: 'Data not found' })
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
		const logist_id = await Sessions.getSessionId(req)
		SessionBasicsController.delete(req, res, Seller, { where: { logist_id } })
	},

	/**
	 * @function
	 * Deleta um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		const logist_id = await Sessions.getSessionId(req)
		SessionBasicsController.restore(req, res, Seller, { where: { logist_id } })
	},
}
