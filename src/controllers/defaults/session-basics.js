/**
 * @module SessionBasicsController
 */
const Server = require('../../helpers/server')
const Session = require('../../models/sessions/session')
const Permissions = require('../sessions/permissions')
const Sessions = require('../sessions/sessions')

module.exports = {
	/**
	 * @function
	 * Retorna um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, model, options) {
		if (await Permissions.check(req.token, model.tableName, 'select')) {
			const where = Object.assign({ id: req.params.id }, options ? options.where : {})
			const md = await model.findOne({
				where,
				include: 'sessions',
			})
			if (md && md.id) {
				delete md.password
				res.send({ status: model.tableName.toUpperCase() + '_GET_SUCCESS', data: md })
			} else {
				res.send({
					status: model.tableName.toUpperCase() + '_NOT_FOUND',
					error: model.tableName + ' not found',
				})
			}
		} else {
			res.send({ status: model.tableName.toUpperCase() + '_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Lista de Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, model, options) {
		if (await Permissions.check(req.token, model.tableName, 'select')) {
			const md = await model.findAll({ where: options.where, include: 'sessions' })
			if (md && md.length > 0) {
				res.send({ status: model.tableName.toUpperCase() + '_LIST_SUCCESS', data: md })
			} else {
				res.send({ status: 'USERS_QUERY_EMPTY', error: model.tableName + ' not found' })
			}
		} else {
			res.send({ status: model.tableName.toUpperCase() + '_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Cria um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, model, options) {
		delete req.body.id
		const permission = await Permissions.check(req.token, model.tableName, 'insert')
		if (permission) {
			req.body.logist_id = await Sessions.getSessionIdByLogist(req.token)
			req.body.password = await Server.getHash(req.body.password)
			req.body.table = model.tableName
			Sessions.create(req, (result) => {
				if (result.status == 'SESSION_INSERT_SUCCESS') {
					req.body.session_id = result.data.id
					model
						.build(req.body)
						.save()
						.then(async (data) => {
							res.send({ status: model.tableName.toUpperCase() + '_INSERT_SUCCESS', data })
						})
						.catch(async (error) => {
							await Session.destroy({ where: { id: req.body.session_id } })
							res.send({
								status: model.tableName.toUpperCase() + '_INSERT_ERROR',
								error: error.parent ? error.parent.detail : error,
							})
							return
						})
				} else {
					res.send({ status: 'SESSION_INSERT_ERROR', error: result.error })
				}
			})
		} else {
			res.send({ status: model.tableName.toUpperCase() + '_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Altera um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, model, options) {
		if (await Permissions.check(req.token, model.tableName, 'update')) {
			const result = await model.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.id = result.dataValues.id
				delete req.body.mail
				delete req.body.password
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: model.tableName.toUpperCase() + '_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: model.tableName.toUpperCase() + '_UPDATE_ERROR',
							error: error.parent ? error.parent.detail : error,
						})
					})
			} else {
				res.send({
					status: model.tableName.toUpperCase() + '_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: model.tableName.toUpperCase() + '_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Deleta um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, model, options) {
		if (await Permissions.check(req.token, model.tableName, 'delete')) {
			const result = await model.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = false
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: model.tableName.toUpperCase() + '_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: model.tableName.toUpperCase() + '_DELETE_ERROR',
							error: error.parent ? error.parent.detail : error,
						})
					})
			} else {
				res.send({
					status: model.tableName.toUpperCase() + '_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: model.tableName.toUpperCase() + '_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Deleta um Usuário
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, model, options) {
		if (await Permissions.check(req.token, model.tableName, 'restore')) {
			const result = await model.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = true
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: model.tableName.toUpperCase() + '_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: model.tableName.toUpperCase() + '_RESTORE_ERROR',
							error: error.parent ? error.parent.detail : error,
						})
					})
			} else {
				res.send({
					status: model.tableName.toUpperCase() + '_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: model.tableName.toUpperCase() + '_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},
}
