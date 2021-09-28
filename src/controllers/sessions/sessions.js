/**
 * @module SessionsController
 */
const Server = require('../../helpers/server')
const Sessions = require('../sessions/sessions')
const Permissions = require('./permissions')
const Session = require('../../models/sessions/session')

const MailsSendActive = require('../mails/sessions/send-mail-active')
const User = require('../../models/sessions/user')
const Logist = require('../../models/sessions/logist')
const Seller = require('../../models/sessions/seller')
const Client = require('../../models/sessions/client')

module.exports = {
	setRoutes() {
		Server.addRoute('/login', this.login, this).get(false)

		Server.addRoute('/sessions/send-mail-active/:mail', this.sendMailActive, this).get(false)
		Server.addRoute('/sessions/active-account/:hash/:mail', this.activeAccount, this).get(false)
		Server.addRoute('/sessions/send-mail-password/:mail', this.sendMailPassword, this).get(false)
		Server.addRoute('/sessions/change-password-mail/:hash/:mail/:password', this.changePasswordMail, this).get(false)
		Server.addRoute('/sessions/change-password', this.changePassword, this).post(true)

		Server.addRoute('/sessions/:id', this.get, this).get(true)
		Server.addRoute('/sessions/', this.list, this).get(true)
		Server.addRoute('/sessions', this.insert, this).post(true)
		Server.addRoute('/sessions/:id/restore', this.restore, this).put(true)
		Server.addRoute('/sessions/:id', this.change, this).put(true)
		Server.addRoute('/sessions/:id', this.delete, this).delete(true)
		this.setForeignKey()
	},

	/**
	 * @function
	 * Seta as as chaves dos models
	 */
	async setForeignKey() {},

	async getSessionId(req) {
		const id = Server.decodedIdByToken(req.token)
		const md = await Session.findOne({
			where: { id },
		})
		if (md && md.dataValues) {
			if (md.dataValues.table == 'logists') {
				return this.getSessionIdByLogist(md.dataValues.id)
			} else if (md.dataValues.table == 'sellers') {
				return Server.decodedIdByToken(req.logistToken)
			}
		} else {
			return null
		}
	},

	async getSessionIdByLogist(session_id) {
		const md = await Logist.findOne({
			where: { session_id },
		})
		if (md && md.dataValues) {
			return md.dataValues.id
		} else {
			return null
		}
	},
	
	/**
	 * @function
	 * Cria uma Sessão
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, callback) {
		console.log('CREATE ON SESSIONS CONTROLLER ')
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
									id: session.dataValues.id,
								},
							}
						)
						if (session.users) {
							res.send({ token, type: 'user', name: session.users.name })
						} else if (session.logists) {
							res.send({ token, type: 'logist', name: session.logists.name, logist_id: session.logists.id })
						} else if (session.sellers) {
							const logist_token = Server.createToken(session.sellers.logist_id)
							res.send({ token, logist_token, type: 'seller', name: session.sellers.name, logist_id: session.logist_id.name })
						} else if (session.clients) {
							res.send({ token, type: 'client', name: session.clients.name })
						} else {
							res.send({
								status: (session.type ? session.type.toUpperCase() : '_') + 'SESSION_NOT_FOUND',
							})
						}
					} else {
						res.send({
							status: (session.type ? session.type.toUpperCase() : '_') + 'SESSION_NOT_FOUND',
						})
					}
				} else {
					res.send({ status: (session.type ? session.type.toUpperCase() : '_') + 'NOT_FOUND' })
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
	 * Ativar conta
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async activeAccount(req, res, self) {
		const session = await Session.findOne({
			attributes: ['id', 'active_hash', 'active', 'updatedAt'],
			where: { active_hash: req.params.hash, mail: req.params.mail },
		})
		if (session && session.dataValues.id) {
			const d1 = new Date(session.updatedAt)
			d1.setMinutes(d1.getMinutes() + 5)
			const d2 = new Date(Date.now())
			if (d1 > d2) {
				session
					.update({ active_hash: null, active: true })
					.then((data) => {
						res.send({
							status: 'SESSION_ACTIVE_SUCCESS',
							data: session,
						})
					})
					.catch((error) => {
						res.send({
							status: 'SESSION_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({ status: 'SESSION_EXPIRED_KEY', error: 'Expired key to active account' })
			}
		} else {
			res.send({ status: 'SESSION_ACTIVE_ERROR', error: 'Session not found' })
		}
	},

	/**
	 * @function
	 * Enviar email para ativar conta
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async sendMailActive(req, res, self) {
		const session = await Session.findOne({
			attributes: ['id', 'active_hash', 'mail'],
			where: { mail: req.params.mail },
		})
		if (session && session.dataValues.id) {
			const result = await session
				.update({
					active_hash: Server.createToken(session.dataValues.id + req.params.mail),
				})
				.catch((error) => {
					res.send({
						status: 'SESSION_UPDATE_ERROR',
						error: error.parent.detail,
					})
				})
			if (result) {
				res.send({
					status: 'SESSION_SEND_MAIL_ACTIVE_SUCCESS',
					data: session,
				})
				// MailsSendActive.mail((session), (response) => {
				// 	if (response && response.status == 'success') {
				// 		res.send({
				// 			status: 'SESSION_SEND_MAIL_ACTIVE_SUCCESS',
				// 			data: session,
				// 		})
				// 	} else {
				// 		res.send({
				// 			status: 'SESSION_SEND_MAIL_ACTIVE_ERROR',
				// 			error: response.error,
				// 		})
				// 	}
				// })
			}
		} else {
			res.send({ status: 'SESSION_NOT_FOUND', error: 'Session not found' })
		}
	},
	/**
	 * @function
	 * Modificar senha
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async changePassword(req, res, self) {
		const id = Server.decodedIdByToken(req.token)
		const session = await Session.findOne({
			attributes: ['id', 'password'],
			where: { id, active: true },
		})
		if (session && session.dataValues.id) {
			const token = await self.createLoginHash(session, req.body.actual_password)
			if (token) {
				const new_password = await Server.getHash(req.body.new_password)
				session
					.update({ password_hash: null, active: true, password: new_password })
					.then((data) => {
						delete data.password
						res.send({
							status: 'SESSION_PASSWORD_CHANGED',
							data: data,
						})
					})
					.catch((error) => {
						res.send({
							status: 'SESSION_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({ status: 'SESSION_ERROR_PASSWORD', error: 'Session error password' })
			}
		} else {
			res.send({ status: 'SESSION_ACTIVE_ERROR', error: 'Session not found' })
		}
	},

	/**
	 * @function
	 * Modificar senha pelo Hash do Email
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async changePasswordMail(req, res, self) {
		const session = await Session.findOne({
			attributes: ['id', 'password_hash', 'active', 'updatedAt'],
			where: { password_hash: req.params.hash, mail: req.params.mail, active: true },
		})
		if (session && session.dataValues.id) {
			const d1 = new Date(session.updatedAt)
			d1.setMinutes(d1.getMinutes() + 5)
			const d2 = new Date(Date.now())
			if (d1 > d2 && req.params.password.toString().trim() != '') {
				const password = await Server.getHash(req.params.password)
				session
					.update({ password_hash: null, active: true, password })
					.then((data) => {
						delete data.password
						res.send({
							status: 'SESSION_ACTIVE_SUCCESS',
							data: data,
						})
					})
					.catch((error) => {
						res.send({
							status: 'SESSION_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({ status: 'SESSION_EXPIRED_KEY', error: 'Expired key to active account' })
			}
		} else {
			res.send({ status: 'SESSION_ACTIVE_ERROR', error: 'Session not found' })
		}
	},

	/**
	 * @function
	 * Enviar email para alterar senha
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async sendMailPassword(req, res, self) {
		const session = await Session.findOne({
			attributes: ['id', 'password_hash', 'mail'],
			where: { mail: req.params.mail, active: true },
		})
		if (session && session.dataValues.id) {
			session
				.update({
					password_hash: Server.createToken(session.dataValues.id + req.params.mail),
				})
				.then((data) => {
					res.send({
						status: 'SESSION_SEND_MAIL_ACTIVE_SUCCESS',
						data: session,
					})
				})
				.catch((error) => {
					res.send({
						status: 'SESSION_UPDATE_ERROR',
						error: error.parent.detail,
					})
				})
		} else {
			res.send({ status: 'SESSION_NOT_FOUND', error: 'Session not found' })
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
			if (session && session.dataValues.id) {
				delete session.password
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
