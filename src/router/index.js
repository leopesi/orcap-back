const Server = require('../helpers/server')

const Sessions = require('../controllers/sessions/sessions')
const Permissions = require('../controllers/sessions/permissions')

const Users = require('../controllers/sessions/users')
const Logists = require('../controllers/sessions/logists')
const Sellers = require('../controllers/sessions/sellers')
const Clients = require('../controllers/sessions/clients')

const Brands = require('../controllers/basics/brands')
const Formats = require('../controllers/basics/formats')
const Models = require('../controllers/basics/models')
const Payments = require('../controllers/basics/payments')
const Providers = require('../controllers/basics/providers')
const Status = require('../controllers/basics/status')
const Types = require('../controllers/basics/types')

const Filters = require('../controllers/equipments/filters')

module.exports = {
	
	start() {
		
		Sessions.setRoutes()
		Permissions.setRoutes()
		
		Users.setRoutes()
		Logists.setRoutes()
		Sellers.setRoutes()
		Clients.setRoutes()

		Brands.setRoutes()
		Formats.setRoutes()
		Models.setRoutes()
		Payments.setRoutes()
		Providers.setRoutes()
		Status.setRoutes()
		Types.setRoutes()

		Filters.setRoutes()

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
