/**
 * @module CrudBasicsController
 */
const isuuid = require('isuuid')
const Server = require('../../helpers/server')
const Sessions = require('../sessions/sessions')
const Permissions = require('../sessions/permissions')

module.exports = {
	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} model
	 */
	async get(req, res, model, include, check_permission) {
		if (check_permission === false || (await Permissions.check(req.token, model.tableName, 'select'))) {
			if (req.params.id) {
				const logist_id = await Sessions.getSessionId(req)
				const md = await model.findOne({ where: { id: req.params.id, logist_id }, include })
				if (md && md.dataValues && md.dataValues.id) {
					res.send({ status: model.tableName.toUpperCase() + '_GET_SUCCESS', data: md })
				} else {
					res.send({ status: model.tableName.toUpperCase() + '_NOT_FOUND', error: model.tableName + ' not found' })
				}
			} else {
				res.send({ status: model.tableName.toUpperCase() + '_NOT_FOUND', error: model.tableName + ' not found' })
			}
		} else {
			res.send({ status: model.tableName.toUpperCase() + '_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} model
	 */
	async list(req, res, model, include, check_permission) {
		if (check_permission === false || (await Permissions.check(req.token, model.tableName, 'select'))) {
			const logist_id = await Sessions.getSessionId(req)
			const md = await model.findAll({ where: { logist_id }, include })
			if (md && md.length > 0) {
				res.send({ status: model.tableName.toUpperCase() + '_LIST_SUCCESS', data: md })
			} else {
				res.send({ status: model.tableName.toUpperCase() + '_QUERY_EMPTY', error: model.tableName + ' not found' })
			}
		} else {
			res.send({ status: model.tableName.toUpperCase() + '_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} model
	 */
	async create(req, res, model) {
		if (await Permissions.check(req.token, model.tableName, 'insert')) {
			delete req.body.id
			req.body.logist_id = await Sessions.getSessionId(req)
			if (!isuuid(req.body.logist_id)) {
				res.send({ status: 'LOGIST_IS_EMPTY' })
			} else {
				model
					.build(req.body)
					.save()
					.then(async (data) => {
						res.send({ status: model.tableName.toUpperCase() + '_INSERT_SUCCESS', data })
					})
					.catch((error) => {
						res.send({ status: model.tableName.toUpperCase() + '_INSERT_ERROR', error: error.parent ? error.parent.detail : JSON.stringify(error) })
					})
			}
		} else {
			res.send({ status: model.tableName.toUpperCase() + '_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} model
	 */
	async change(req, res, model) {
		if (await Permissions.check(req.token, model.tableName, 'update')) {
			const md = await model.findOne({ where: { id: req.params.id } })
			if (md) {
				req.body.id = md.dataValues.id
				req.body.logist_id = await Sessions.getSessionId(req)
				if (!isuuid(req.body.logist_id)) {
					res.send({ status: 'LOGIST_IS_EMPTY' })
				} else {
					md.update(req.body)
						.then((data) => {
							res.send({ status: model.tableName.toUpperCase() + '_UPDATE_SUCCESS', data })
						})
						.catch((error) => {
							res.send({
								status: model.tableName.toUpperCase() + '_UPDATE_ERROR',
								error: error.parent ? error.parent.detail : error,
							})
						})
				}
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
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} model
	 */
	async delete(req, res, model) {
		if (await Permissions.check(req.token, model.tableName, 'delete')) {
			const md = await model.findOne({ where: { id: req.params.id } })
			if (md) {
				req.body.active = false
				req.body.logist_id = await Sessions.getSessionId(req)
				md.update(req.body)
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
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} model
	 */
	async restore(req, res, model) {
		if (await Permissions.check(req.token, model.tableName, 'restore')) {
			const md = await model.findOne({ where: { id: req.params.id } })
			if (md) {
				req.body.active = true
				req.body.logist_id = await Sessions.getSessionId(req)
				md.update(req.body)
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
