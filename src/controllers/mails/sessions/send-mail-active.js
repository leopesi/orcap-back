const Mail = require('../../../helpers/mail')

module.exports = {
	mail(data, callback) {
		const DataEmail = {}
		DataEmail.from = 'no-reply@easypool.com.br'
		DataEmail.subject = 'EasyPool - Ativar conta '
		DataEmail.html = `
            <div style="color: #333;">
			<h1>Ativar conta</h1>
            <p>Para ativar a conta do email ${data.mail} no EsayPool </p>
			<p>Para ativar a conta do email ${data.mail} no EsayPool </p>
        `
		Mail.sendMail(DataEmail, (result) => {
			callback(result)
		})
	},
}
