/**
 * @module SellersController
 */
 const Server = require('../../helpers/server')
 const Permissions = require('./permissions')
 const Seller = require('../../models/sessions/seller')
 
 module.exports = {
	 /**
	  * @function
	  * Seta as rotas dos Usuários
	  */
	 setRoutes() {
		 Server.addRoute('/sellers/:id', this.get, this).get(true)
		 Server.addRoute('/sellers/', this.list, this).get(true)
		 Server.addRoute('/sellers', this.create, this).post(true)
		 Server.addRoute('/sellers/:id/restore', this.restore, this).put(true)
		 Server.addRoute('/sellers/:id', this.change, this).put(true)
		 Server.addRoute('/sellers/:id', this.delete, this).delete(true)
	 },
 
	 /**
	  * @function
	  * Retorna um Usuário
	  * @param {Object} req
	  * @param {Object} res
	  * @param {Object} self
	  */
	 async get(req, res, self) {
		 if (await Permissions.check(req.token, 'sellers', 'select')) {
			 const seller = await Seller.findOne({ where: { id: req.params.id } })
			 if (seller && seller.dataValues && seller.dataValues.id) {
				 res.send({ status: 'SELLER_GET_SUCCESS', data: seller })
			 } else {
				 res.send({ status: 'SELLER_NOT_FOUND', error: 'Seller not found' })
			 }
		 } else {
			 res.send({ status: 'SELLER_PERMISSION_ERROR', error: 'Action not allowed' })
		 }
	 },
 
	 /**
	  * @function
	  * Lista de Usuário
	  * @param {Object} req
	  * @param {Object} res
	  * @param {Object} self
	  */
	 async list(req, res, self) {
		 if (await Permissions.check(req.token, 'sellers', 'select')) {
			 const sellers = await Seller.findAll({ where: {} })
			 if (sellers && sellers.length > 0) {
				 res.send({ status: 'SELLER_LIST_SUCCESS', data: sellers })
			 } else {
				 res.send({ status: 'SELLERS_QUERY_EMPTY', error: 'Seller not found' })
			 }
		 } else {
			 res.send({ status: 'SELLER_PERMISSION_ERROR', error: 'Action not allowed' })
		 }
	 },
 
	 /**
	  * @function
	  * Cria um Usuário
	  * @param {Object} req
	  * @param {Object} res
	  * @param {Object} self
	  */
	 async create(req, res, self) {
		 if (await Permissions.check(req.token, 'sellers', 'insert')) {
			 delete req.body.id
			 req.body.password = await Server.getHash(req.body.password)
			 Seller.build(req.body)
				 .save()
				 .then((data) => {
					 res.send({ status: 'SELLER_INSERT_SUCCESS', data })
				 })
				 .catch((error) => {
					 res.send({ status: 'SELLER_INSERT_ERROR', error: error.parent.detail })
				 })
		 } else {
			 res.send({ status: 'SELLER_PERMISSION_ERROR', error: 'Action not allowed' })
		 }
	 },
 
	 /**
	  * @function
	  * Altera um Usuário
	  * @param {Object} req
	  * @param {Object} res
	  * @param {Object} self
	  */
	 async change(req, res, self) {
		 if (await Permissions.check(req.token, 'sellers', 'update')) {
			 const result = await Seller.findOne({ where: { id: req.params.id } })
			 if (result) {
				 req.body.id = result.dataValues.id
				 delete req.body.mail
				 delete req.body.password
				 result
					 .update(req.body)
					 .then((data) => {
						 res.send({ status: 'SELLER_UPDATE_SUCCESS', data })
					 })
					 .catch((error) => {
						 res.send({
							 status: 'SELLER_UPDATE_ERROR',
							 error: error.parent.detail,
						 })
					 })
			 } else {
				 res.send({
					 status: 'SELLER_NOT_FOUND',
					 error: req.params,
				 })
			 }
		 } else {
			 res.send({ status: 'SELLER_PERMISSION_ERROR', error: 'Action not allowed' })
		 }
	 },
 
	 /**
	  * @function
	  * Deleta um Usuário
	  * @param {Object} req
	  * @param {Object} res
	  * @param {Object} self
	  */
	 async delete(req, res, self) {
		 if (await Permissions.check(req.token, 'sellers', 'delete')) {
			 const result = await Seller.findOne({ where: { id: req.params.id } })
			 if (result) {
				 delete req.body.mail
				 delete req.body.password
				 req.body.active = false
				 result
					 .update(req.body)
					 .then((data) => {
						 res.send({ status: 'SELLER_DELETE_SUCCESS', data })
					 })
					 .catch((error) => {
						 res.send({
							 status: 'SELLER_DELETE_ERROR',
							 error: error.parent.detail,
						 })
					 })
			 } else {
				 res.send({
					 status: 'SELLER_NOT_FOUND',
					 error: req.params,
				 })
			 }
		 } else {
			 res.send({ status: 'SELLER_PERMISSION_ERROR', error: 'Action not allowed' })
		 }
	 },
 
	 /**
	  * @function
	  * Deleta um Usuário
	  * @param {Object} req
	  * @param {Object} res
	  * @param {Object} self
	  */
	 async restore(req, res, self) {
		 if (await Permissions.check(req.token, 'sellers', 'restore')) {
			 const result = await Seller.findOne({ where: { id: req.params.id } })
			 if (result) {
				 delete req.body.mail
				 delete req.body.password
				 req.body.active = true
				 result
					 .update(req.body)
					 .then((data) => {
						 res.send({ status: 'SELLER_RESTORE_SUCCESS', data })
					 })
					 .catch((error) => {
						 res.send({
							 status: 'SELLER_RESTORE_ERROR',
							 error: error.parent.detail,
						 })
					 })
			 } else {
				 res.send({
					 status: 'SELLER_NOT_FOUND',
					 error: req.params,
				 })
			 }
		 } else {
			 res.send({ status: 'SELLER_PERMISSION_ERROR', error: 'Action not allowed' })
		 }
	 },
 }
 