const NodeMailer = require('nodemailer')
const Config = require('../config/mail')

module.exports = {
	async config(DataEmail) {
		DataEmail.from = Config.user
		DataEmail.to = 'senomar59@gmail.com'
		const Remetente = await NodeMailer.createTransport({
			host: Config.host,
			port: Config.port,
			secure: true,
			requireTLS: true,
			auth: {
				user: Config.user,
				pass: Config.pass,
			},
		})

		return { DataEmail, Remetente }
	},

	async sendMail(DataEmail, callback) {
		const configMail = await this.config(DataEmail)
		configMail.Remetente.sendMail(configMail.DataEmail, function (error) {
			if (error) {
				callback({ status: 'error', message: 'Nao enviou: ', error: error.stack })
			} else {
				callback({ status: 'success', message: 'Enviado!' })
			}
		})
	},
}