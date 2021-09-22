const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

const Provider = sequelize.define('providers', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  logist_id: {
    type: DataTypes.UUID,
    references: {
      model: 'logists',
      key: 'id',
    },
  },
  name: DataTypes.STRING(50),

  document: DataTypes.STRING(50),
  city: DataTypes.STRING(50),
  neighborhood: DataTypes.STRING(50),
  street: DataTypes.STRING(50),
  number: DataTypes.STRING(50),
  zipcode: DataTypes.STRING(50),
  phone: DataTypes.STRING(50),
  mail: DataTypes.STRING(50),
  website: DataTypes.STRING(50),
  
	active: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
})

module.exports = Provider
