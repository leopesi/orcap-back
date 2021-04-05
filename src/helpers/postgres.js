/**
 * @module Postgres
 * Modulo para configurar e utilizar o Postgres
 */

const { Pool } = require('pg')
const Config = require('../config/database')

module.exports = {

	start() {
		this.pool = new Pool(Config)
	},

	async getClients() {
		if (!this.pool) this.start()
		this.pool.query('SELECT * from usuarios', (error, results) => {
			if (error) {
				throw error
			}
			console.log(results.rows)
		})
	},
}
