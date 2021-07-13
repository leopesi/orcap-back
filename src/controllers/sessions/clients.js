/**
 * @module ClientsController
 */
const Server = require('../../helpers/server')
const Sessions = require('../sessions/sessions')
const Permissions = require('../sessions/permissions')
const SessionBasicsController = require('../defaults/session-basics')
const Session = require('../../models/sessions/session')
const Client = require('../../models/sessions/client')
const Logist = require('../../models/sessions/logist')

module.exports = {
	/**
	 * @function
	 * Seta as rotas dos Usuários
	 */
	setRoutes() {
		Server.addRoute('/clients/:id', this.get, this).get(true)
		Server.addRoute('/clients-by-documents/', this.getClientsByDocument, this).get(true)
		Server.addRoute('/clients-by-documents/:document', this.getClientsByDocument, this).get(true)
		Server.addRoute('/clients/', this.list, this).get(true)
		Server.addRoute('/clients', this.create, this).post(true)
		Server.addRoute('/clients/:id/restore', this.restore, this).put(true)
		Server.addRoute('/clients/:id', this.change, this).put(true)
		Server.addRoute('/clients/:id', this.delete, this).delete(true)
		this.setForeignKey()
	},

	/**
	 * @function
	 * Seta as as chaves dos models
	 */
	async setForeignKey() {
		Client.belongsTo(Session, { foreignKey: 'session_id', as: 'sessions' })
		Client.belongsTo(Logist, { foreignKey: 'logist_id', as: 'logists' })
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
		SessionBasicsController.get(req, res, Client, { where: { logist_id } })
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
		SessionBasicsController.list(req, res, Client, { where: { logist_id } })
	},

	/**
	 * @function
	 * Cria um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		req.body.logist_id = await Sessions.getSessionId(req)
		SessionBasicsController.create(req, res, Client)
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
		const result = await Client.findOne({ where: { id: req.body.id, logist_id } })
		if (result) {
			SessionBasicsController.change(req, res, Client)
		} else {
			res.send({ status: 'CLIENT_UPDATE_SESSION_ERROR', error: 'Data not found' })
		}
	},

	/**
	 * @function
	 * Altera ou Cria um cliente
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async saveByBudget(req, res, self, callback) {
		const logist_id = await Sessions.getSessionId(req)
		if (req.body.clients) {
			if (req.body.clients.id) {
				const result = await Client.findOne({ where: { id: req.body.clients.id, logist_id } })
				if (result) {
					delete req.body.clients.password
					await result
						.update(req.body.clients)
						.then(async () => {
							const resultSession = await Session.findOne({ where: { id: result.dataValues.session_id } })
							if (resultSession) {
								req.body.clients.sessions.mail = req.body.clients.mail
								await resultSession
									.update(req.body.clients.sessions)
									.then(async () => {
										callback({})
									})
									.catch(async (error) => {
										callback({ error })
									})
							} else {
								callback({ error: 'SESSION_CLIENT_NOT_FOUND' })
							}
						})
						.catch(async (error) => {
							callback({ error })
						})
				} else {
					callback({})
				}
			} else {
				delete req.body.clients.id
				req.body.clients.logist_id = logist_id
				if (await Permissions.check(req.token, 'sessions', 'insert')) {
					req.body.clients.password = await Server.getHash(Date.now())
					await Session.build(req.body.clients)
						.save()
						.then(async (result) => {
							if (result) {
								req.body.clients.session_id = result.dataValues.id
								await Client.build(req.body.clients)
									.save()
									.then(async (result2) => {
										callback({ id: result2.dataValues.id })
									})
									.catch(async (error) => {
										await Session.destroy({ where: { id: result.dataValues.id } })
										callback({ error })
									})
							} else {
								callback({ error: 'SESSION_CLIENT_NOT_FOUND' })
							}
						})
						.catch(async (error) => {
							callback({ error })
						})
				} else {
					callback({ error: 'SESSION_CLIENT_NOT_FOUND' })
				}
			}
		} else {
			callback({})
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
		SessionBasicsController.delete(req, res, Client, { where: { logist_id } })
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
		SessionBasicsController.restore(req, res, Client, { where: { logist_id } })
	},

	/**
	 * @function
	 * Busca um cliente pelo documento (CPF/CNPJ)
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async getClientsByDocument(req, res, self) {
		const logist_id = await Sessions.getSessionId(req)
		if (req.params.document && req.params.document.toString().trim() != '') {
			SessionBasicsController.list(req, res, Client, { where: { logist_id, document: req.params.document } })
		} else {
			res.send({})
		}
	},
}
