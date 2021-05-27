/**
 * @module SellersController
 */
const Server = require('../../helpers/server')
const SessionBasicsController = require('../defaults/session-basics')
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
		SessionBasicsController.get(req, res, Seller)
	},

	/**
	 * @function
	 * Lista de Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		console.log('SELLER LIST')
		const logist_id = Server.decodedIdByToken(req.token)
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
		req.body.logist_id = Server.decodedIdByToken(req.token)
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
		SessionBasicsController.change(req, res, Seller)
	},

	/**
	 * @function
	 * Deleta um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		SessionBasicsController.delete(req, res, Seller)
	},

	/**
	 * @function
	 * Deleta um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		SessionBasicsController.restore(req, res, Seller)
	},
}
