const fs = require('fs')
const { Pool } = require('pg')
const Config = require('../src/config/database')

const pool = new Pool(Config)

const sequelize = require('../src/helpers/postgres')

exec_sequelize = async () => {
	const params = JSON.parse(process.env.npm_config_argv).original[2]

	const dirs = require('../src/models/sequelize-config')['models']
	console.log(dirs)
	for (const i in dirs) {
		const files = dirs[i]
		for (const j in files) {
			console.log('../src/models/' + i + '/' + files[j])
			const model = require('../src/models/' + i + '/' + files[j])
			if (params.indexOf('--force') !== -1) {
				await model.sync({ force: true })
			} else {
				await model.sync()
			}
		}
	}
	if (params) {
		if (params.indexOf('--force') !== -1) {
			await sequelize.sync({ force: true })
			exec_first_sql()
		} else {
			await sequelize.sync({ alter: true })
		}
	}
}

exec_first_sql = async () => {
	console.log('EXEC FIRST SQL')
	const sqls = fs
		.readFileSync('./sql/first_inserts.sql', 'utf-8', false)
		.split('\n')
	for (const i in sqls) {
		await pool.query(sqls[i], (error, results) => {
			if (error) {
				// throw error
				if (error.parent) {
					console.log(error.parent.detail)
				} else {
					console.log(error.toString().split('\n')[0])
				}
			}
		})
	}
}

exec_sequelize()
