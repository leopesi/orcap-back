/**
 * @module Postgres
 * Modulo para configurar e utilizar o Postgres
 */
require('dotenv').config()
const { DB_DATABASE, DB_USER, DB_PASS, DB_HOST, DB_PORT} = require('../config/database.js')
const { Sequelize } = require('sequelize')


// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
	DB_DATABASE,
	DB_USER,
	DB_PASS,
	{
		host: DB_HOST,
		dialect: 'postgres',
		port: DB_PORT,
		logging: false
	}
)

sequelize.authenticate()
.then(function(){
console.log(`DB conected on ${DB_HOST}, port: ${DB_PORT}. `);
}).catch(function(){
    console.log('Erro de conexão com o DB!');
})

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