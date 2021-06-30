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
	} else if (modelName) {
		dirs[type] = [modelName]
	} else {
		return
	}
	for (const i in dirs) {
		try {
			const files = dirs[i]
			for (const j in files) {
				const model = require('../src/models/' + i + '/' + files[j])
				try {
					// ATUALIZA DADOS DOS ARQUIVOS COM DADOS DO BANCO
					await pool.query('select * from ' + model.tableName + '', async (error, results) => {
						const data_all = []
						for (const i in results.rows) {
							data_all.push(Object.assign({}, results.rows[i]))
						}
						await model.sync({ force: true })
						try {
							await pool.query('select * from ' + model.tableName + ' where false', async (error, results) => {
								const data_to_cols = []
								for (const res in results.fields) {
									data_to_cols.push(results.fields[res].name)
								}
								for (const i in data_all) {
									const data = data_all[i]
									const sql = []
									const fields = []
									const values = []
									sql.push('insert into ' + model.tableName + '(')
									for (const k in data_to_cols) {
										const col = data_to_cols[k]
										if (data[col] != null && data[col] != undefined) {
											fields.push('"' + col + '"')
											try {
												if (data[col].toString().indexOf('GMT-') !== -1) {
													values.push("'" + data_all[col].toString().split('GMT-')[0].trim() + "'")
												} else {
													values.push("'" + data[col] + "'")
												}
											} catch (e) {
												values.push('null')
											}
										}
									}
									sql.push(fields.join(','))
									sql.push(') values (')
									sql.push(values.join(','))
									sql.push(');')
									console.log(sql.join(' '))
									try {
										await pool.query(sql.join(' '), (error, results) => {
											if (error) console.log(error)
										})
									} catch (e) {
										console.log(e.stack)
									}
								}
							})
						} catch (e) {
							console.log(e.stack)
						}
					})
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
