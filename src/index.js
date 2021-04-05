const Server = require('./helpers/server')
const Postgres = require('./helpers/postgres')

Server.start()
Postgres.getClients()