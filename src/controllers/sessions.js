const Server = require('../helpers/server')
const Postgres = require('../helpers/postgres')

module.exports = {
	login(req, res) {
		Postgres.query(
			"SELECT id, password from users where mail = '" + req.body.mail + "'",
			async (data) => {
				if (data && data[0]) {
					data = data[0]
					const pass = await Server.getHash(data.password.toString().trim())
					console.log(pass)
					if (req.body.password) {
						if (await Server.compareHash(data.password, req.body.password)) {
							const token = Server.createToken(data.id)
							res.send({ token })
						} else {
							res.send({ error: 'Incorrect password' })
						}
					} else {
						res.send({ error: 'Login data not found' })
					}
				}
			}
		)
	},
}
