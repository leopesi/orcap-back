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
		// console.log(dirs)
	} else if (modelName) {
		dirs[type] = [modelName]
	} else {
		return
	}
	// await sequelize.sync({ alter: true })
	try {
		const dir = fs.readdirSync('./database/')
	} catch (e) {
		fs.mkdirSync('./database/')
	}
	for (const i in dirs) {
		try {
			const files = dirs[i]
			for (const j in files) {
				const model = require('../src/models/' + i + '/' + files[j])
				await model.sync({ alter: true })
				const data = await model.findAll({})
				console.log('FIND ALL')
				try {
					const data_by_file = fs.readFileSync('./database/' + model.tableName + '.json', 'utf8')
					console.log(model.tableName + ' finish sync')

					const data_array = JSON.parse(data_by_file)
					const data_json = {}
					for (const item in data_array) {
						data_json[data_array[item].id] = data_array[item]
					}
					// ATUALIZA DADOS DOS ARQUIVOS COM DADOS DO BANCO
					const data_all = await model.findAll({})
					for (const item in data_all) {
						if (data_json[data_all[item].dataValues.id] && data_all[item].dataValues.id) {
							data_json[data_all[item].dataValues.id] = data_all[item].dataValues
						}
					}
					await model.sync({ force: true })
					for (const k in data_json) {
						const fields = []
						const values = []
						const sql = []
						sql.push('insert into ' + model.tableName + '(')
						for (const l in data_json[k]) {
							fields.push('"' + l + '"')
							if (data_json[k][l]) {
								if (data_json[k][l].toString().indexOf('GMT-') !== -1) {
									values.push("'" + data_json[k][l].toString().split('GMT-')[0] + "'")
								} else {
									values.push("'" + data_json[k][l] + "'")
								}
							} else {
								values.push('null')
							}
						}
						sql.push(fields.join(','))
						sql.push(') values (')
						sql.push(values.join(','))
						sql.push(');')
						// console.log(sql.join(' '))
						try {
							await pool.query(sql.join(' '), (error, results) => {
								if (error) console.log(error)
							})
						} catch (e) {
							console.log(e.stack)
						}
					}
					setTimeout(async () => {
						console.log('BUSCA REGISTRO PARA ATUALIZAR ' + model.tableName)
						const data_final = []
						const data_last_finded = await model.findAll({})
						for (const item in data_last_finded) {
							data_final.push(data_last_finded[item].dataValues)
						}
						const data_json_text = JSON.stringify(data_final, null, '\t')
						if (data_final && data_final.length > 0 && data_json_text && data_json_text.trim() != '' && data_json_text.trim() != []) {
							console.log('ESCREVENDO ARQUIVO FINAL ' + model.tableName)
							fs.writeFileSync('./database/' + model.tableName + '.json', data_json_text, 'utf8')
						}
					}, 100)
				} catch (e) {
					console.log('ERRO NO ARQUIVO ' + model.tableName)
					console.log(e.stack)
				}
			}
		} catch (e) {
			console.log('ERRO NO SEQUELIZE ' + i)
			console.log(e.stack)
		}
	}
}

exec_sequelize()
