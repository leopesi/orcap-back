/**
 * @module EnginesController
 */
const sequelize = require('sequelize')
const Op = sequelize.Op
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const CrudBasicsController = require('../defaults/crud-basics')
const Dimensions = require('../defaults/dimensions')

const Engine = require('../../models/equipments/engine')
const Equipment = require('../../models/equipments/equipment')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/engines-by-dimension', this.enginesByDimension, this).post(true)
		Server.addRoute('/engines/:id', this.get, this).get(true)
		Server.addRoute('/engines/', this.list, this).get(true)
		Server.addRoute('/engines', this.create, this).post(true)
		Server.addRoute('/engines/:id/restore', this.restore, this).put(true)
		Server.addRoute('/engines/:id', this.change, this).put(true)
		Server.addRoute('/engines/:id', this.delete, this).delete(true)
		this.setForeignKey()
	},

	/**
	 * @function
	 * Seta as as chaves dos models
	 */
	async setForeignKey() {
		Engine.belongsTo(Equipment, { foreignKey: 'equipment_id', as: 'equipments' })
	},

	async enginesByDimension(req, res, self) {
		if (await Permissions.check(req.token, 'engines', 'select')) {
			const dimension = Dimensions.creatDimension(req.body.length, req.body.width, req.body.initial_depth, req.body.final_depth, req.body.sidewalk_width)
			const max_capacity = Dimensions.getM3Real(dimension)
			const md = await Engine.findAll({
				where: { max_capacity: { [Op.gte]: !isNaN(max_capacity) ? max_capacity : 0 } },
				include: 'equipments'
			})
			if (md && md[0]) {
				res.send({ status: 'ENGINES_GET_SUCCESS', data: md })
			} else {
				res.send({ status: 'ENGINES_NOT_FOUND', error: 'engines not found' })
			}
		} else {
			res.send({ status: 'ENGINES_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		await CrudBasicsController.get(req, res, Engine)
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		await CrudBasicsController.list(req, res, Engine)
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		await CrudBasicsController.create(req, res, Engine)
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		await CrudBasicsController.change(req, res, Engine)
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		await CrudBasicsController.delete(req, res, Engine)
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await CrudBasicsController.restore(req, res, Engine)
	},

	getEnginesByDimension(dimension) {
		const engines = Engine.findAll()

		// for filtro in filtros:
		//     if dimensao.m3real() < filtro['capacidade maxima']:
		//         return filtro

		// return 'Nao existe filtro com a capacidade adequada cadastrado no sistema'
	},

	getCoverByDimension(dimension) {
		// dimensao = self.dimensao
		// tampa_casa_maquinas = self.config['tampa_casa_maquinas'].lista()
		// filtro = self.dimensionamento_filtro_grupo()
		// for chave in tampa_casa_maquinas:
		//     if filtro['id'] <= 5:
		//         if chave['id'] == 1:
		//             return chave
		//     elif filtro['id'] >= 6:
		//         if chave['id'] == 2:
		//             return chave
		//     else:
		//         return 'Não foi encontrado uma tampa de casa de máquinas adequada para este filtro'
	},

	getSandByDimension(dimension) {
		// dimensao = self.dimensao
		// dimensionamento_filtro = self.dimensionamento_filtro_grupo()
		// if dimensionamento_filtro['id'] <= 2:
		//     return 1 #Incluir o atributo "areia" no filtro
		// elif dimensionamento_filtro['id'] == 3:
		//     return 2
		// elif dimensionamento_filtro['id'] == 4:
		//     return 3
		// elif dimensionamento_filtro['id'] == 5:
		//     return 5
		// elif dimensionamento_filtro['id'] == 6:
		//     return 8
		// elif dimensionamento_filtro['id'] == 7:
		//     return 12
		// elif dimensionamento_filtro['id'] == 8:
		//     return 21
		// else:
		//     return 'Error'
	},
}
