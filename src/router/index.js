const Server = require('../helpers/server')
const Sessions = require('../controllers/sessions')
const Users = require('../controllers/users')
const ShopKeepers = require('../controllers/shopkeepers')
const SalesPeople = require('../controllers/salespeople')
const Clients = require('../controllers/clients')

module.exports = {
	
	start() {
		
		Sessions.setRoutes()
		Users.setRoutes()
		ShopKeepers.setRoutes()
		SalesPeople.setRoutes()
		Clients.setRoutes()

		Server.addRoute(
			'/',
			(req, res, self) => {
				res.send({ status: 'online' })
			},
			this
		).get(false)
	},

}
