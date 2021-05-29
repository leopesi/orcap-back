const fs = require('fs')
const { Pool } = require('pg')
const sequelize = require('../src/helpers/postgres')
const Config = require('../src/config/database')

const pool = new Pool(Config)

exec_sequelize = async () => {
	const type = JSON.parse(process.env.npm_config_argv).original[2]
	const modelName = JSON.parse(process.env.npm_config_argv).original[3]
	if (!type) {
		console.log('\n***** Parâmetro não encontrado *****')
		console.log('\n- Para atualizar todos os models:')
		console.log('\nnpm run sequelize all')
		console.log('\n- Para atualizar apenas um model:')
		console.log('\nnpm run sequelize PASTA MODEL\n\n')
		return
	}
	let dirs = {}
	if (type == 'all') {
		dirs = require('../src/models/sequelize-config')['models']
		console.log(dirs)
	} else if (modelName) {
		dirs[type] = [modelName]
	} else {
		return
	}
	await sequelize.sync({ force: true })
	try {
		const dir = fs.readdirSync('./database/')
	} catch (e) {
		fs.mkdirSync('./database/')
	}
	for (const i in dirs) {
		const files = dirs[i]
		for (const j in files) {
			const model = require('../src/models/' + i + '/' + files[j])
			console.log(model.tableName)
			const data = await model.findAll({})
			console.log('FIND ALL')
			try {
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
					await pool.query(sql.join(' '), (error, results) => {
						console.log(error)
					})
				}
				const data_final = await model.findAll({})
				const data_json_text = JSON.stringify(data_final, null, '\t')
				if (data_final && data_final.length > 0 && data_json_text && data_json_text.trim() != '' && data_json_text.trim() != []) {
					fs.writeFileSync('./database/' + model.tableName + '.json', data_json_text, 'utf8')
				}
			} catch (e) {
				console.log('ERRO NO ARQUIVO ' + model.tableName)
			}
		}
	}
}

exec_sequelize()
