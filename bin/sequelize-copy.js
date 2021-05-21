const fs = require('fs')
const { Pool } = require('pg')
const Config = require('../src/config/database')

const pool = new Pool(Config)

const sequelize = require('../src/helpers/postgres')

exec_sequelize = async () => {
	const params = JSON.parse(process.env.npm_config_argv).original[2]

	await controllers_sequelize()
	await models_sequelize(params)
	if (params) {
		if (params.indexOf('--force') !== -1) {
			await sequelize.sync({ force: true })
		} else {
			await sequelize.sync({ alter: true })
		}
	}
	await exec_first_sql() 
}

controllers_sequelize = async () => {
	const dirs = fs.readdirSync('./src/controllers')
	for (const i in dirs) {
		const subdirs = fs.readdirSync('./src/controllers/' + dirs[i])
		for (const j in subdirs) {
			const files = subdirs[j]
			console.log(files)
			if (subdirs[j].indexOf('.js') !== -1) {
				const controller = require('../src/controllers/' + dirs[i] + '/' + subdirs[j])
				if (typeof controller.setForeignKey === 'function') {
					await controller.setForeignKey()
				}
			}
		}
	}
}

models_sequelize = async (params) => {
	const dirs = require('../src/models/sequelize-config')['models']
	for (const i in dirs) {
		const files = dirs[i]
		for (const j in files) {
			console.log('../src/models/' + i + '/' + files[j])
			const model = require('../src/models/' + i + '/' + files[j])
			if (params && params.indexOf('--force') !== -1) {
				await model.sync({ force: true })
			} else {
				await model.sync()
			}
		}
	}
}

exec_first_sql = async () => {
	console.log('EXEC FIRST SQL')
	const sqls = fs.readFileSync('./sql/first_inserts.sql', 'utf-8', false).split('\n')
	for (const i in sqls) {
		console.log(sqls[i])
		try {
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
		} catch(e) {
			console.log('ERRO NO SQL')
		}
	}
}

exec_sequelize()
