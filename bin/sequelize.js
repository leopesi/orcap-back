const fs = require('fs')
const { Pool } = require('pg')
const Config = require('../src/config/database')

const pool = new Pool(Config)

exec_sequelize = async () => {
	const dirs = require('../src/models/sequelize-config')['models']
	for (const i in dirs) {
		const files = dirs[i]
		for (const j in files) {
			const model = require('../src/models/' + i + '/' + files[j])
			console.log(model.tableName)
			await model.sync({ force: false })
			const data = await model.findAll({})
			console.log('FIND ALL')
			const data_json_text = JSON.stringify(data, null, '\t')
			if (data && data.length > 0 && data_json_text && data_json_text.trim() != '' && data_json_text.trim() != []) {
				fs.writeFileSync('./database/' + model.tableName + '.json', data_json_text, 'utf8')
			}
			const data_by_file = fs.readFileSync('./database/' + model.tableName + '.json', null, 'utf8')
			await model.sync({ force: true })
			console.log(model.tableName + ' finish sync')
			const data_json = JSON.parse(data_by_file)
			for (const k in data_json) {
				const fields = []
				const values = []
				const sql = []
				sql.push('insert into ' + model.tableName + '(')
				for (const l in data_json[k]) {
					fields.push('"' + l + '"')
					if (data_json[k][l]) values.push("'" + data_json[k][l] + "'")
					else values.push('null')
				}
				sql.push(fields.join(','))
				sql.push(') values (')
				sql.push(values.join(','))
				sql.push(');')
				console.log(sql.join(' '))
				await pool.query(sql.join(' '), (error, results) => {})
			}
		}
	}
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
		} catch (e) {
			console.log('ERRO NO SQL')
		}
	}
}

exec_sequelize()
