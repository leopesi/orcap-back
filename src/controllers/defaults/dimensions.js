/**
 * @module DimensionsController
 */

module.exports = {
	getDepthMedia(initialDepth, finalDepth) {
		return (initialDepth + finalDepth) / 2
	},
	getSidewalkArea(sideWalkWidth) {
		return this.getPerimeter() * sideWalkWidth + sideWalkWidth * sideWalkWidth * 4
	},
	getPerimeter(length, width) {
		return length + length + (width + width)
	},
	getM2Facial(length, width) {
		return length * width
	},
	getM2Wall() {
		return self.getDepthMedia() * self.getPerimeter()
	},
	getM2Total() {
		return self.getM2Facial() + self.getM2Wall()
	},
	getM3Total() {
		return self.getDepthMedia() * self.getM2Facial()
	},
	getM3Real() {
		return (self.getDepthMedia() - 0.1) * self.getM2Facial()
	},
}
