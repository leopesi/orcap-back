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

const StatusBudgets = require('../controllers/basics/status_budgets')
const TypesBudgets = require('../controllers/basics/types_budgets')
const Budgets = require('../controllers/budgets/budgets')

const Dimensions = require('../controllers/defaults/dimensions')

const Equipments = require('../controllers/equipments/equipments')
const Filters = require('../controllers/equipments/filters')
const Engines = require('../controllers/equipments/engines')
const Blankets = require('../controllers/equipments/blankets')
const Lids = require('../controllers/equipments/lids')
const Profiles = require('../controllers/equipments/profiles')
const Vinyls = require('../controllers/equipments/vinyls')

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

		StatusBudgets.setRoutes()
		TypesBudgets.setRoutes()
		Budgets.setRoutes()

		Equipments.setRoutes()
		Filters.setRoutes()
		Engines.setRoutes()
		Blankets.setRoutes()
		Lids.setRoutes()
		Profiles.setRoutes()
		Vinyls.setRoutes()

		Dimensions.setRoutes()

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
