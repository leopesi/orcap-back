/**
 * @module LogistsController
 */
const Server = require('../../helpers/server')
const Permissions = require('./permissions')
const Sessions = require('./sessions')
const Logist = require('../../models/sessions/logist')
const Session = require('../../models/sessions/session')

module.exports = {
	/**
	 * @function
	 * Seta as rotas dos Logistas
	 */
	setRoutes() {
		Server.addRoute('/logists/:id', this.get, this).get(true)
		Server.addRoute('/logists/', this.list, this).get(true)
		Server.addRoute('/logists', this.create, this).post(true)
		Server.addRoute('/logists/:id/restore', this.restore, this).put(true)
		Server.addRoute('/logists/:id', this.change, this).put(true)
		Server.addRoute('/logists/:id', this.delete, this).delete(true)
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
		if (await Permissions.check(req.token, 'logists', 'select')) {
			const logist = await Logist.findOne({
				where: { id: req.params.id },
				include: 'sessions',
			})
			delete logist.password
			if (logist && logist.id) {
				res.send({ status: 'LOGIST_GET_SUCCESS', data: logist })
			} else {
				res.send({ status: 'LOGIST_NOT_FOUND', error: 'Logist not found' })
			}
		} else {
			res.send({ status: 'LOGIST_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'logists', 'select')) {
			const logists = await Logist.findAll({ where: {}, include: 'sessions' })
			if (logists && logists.length > 0) {
				res.send({ status: 'LOGIST_LIST_SUCCESS', data: logists })
			} else {
				res.send({ status: 'LOGISTS_QUERY_EMPTY', error: 'Logist not found' })
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
	 * Cria um Logista
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		delete req.body.id
		if (await Permissions.check(req.token, 'logists', 'insert')) {
			req.body.password = await Server.getHash(req.body.password)
			req.body.type = 'admin'
			req.body.table = 'logists'
			Sessions.create(req, (result) => {
				if (result.status == 'SESSION_INSERT_SUCCESS') {
					req.body.session_id = result.data.id
					Logist.build(req.body)
						.save()
						.then(async (data) => {
							res.send({ status: 'LOGIST_INSERT_SUCCESS', data })
						})
						.catch((error) => {
							res.send({
								status: 'LOGIST_INSERT_ERROR',
								error: error.parent.detail,
							})
						})
				} else {
					res.send({ status: 'SESSION_INSERT_ERROR', error: result.error })
				}
			})
		} else {
			res.send({ status: 'LOGIST_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'logists', 'update')) {
			const result = await Logist.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.id = result.dataValues.id
				delete req.body.mail
				delete req.body.password
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'LOGIST_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'LOGIST_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'LOGIST_NOT_FOUND',
					error: req.params,
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
	 * Deleta um Logista
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		if (await Permissions.check(req.token, 'logists', 'delete')) {
			const result = await Logist.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = false
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'LOGIST_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'LOGIST_DELETE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'LOGIST_NOT_FOUND',
					error: req.params,
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
	 * Deleta um Logista
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		if (await Permissions.check(req.token, 'logists', 'restore')) {
			const result = await Logist.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = true
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'LOGIST_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'LOGIST_RESTORE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'LOGIST_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({
				status: 'LOGIST_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},
}
