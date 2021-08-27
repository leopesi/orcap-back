/**
 * @module LogistsController
 */
const isuuid = require('isuuid')
const Server = require('../../helpers/server')
const Sessions = require('../sessions/sessions')
const SessionBasicsController = require('../defaults/session-basics')
const Session = require('../../models/sessions/session')
const Logist = require('../../models/sessions/logist')
const Permissions = require('./permissions')

module.exports = {
	/**
	 * @function
	 * Seta as rotas dos Logistas
	 */
	setRoutes() {
		Server.addRoute('/logists/:id', this.get, this).get(true)
		Server.addRoute('/logists-by-token/:id', this.getByToken, this).get(true)
		Server.addRoute('/logists/', this.list, this).get(true)
		Server.addRoute('/logists', this.create, this).post(false)
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
		if (await Permissions.check(req.token, 'logists', 'select')) {
			const md = await Logist.findOne({
				where: { session_id: Server.decodedIdByToken(req.token) },
				include: 'sessions',
			})
			if (md && md.id) {
				delete md.password
				res.send({ status: 'LOGIST_GET_SUCCESS', data: md })
			} else {
				res.send({
					status: 'LOGIST_NOT_FOUND',
					error: 'Logist not found',
				})
			}
		} else {
			res.send({
				status: 'LOGIST_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
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
		delete req.body.id
		req.body.password = await Server.getHash(req.body.password)
		req.body.table = Logist.tableName
		const checkLogist = await Session.findOne({
			where: { mail: req.body.mail },
		})
		if (!checkLogist) {
			Session.build(req.body)
				.save()
				.then((data) => {
					req.body.session_id = data.id
					Logist.build(req.body)
						.save()
						.then(async (data) => {
							res.send({ status: 'LOGIST_INSERT_SUCCESS', data })
						})
						.catch((error) => {
							res.send({
								status: 'LOGIST_INSERT_ERROR',
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
        status: 'MAIL_LOGIST_EXISTS',
        error: 'Logist email already exists in the system',
      })
		}
	},

	/**
	 * @function
	 * Altera um Logista
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		if (!isuuid(req.body.brand_filter_id)) {
			res.send({ status: 'BRAND_FILTER_IS_EMPTY' })
		} else if (!isuuid(req.body.brand_profile_id)) {
			res.send({ status: 'BRAND_PROFILE_IS_EMPTY' })
		} else if (!isuuid(req.body.brand_blanket_id)) {
			res.send({ status: 'BRAND_BLANKET_IS_EMPTY' })
		} else if (!isuuid(req.body.brand_vinyl_id)) {
			res.send({ status: 'BRAND_VINYL_IS_EMPTY' })
		} else {
			req.params.id = await Sessions.getSessionId(req)
			SessionBasicsController.change(req, res, Logist)
		}
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
