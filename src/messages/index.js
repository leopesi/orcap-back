
module.exports = {

	locaale: 'pt-br',

	c(name) {
		return this.t('./controllers/messages-' + name.split('.')[0].toLowerCase() + '.js', name)
	},

	h(name) {
		return this.t('./helpers/messages-' + name.split('.')[0].toLowerCase() + '.js', name)
	},

	t(file, name) {
		const item = name.split('.').reverse()[0]
		const messages = require(file)
		return messages[this.locaale][item]
	}
}