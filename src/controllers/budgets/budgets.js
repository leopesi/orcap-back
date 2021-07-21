/**
 * @module BudgetsController
 */
const isuuid = require('isuuid')
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const Sessions = require('../sessions/sessions')
const Clients = require('../sessions/clients')
const CrudBasicsController = require('../defaults/crud-basics')
const Budget = require('../../models/budgets/budget')
const BudgetEquipment = require('../../models/budgets/budget_equipment')
const Logist = require('../../models/sessions/logist')
const Seller = require('../../models/sessions/Seller')
const Client = require('../../models/sessions/Client')
const Session = require('../../models/sessions/session')
const Format = require('../../models/basics/format')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/budgets/:id', this.get, this).get(true)
		Server.addRoute('/budgets/', this.list, this).get(true)
		Server.addRoute('/budgets', this.create, this).post(true)
		Server.addRoute('/budgets/:id/restore', this.restore, this).put(true)
		Server.addRoute('/budgets/:id', this.change, this).put(true)
		Server.addRoute('/budgets/:id', this.delete, this).delete(true)

		this.setForeignKey()
	},

	/**
	 * @function
	 * Seta as as chaves dos models
	 */
	async setForeignKey() {
		Budget.belongsTo(Logist, { foreignKey: 'logist_id', as: 'logists' })
		Budget.belongsTo(Seller, { foreignKey: 'seller_id', as: 'sellers' })
		Budget.belongsTo(Client, { foreignKey: 'client_id', as: 'clients' })
		Client.belongsTo(Session, { foreignKey: 'session_id', as: 'sessions' })
		Budget.belongsTo(Format, { foreignKey: 'format_id', as: 'formats' })
		Budget.hasMany(BudgetEquipment, { foreignKey: 'budget_id', as: 'equipments' })
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		if (await Permissions.check(req.token, Budget.tableName, 'select')) {
			if (req.params.id) {
				const md = await Budget.findOne({
					where: { id: req.params.id },
					include: ['sellers'],
				})
				const equipments = await BudgetEquipment.findAll({
					where: { budget_id: req.params.id },
					order: [['index', 'ASC']],
				})
				md.dataValues.equipments = equipments
				if (md && md.dataValues && md.dataValues.id) {
					const clients = await Client.findOne({
						where: { id: md.dataValues.client_id },
						include: 'sessions',
					})
					md.dataValues.clients = clients
					res.send({ status: Budget.tableName.toUpperCase() + '_GET_SUCCESS', data: md })
				} else {
					res.send({ status: Budget.tableName.toUpperCase() + '_NOT_FOUND', error: Budget.tableName + ' not found' })
				}
			} else {
				res.send({ status: Budget.tableName.toUpperCase() + '_NOT_FOUND', error: Budget.tableName + ' not found' })
			}
		} else {
			res.send({ status: Budget.tableName.toUpperCase() + '_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		const include = ['clients', 'sellers']
		await CrudBasicsController.list(req, res, Budget, include)
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		delete req.body.id
		req.body.logist_id = await Sessions.getSessionId(req)
		if (await Permissions.check(req.token, 'budgets', 'insert')) {
			await Clients.saveByBudget(req, res, Clients, (result) => {
				if (result.id) req.body.client_id = result.id
				if (req.body.logist_id && isuuid(req.body.logist_id)) {
					Budget.build(req.body)
						.save()
						.then(async (data) => {
							res.send({ status: 'BUDGETS__INSERT_SUCCESS', data })
						})
						.catch((error) => {
							res.send({ status: 'BUDGETS__INSERT_ERROR', error: error.parent ? error.parent.detail : JSON.stringify(error) })
						})
				} else {
					res.send({ status: 'LOGIST_ID_INSERT_ERROR' })
				}
			})
		} else {
			res.send({ status: 'BUDGETS__PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		if (await Permissions.check(req.token, 'budgets', 'update')) {
			const budgets = await Budget.findOne({ where: { id: req.params.id } })
			if (budgets) {
				req.body.id = budgets.dataValues.id
				req.body.expiration_date = new Date(req.body.expiration_date)
				await Clients.saveByBudget(req, res, Clients, (result) => {
					if (result && !result.error) {
						if (result.id) {
							req.body.client_id = result.id
						}
						budgets
							.update(req.body)
							.then(async (data) => {
								await self.deleteEquipments(req.body.id, req.body.equipments)
								for (const i in req.body.equipments) {
									await self.saveEquipment(req.body.id, req.body.equipments[i])
								}
								res.send({ status: 'BUDGETS_UPDATE_SUCCESS', data })
							})
							.catch((error) => {
								console.log(error)
								res.send({
									status: 'BUDGETS_UPDATE_ERROR',
									error: error.parent ? error.parent.detail : error,
								})
							})
					} else if (result) {
						res.send({
							status: 'CLIENTS_SAVE_ERROR',
							error: result.error,
						})
					} else {
						res.send({
							status: 'CLIENTS_BUDGET_SAVE_ERROR',
							error: '',
						})
					}
				})
			} else {
				res.send({
					status: 'BUDGETS_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'BUDGETS_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		await CrudBasicsController.delete(req, res, Budget)
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await CrudBasicsController.restore(req, res, Budget)
	},

	async saveEquipment(budget_id, equipment) {
		if (equipment.equipment_id || equipment.text) {
			if (equipment.id) {
				const equip = await BudgetEquipment.findOne({
					where: { id: equipment.id },
				})
				if (equip) {
					equip
						.update(equipment)
						.then(async (result) => {
							return result
						})
						.catch((error) => {
							console.log(error)
						})
				}
			} else {
				delete equipment.id
				equipment.budget_id = budget_id
				BudgetEquipment.build(equipment)
					.save()
					.then(async (result) => {
						return result
					})
					.catch((error) => {
						console.log(error)
					})
			}
		}
	},

	async deleteEquipments(budget_id, equipments) {
		const equips = await BudgetEquipment.findAll({
			where: { budget_id },
			order: [['index', 'ASC']],
		})
		for (const i in equips) {
			let finded = false
			for (const j in equipments) {
				if (equips[i].dataValues.id == equipments[j].id) {
					finded = true
				}
			}
			if (!finded) {
				await BudgetEquipment.destroy({ where: { id: equips[i].dataValues.id } })
			}
		}
	},
}
