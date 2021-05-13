const Server = require('../../helpers/server')

/**
 * @module DimensionsController
 */

module.exports = {

	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	 setRoutes() {
		Server.addRoute('/dimensions', this.getDimension, this).post(true)
	},
	/**
	 * @function
	 * Retorna uma Dimensão
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} model
	 */
	 async getDimension(req, res, self) {
			const { length, width, initial_depth, final_depth, sidewalk_width } = req.body
			const dimension = self.creatDimension(length, width, initial_depth, final_depth, sidewalk_width)
			dimension.average_depth = self.getDepthMedia(dimension)
			dimension.sidewalk_area = self.getSidewalkArea(dimension)
			dimension.perimeter = self.getPerimeter(dimension)
			dimension.m2_facial = self.getM2Facial(dimension)
			dimension.m2_wall = self.getM2Wall(dimension)
			dimension.m2_total = self.getM2Total(dimension)
			dimension.m3_total = self.getM3Total(dimension)
			dimension.m3_real = self.getM3Real(dimension)
			res.send({ dimension })
	},

	creatDimension(length, width, initial_depth, final_depth, sidewalk_width) {
		return Object.assign({}, {
			length,
			width,
			initial_depth,
			final_depth,
			sidewalk_width,
		})
	},
	getDepthMedia(dimension) {
		return (parseFloat(dimension.initial_depth) + parseFloat(dimension.final_depth)) / 2
	},
	getSidewalkArea(dimension) {
		return (parseFloat(this.getPerimeter(dimension)) * parseFloat(dimension.sidewalk_width)) + (parseFloat(dimension.sidewalk_width) * parseFloat(dimension.sidewalk_width) * 4)
	},
	getPerimeter(dimension) {
		return (parseFloat(dimension.length) + parseFloat(dimension.length)) + (parseFloat(dimension.width) + parseFloat(dimension.width))
	},
	getM2Facial(dimension) {
		return parseFloat(dimension.length) * parseFloat(dimension.width)
	},
	getM2Wall(dimension) {
		return parseFloat(this.getDepthMedia(dimension)) * parseFloat(this.getPerimeter(dimension))
	},
	getM2Total(dimension) {
		return parseFloat(this.getM2Facial(dimension)) + parseFloat(this.getM2Wall(dimension))
	},
	getM3Total(dimension) {
		return parseFloat(this.getDepthMedia(dimension)) * parseFloat(this.getM2Facial(dimension))
	},
	getM3Real(dimension) {
		return (parseFloat(this.getDepthMedia(dimension)) - 0.1) * parseFloat(this.getM2Facial(dimension))
	},
}
