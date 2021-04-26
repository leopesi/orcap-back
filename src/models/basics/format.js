const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

module.exports = sequelize.define('formats', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	image: DataTypes.STRING(50),
	length: DataTypes.DECIMAL(10, 2), 
	width: DataTypes.DECIMAL(10, 2), 
	initial_depth: DataTypes.DECIMAL(10, 2), 
	final_depth: DataTypes.DECIMAL(10, 2), 
	average_depth: DataTypes.DECIMAL(10, 2), 
	sidewalk_width: DataTypes.DECIMAL(10, 2), 
	perimeter: DataTypes.DECIMAL(10, 2), 
	pool_area: DataTypes.DECIMAL(10, 2),
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	}
})
