/**
 * @module ClientsController
 */
const Server = require('../../helpers/server')
const SessionBasicsController = require('../defaults/session-basics')
const Session = require('../../models/sessions/session')
const Client = require('../../models/sessions/client')

module.exports = {
	/**
	 * @function
	 * Seta as rotas dos Clientas
	 */
	setRoutes() {
		Server.addRoute('/clients/:id', this.get, this).get(true)
		Server.addRoute('/clients/', this.list, this).get(true)
		Server.addRoute('/clients', this.create, this).post(true)
		Server.addRoute('/clients/:id/restore', this.restore, this).put(true)
		Server.addRoute('/clients/:id', this.change, this).put(true)
		Server.addRoute('/clients/:id', this.delete, this).delete(true)
		Client.belongsTo(Session, { foreignKey: 'session_id', as: 'sessions' })
	},

	/**
	 * @function
	 * Retorna um Clienta
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		SessionBasicsController.get(req, res, Client)
	},

	/**
	 * @function
	 * Lista de Clienta
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		SessionBasicsController.list(req, res, Client)
	},

	/**
	 * @function
	 * Cria um Clienta
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		SessionBasicsController.create(req, res, Client)
	},

	/**
	 * @function
	 * Altera um Clienta
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		SessionBasicsController.change(req, res, Client)
	},

	/**
	 * @function
	 * Deleta um Clienta
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		SessionBasicsController.delete(req, res, Client)
	},

	/**
	 * @function
	 * Deleta um Clienta
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		SessionBasicsController.restore(req, res, Client)
	},
}
