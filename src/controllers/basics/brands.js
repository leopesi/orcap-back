/**
 * @module BrandsController
 */
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const Brand = require('../../models/basics/brand')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/brands/:id', this.get, this).get(true)
		Server.addRoute('/brands/', this.list, this).get(true)
		Server.addRoute('/brands', this.create, this).post(true)
		Server.addRoute('/brands/:id/restore', this.restore, this).put(true)
		Server.addRoute('/brands/:id', this.change, this).put(true)
		Server.addRoute('/brands/:id', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		if (await Permissions.check(req.token, 'brands', 'select')) {
			const brand = await Brand.findOne({ where: { id: req.params.id } })
			if (brand && brand.dataValues && brand.dataValues.id) {
				res.send({ status: 'BRAND_GET_SUCCESS', data: brand })
			} else {
				res.send({ status: 'BRAND_NOT_FOUND', error: 'Brand not found' })
			}
		} else {
			res.send({ status: 'BRAND_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		if (await Permissions.check(req.token, 'brands', 'select')) {
			const brands = await Brand.findAll({ where: {} })
			if (brands && brands.length > 0) {
				res.send({ status: 'BRAND_LIST_SUCCESS', data: brands })
			} else {
				res.send({ status: 'BRANDS_QUERY_EMPTY', error: 'Brand not found' })
			}
		} else {
			res.send({ status: 'BRAND_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		delete req.body.id
		if (await Permissions.check(req.token, 'brands', 'insert')) {
			req.body.password = await Server.getHash(req.body.password)
			Brand.build(req.body)
				.save()
				.then(async (data) => {
					req.body.type = 'admin'
					req.body.table = 'brands'
					req.body.person = data.id
					Sessions.create(req, (result) => {
						if (result.status == 'SESSION_INSERT_SUCCESS') {
							res.send({ status: 'BRAND_INSERT_SUCCESS', data })
						} else {
							res.send({ status: 'BRAND_INSERT_ERROR', error: result.error })
						}
					})
				})
				.catch((error) => {
					res.send({ status: 'BRAND_INSERT_ERROR', error: error.parent.detail })
				})
		} else {
			res.send({ status: 'BRAND_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		if (await Permissions.check(req.token, 'brands', 'update')) {
			const result = await Brand.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.id = result.dataValues.id
				delete req.body.mail
				delete req.body.password
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'BRAND_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'BRAND_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'BRAND_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'BRAND_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		if (await Permissions.check(req.token, 'brands', 'delete')) {
			const result = await Brand.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = false
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'BRAND_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'BRAND_DELETE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'BRAND_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'BRAND_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		if (await Permissions.check(req.token, 'brands', 'restore')) {
			const result = await Brand.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = true
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'BRAND_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'BRAND_RESTORE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'BRAND_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'BRAND_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},
}
