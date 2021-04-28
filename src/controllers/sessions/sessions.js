/**
 * @module SessionsController
 */
const Server = require('../../helpers/server')
const Permissions = require('./permissions')
const Session = require('../../models/sessions/session')
// const User = require('../../models/sessions/user')
// const Logist = require('../../models/sessions/logist')
// const Seller = require('../../models/sessions/seller')
// const Client = require('../../models/sessions/client')

module.exports = {
	setRoutes() {
		Server.addRoute('/login', this.login, this).get(false)
		Server.addRoute('/sessions/:id', this.get, this).get(true)
		Server.addRoute('/sessions/', this.list, this).get(true)
		Server.addRoute('/sessions', this.insert, this).post(true)
		Server.addRoute('/sessions/:id/restore', this.restore, this).put(true)
		Server.addRoute('/sessions/:id', this.change, this).put(true)
		Server.addRoute('/sessions/:id', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Cria uma Sessão
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, callback) {
		if (await Permissions.check(req.token, 'sessions', 'insert')) {
			req.body.password = await Server.getHash(req.body.password)
			Session.build(req.body)
				.save()
				.then((data) => {
					callback({ status: 'SESSION_INSERT_SUCCESS', data })
				})
				.catch((error) => {
					callback({
						status: 'SESSION_INSERT_ERROR',
						error: error.parent.detail,
					})
				})
		} else {
			callback({
				status: 'SESSION_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
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
			const session = await Session.findOne({
				where: { mail: req.body.mail },
				include: ['users', 'logists', 'sellers', 'clients'],
			})
			if (session) {
				const token = await self.createLoginHash(session, req.body.password)
				if (token) {
					if (session) {
						await Session.update(
							{ last_login: Date.now() },
							{
								where: {
									id: session.id,
								},
							}
						)
						if (session.sessions) {
							res.send({ token, type: session.sessions.type_id })
						} else if (session.logists) {
							res.send({ token, type: session.logists.type_id })
						} else if (session.sellers) {
							res.send({ token, type: session.sellers.type_id })
						}
						if (session.clients) {
							res.send({ token, type: session.clients.type_id })
						}
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

	/**
	 * @function
	 * Retorna um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		if (await Permissions.check(req.token, 'sessions', 'select')) {
			const session = await Session.findOne({
				where: { id: req.params.id },
			})
			delete session.password
			if (session && session.id) {
				res.send({ status: 'SESSION_GET_SUCCESS', data: session })
			} else {
				res.send({ status: 'SESSION_NOT_FOUND', error: 'Session not found' })
			}
		} else {
			res.send({
				status: 'SESSION_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},

	/**
	 * @function
	 * Lista de Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		if (await Permissions.check(req.token, 'sessions', 'select')) {
			const sessions = await Session.findAll({ where: {} })
			if (sessions && sessions.length > 0) {
				res.send({ status: 'SESSION_LIST_SUCCESS', data: sessions })
			} else {
				res.send({ status: 'SESSIONS_QUERY_EMPTY', error: 'Session not found' })
			}
		} else {
			res.send({
				status: 'SESSION_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},

	/**
	 * @function
	 * Cria um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async insert(req, res, self) {
		delete req.body.id
		if (await Permissions.check(req.token, 'sessions', 'insert')) {
			req.body.password = await Server.getHash(req.body.password)
			req.body.type = 'admin'
			req.body.table = 'sessions'
			Sessions.create(req, (result) => {
				if (result.status == 'SESSION_INSERT_SUCCESS') {
					req.body.session_id = result.data.id
					Session.build(req.body)
						.save()
						.then(async (data) => {
							res.send({ status: 'SESSION_INSERT_SUCCESS', data })
						})
						.catch((error) => {
							res.send({
								status: 'SESSION_INSERT_ERROR',
								error: error.parent.detail,
							})
						})
				} else {
					res.send({ status: 'SESSION_INSERT_ERROR', error: result.error })
				}
			})
		} else {
			res.send({
				status: 'SESSION_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
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
		if (await Permissions.check(req.token, 'sessions', 'update')) {
			const result = await Session.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.id = result.dataValues.id
				delete req.body.mail
				delete req.body.password
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'SESSION_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'SESSION_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'SESSION_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({
				status: 'SESSION_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
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
		if (await Permissions.check(req.token, 'sessions', 'delete')) {
			const result = await Session.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = false
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'SESSION_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'SESSION_DELETE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'SESSION_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({
				status: 'SESSION_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},

	/**
	 * @function
	 * Deleta um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		if (await Permissions.check(req.token, 'sessions', 'restore')) {
			const result = await Session.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = true
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'SESSION_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'SESSION_RESTORE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'SESSION_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({
				status: 'SESSION_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},
}
