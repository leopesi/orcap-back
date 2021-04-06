/**
 * @module SalesPeopleController
 */
const Server = require('../helpers/server')
const Postgres = require('../helpers/postgres')

module.exports = {

	setRoutes() {
		Server.addRoute('/salespeople/:id', this.get, this).get(true)
		Server.addRoute('/salespeople/', this.list, this).get(true)
		Server.addRoute('/salespeople', this.create, this).post(true)
		Server.addRoute('/salespeople/:id', this.change, this).put(true)
		Server.addRoute('/salespeople/:id', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Retorna um logista
	 * @param {Object} req 
	 * @param {Object} res 
	 * @param {Object} self
	 */
	get(req, res, self) {
		
	},

	/**
	 * @function
	 * Lista de lojistas
	 * @param {Object} req 
	 * @param {Object} res 
	 * @param {Object} self
	 */
	list(req, res, self) {

	},

	/**
	 * @function
	 * Cria um lojista
	 * @param {Object} req 
	 * @param {Object} res 
	 * @param {Object} self
	 */
	create(req, res, self) {
		
	},

	/**
	 * @function
	 * Altera um lojista
	 * @param {Object} req 
	 * @param {Object} res 
	 * @param {Object} self
	 */
	change(req, res, self) {

	},

	/**
	 * @function
	 * Deleta um lojista
	 * @param {Object} req 
	 * @param {Object} res 
	 * @param {Object} self
	 */
	 delete(req, res, self) {

	},

}
