const Server = require('./helpers/server')
const Postgres = require('./helpers/postgres')

Server.start()

Postgres.query('SELECT * from users', (data) => {
	console.log(data)
})