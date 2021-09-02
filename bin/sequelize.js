const { Pool } = require('pg')
const sequelize = require('../src/helpers/postgres')
const Config = require('../src/config/database')

const pool = new Pool(Config)

exec_sequelize = async () => {
	dirs = require('../src/models/sequelize-config')['models']
	for (const i in dirs) {
		try {
			const files = dirs[i]
			for (const j in files) {
				const model = require('../src/models/' + i + '/' + files[j])
				await model.sync({ alter: true })
			}
		} catch (e) {}
	}
	sequelize.sync({ alter: true })
}

exec_sequelize()
