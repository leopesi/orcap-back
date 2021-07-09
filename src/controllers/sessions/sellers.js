/**
 * @module SellersController
 */
const Server = require('../../helpers/server')
const SessionBasicsController = require('../defaults/session-basics')
const Sessions = require('./sessions')
const Session = require('../../models/sessions/session')
const Seller = require('../../models/sessions/seller')
const Logist = require('../../models/sessions/logist')

module.exports = {
	/**
	 * @function
	 * Seta as rotas dos Usuários
	 */
	setRoutes() {
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
	 * Retorna um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		const logist_id = await Sessions.getSessionIdByLogist(req.token)
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
		const logist_id = await Sessions.getSessionIdByLogist(req.token)
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
		req.body.logist_id = await Sessions.getSessionIdByLogist(req.token)
		SessionBasicsController.create(req, res, Seller)
	},

	/**
	 * @function
	 * Altera um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		const logist_id = await Sessions.getSessionIdByLogist(req.token)
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
		const logist_id = await Sessions.getSessionIdByLogist(req.token)
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
		const logist_id = await Sessions.getSessionIdByLogist(req.token)
		SessionBasicsController.restore(req, res, Seller, { where: { logist_id } })
	},
}
