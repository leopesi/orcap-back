const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

const Format = sequelize.define('formats', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	name: DataTypes.STRING(50),
	image: DataTypes.STRING(50),
	length: DataTypes.DECIMAL(10, 2), 
	width: DataTypes.DECIMAL(10, 2), 
	initial_depth: DataTypes.DECIMAL(10, 2), 
	final_depth: DataTypes.DECIMAL(10, 2), 
	sidewalk_width: DataTypes.DECIMAL(10, 2), 
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	}
})

module.exports = Format