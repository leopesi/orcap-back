const sequelize = require('../src/helpers/postgres')

const User = require('../src/models/user')
User.sync()
sequelize.sync({ alter: true })
