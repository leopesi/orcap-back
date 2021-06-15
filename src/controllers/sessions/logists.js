/**
 * @module LogistsController
 */
const Server = require('../../helpers/server')
const SessionBasicsController = require('../defaults/session-basics')
const Session = require('../../models/sessions/session')
const Logist = require('../../models/sessions/logist')

module.exports = {
	/**
	 * @function
	 * Seta as rotas dos Logistas
	 */
	setRoutes() {
		Server.addRoute('/logists/:id', this.get, this).get(true)
		Server.addRoute('/logists-by-token/:id', this.getByToken, this).get(true)
		Server.addRoute('/logists/', this.list, this).get(true)
		Server.addRoute('/logists', this.create, this).post(true)
		Server.addRoute('/logists/:id/restore', this.restore, this).put(true)
		Server.addRoute('/logists/:id', this.change, this).put(true)
		Server.addRoute('/logists/:id', this.delete, this).delete(true)
		this.setForeignKey()
	},

	/**
	 * @function
	 * Seta as as chaves dos models
	 */
	async setForeignKey() {
		Logist.belongsTo(Session, { foreignKey: 'session_id', as: 'sessions' })
	},

	/**
	 * @function
	 * Retorna um Logista
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	 async get(req, res, self) {
		SessionBasicsController.get(req, res, Logist)
	},

	/**
	 * @function
	 * Retorna um Logista pelo Token de autenticação
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	 async getByToken(req, res, self) {
		req.params.id = Server.decodedIdByToken(req.token)
		SessionBasicsController.get(req, res, Logist)
	},

	/**
	 * @function
	 * Lista de Logista
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		SessionBasicsController.list(req, res, Logist)
	},

	/**
	 * @function
	 * Cria um Logista
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		SessionBasicsController.create(req, res, Logist)
	},

	/**
	 * @function
	 * Altera um Logista
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		SessionBasicsController.change(req, res, Logist)
	},

	/**
	 * @function
	 * Deleta um Logista
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		SessionBasicsController.delete(req, res, Logist)
	},

	/**
	 * @function
	 * Deleta um Logista
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		SessionBasicsController.restore(req, res, Logist)
	},
}
