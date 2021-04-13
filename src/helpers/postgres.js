/**
 * @module Postgres
 * Modulo para configurar e utilizar o Postgres
 */

const DBConfig = require('../config/database')
const { Sequelize } = require('sequelize')

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
	DBConfig.database,
	DBConfig.user,
	DBConfig.password,
	{
		host: DBConfig.host,
		dialect: 'postgres',
		port: DBConfig.port,
	}
)

sequelize.sync({ alter: true })
module.exports = sequelize

// const { Pool } = require('pg')
// const Config = require('../config/database')

// module.exports = {
// 	/**
// 	 * @function
// 	 * Start o módulo Postgres
// 	 */
// 	start() {
// 		this.pool = new Pool(Config)
// 	},

// 	/**
// 	 * @function
// 	 * @param {String} query
// 	 * SQL Query
// 	 * @param {Function} callback
// 	 * Function que recebe o resultado
// 	 */
// 	query(query, callback) {
// 		if (!this.pool) this.start()
// 		this.pool.query(query, (error, results) => {
// 			if (error) {
// 				// throw error
// 				callback({ error })
// 			} else if (typeof callback === 'function') {
// 				if (results.rows) callback(results.rows)
// 				else callback(results)
// 			}
// 		})
// 	},
// }
