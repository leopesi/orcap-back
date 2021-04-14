const Server = require('../helpers/server')

const Sessions = require('../controllers/sessions')
const Permissions = require('../controllers/permissions')

const Users = require('../controllers/users')
const Logists = require('../controllers/logists')
const Sellers = require('../controllers/sellers')
const Clients = require('../controllers/clients')

module.exports = {
	
	start() {
		
		Sessions.setRoutes()
		Permissions.setRoutes()
		
		Users.setRoutes()
		Logists.setRoutes()
		Sellers.setRoutes()
		Clients.setRoutes()

		Server.addRoute(
			'/',
			(req, res, self) => {
				res.send({ status: 'online' })
			},
			this
		).get(false)

		Server.addRoute(
			'/error',
			(req, res, self) => {
				res.send({ status: 'error' })
			},
			this
		).get(false)
	},

}
