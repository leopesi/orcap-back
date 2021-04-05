const Server = require('../helpers/server')
const Sessions = require('../controllers/sessions')

module.exports = {
	start() {
		this.sessions()

		Server.addRoute(
			'/',
			(req, res, self) => {
				res.send({ status: 'online' })
			},
			this
		).get(false)
	},

	sessions() {
		Server.addRoute('/login', Sessions.login, Server).get(false)
	},
}
