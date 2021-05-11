/**
 * @module FiltersController
 */
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const CrudBasicsController = require('../defaults/crud-basics')
const Filter = require('../../models/equipments/filter')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/filters/:id', this.get, this).get(true)
		Server.addRoute('/filters/', this.list, this).get(true)
		Server.addRoute('/filters', this.create, this).post(true)
		Server.addRoute('/filters/:id/restore', this.restore, this).put(true)
		Server.addRoute('/filters/:id', this.change, this).put(true)
		Server.addRoute('/filters/:id', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		await CrudBasicsController.get(req, res, Filter)
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		await CrudBasicsController.list(req, res, Filter)
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		await CrudBasicsController.create(req, res, Filter)
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		await CrudBasicsController.change(req, res, Filter)
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		await CrudBasicsController.delete(req, res, Filter)
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await CrudBasicsController.restore(req, res, Filter)
	},

    getFiltersByDimension(dimension) {
        
        const filters = Filter.findAll()

        // for filtro in filtros:
        //     if dimensao.m3real() < filtro['capacidade maxima']:
        //         return filtro

        // return 'Nao existe filtro com a capacidade adequada cadastrado no sistema'
	},

    getCoverByDimension (dimension){
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
    
	getSandByDimension (dimension){
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
	}

}
