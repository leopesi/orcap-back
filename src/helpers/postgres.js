/**
 * @module Postgres
 * Modulo para configurar e utilizar o Postgres
 */

const { Pool } = require('pg')
const Config = require('../config/database')

module.exports = {

	/**
	 * @function
	 * Start o módulo Postgres
	 */
	start() {
		this.pool = new Pool(Config)
	},

	/**
	 * @function
	 * @param {String} query 
	 * SQL Query
	 * @param {Function} callback 
	 * Function que recebe o resultado
	 */
	query(query, callback) {
		if (!this.pool) this.start()
		this.pool.query(query, (error, results) => {
			if (error) {
				throw error
			}
			if (typeof callback === 'function') callback(results.rows)
		})
	},
}
