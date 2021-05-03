const fs = require('fs')

exec_scheme = async () => {
	const text = []
	const dirs = require('../src/models/sequelize-config')['models']
	for (const i in dirs) {
		const files = dirs[i]
		for (const j in files) {
			const model = require('../src/models/' + i + '/' + files[j])
			text.push(' , , ')
			for (const k in model.tableAttributes) {
				const field = model.tableAttributes[k]
				text.push(files[j] + ',' + k + ',' + field.type.toString())
			}
		}
	}
	fs.writeFileSync('./bin/scheme.csv', text.join('\n'), 'utf8')
}

exec_scheme()
