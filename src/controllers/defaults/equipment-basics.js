/**
 * @module CrudBasicsController
 */
const Server = require('../../helpers/server')
const Equipments = require('../../controllers/equipments/equipments')
const Equipment = require('../../models/equipments/equipment')
const Permissions = require('../sessions/permissions')

module.exports = {
	/**
	 * @function
	 * Retorna um Registro com resposta direta
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} model
	 */
	async get(req, res, model) {
		if (await Permissions.check(req.token, model.tableName, 'select')) {
			if (req.params.id) {
				const logist_id = Server.decodedIdByToken(req.token)
				const md = await model.findOne({
					where: { id: req.params.id },
					include: [
						{
							model: Equipment,
							as: 'equipments',
							where: { logist_id },
						},
					],
				})
				if (md && md.dataValues && md.dataValues.id) {
					await Equipments.updateSingleRelations(md.dataValues)
					res.send({ status: model.tableName.toUpperCase() + '_GET_SUCCESS', data: md })
				} else {
					res.send({
						status: model.tableName.toUpperCase() + '_NOT_FOUND',
						error: model.tableName + ' not found',
					})
				}
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
	 * Lista dos registros com resposta direta
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} model
	 */
	async list(req, res, model) {
		if (await Permissions.check(req.token, model.tableName, 'select')) {
			const logist_id = Server.decodedIdByToken(req.token)
			const md = await model.findAll({
				where: {},
				include: [
					{
						model: Equipment,
						as: 'equipments',
						where: { logist_id },
					},
				],
			})
			if (md && md.length > 0) {
				await Equipments.updateAllRelations(md)
				res.send({ status: model.tableName.toUpperCase() + '_LIST_SUCCESS', data: md })
			} else {
				res.send({
					status: model.tableName.toUpperCase() + '_QUERY_EMPTY',
					error: model.tableName + ' not found',
				})
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
			req.body.logist_id = Server.decodedIdByToken(req.token)
			Equipment.build(req.body)
				.save()
				.then(async (result) => {
					model
						.build(req.body)
						.save()
						.then(async (data) => {
							res.send({ status: model.tableName.toUpperCase() + '_INSERT_SUCCESS', data })
						})
						.catch((error) => {
							res.send({
								status: model.tableName.toUpperCase() + '_INSERT_ERROR',
								error: error.parent ? error.parent.detail : error,
							})
						})
				})
				.catch((error) => {
					res.send({
						status: 'EQUIPMENT_INSERT_ERROR',
						error: error.parent ? error.parent.detail : error,
					})
				})
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
			const logist_id = Server.decodedIdByToken(req.token)
			const md = await model.findOne({
				where: { id: req.params.id },
				include: [
					{
						model: Equipment,
						as: 'equipments',
						where: { logist_id: id },
					},
				],
			})
			if (md) {
				req.body.id = md.dataValues.id
				const EquipmentData = {
					id: md.dataValues.equipment_id,
					name: req.body.name,
					brand_id: req.body.brand_id,
					provider_id: req.body.provider_id,
				}
				const EquipmentModel = await Equipment.findOne({ where: { id: md.dataValues.equipment_id } })
				EquipmentModel.update(EquipmentData)
					.then((result) => {
						md.update(req.body)
							.then((data) => {
								res.send({ status: model.tableName.toUpperCase() + '_UPDATE_SUCCESS', data })
							})
							.catch((error) => {
								res.send({
									status: model.tableName.toUpperCase() + '_UPDATE_ERROR',
									error: error,
								})
							})
					})
					.catch((error) => {
						res.send({
							status: 'EQUIPMENT_UPDATE_ERROR',
							error: error,
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
				md.update(req.body)
					.then((data) => {
						res.send({ status: model.tableName.toUpperCase() + '_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: model.tableName.toUpperCase() + '_DELETE_ERROR',
							error: error.parent.detail,
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
				md.update(req.body)
					.then((data) => {
						res.send({ status: model.tableName.toUpperCase() + '_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: model.tableName.toUpperCase() + '_RESTORE_ERROR',
							error: error.parent.detail,
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
