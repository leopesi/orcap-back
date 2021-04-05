/**
 * @module Server
 * Módulo para criar e utilizar o express e suas dependências
 */

const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const middlewares = require('./middlewares')

const Config = require('../config')

module.exports = {
	/**
	 * @function
	 * Configura e inicia o servidor
	 */
	start() {
		console.log('Servidor online')

		this.server = express()
		this.http = http.Server(this.server)

		this.server.use(cors())
		this.server.use(express.json())

		this.server.use(bodyParser.urlencoded({ extended: true }))
		this.server.use(bodyParser.json())

		this.routes = express.Router()

		this.http.listen(Config.port)

		console.log('Porta: ' + Config.port)
	},

	/**
	 * @function
	 * Adiciona rotas para a API REST
	 * @param {String} route
	 * @param {Function} funcCallBack
	 * @param {Object} self
	 * @returns
	 * Objeto com os métodos para um web request: get, post, put, delete
	 */
	addRoute(route, funcCallBack, self) {
		return {
			/**
			 * @function
			 * Seta uma rota para o método GET
			 * @param {Boolean} auth
			 * Se auth = true será tratado pelo middleware de autenticacao
			 */
			get: (auth) => {
				this.server.get(route, async (req, res) => {
					req = this.fixGetRequest(req, 'get')
					if (auth) {
						const ret = await middlewares.autenticacao(req, res, this)
						if (ret === true) {
							funcCallBack(req, res, self)
						}
					} else {
						funcCallBack(req, res, self)
					}
				})
			},
			/**
			 * @function
			 * Seta uma rota para o método POST
			 * @param {Boolean} auth
			 * Se auth = true será tratado pelo middleware de autenticacao
			 */
			post: (auth) => {
				this.server.post(route, async (req, res) => {
					if (auth) {
						const ret = await middlewares.autenticacao(req, res, this)
						if (ret === true) {
							funcCallBack(req, res, self)
						}
					} else {
						funcCallBack(req, res, self)
					}
				})
			},
			/**
			 * @function
			 * Seta uma rota para o método POST
			 * @param {Boolean} auth
			 * Se auth = true será tratado pelo middleware de autenticacao
			 */
			put: (auth) => {
				this.server.put(route, async (req, res) => {
					if (auth) {
						const ret = await middlewares.autenticacao(req, res, this)
						if (ret === true) {
							funcCallBack(req, res, self)
						}
					} else {
						funcCallBack(req, res, self)
					}
				})
			},
			/**
			 * @function
			 * Seta uma rota para o método POST
			 * @param {Boolean} auth
			 * Se auth = true será tratado pelo middleware de autenticacao
			 */
			delete: (auth) => {
				this.server.delete(route, async (req, res) => {
					if (auth) {
						const ret = await middlewares.autenticacao(req, res, this)
						if (ret === true) {
							funcCallBack(req, res, self)
						}
					} else {
						funcCallBack(req, res, self)
					}
				})
			},
		}
	},

	/**
	 * @function
	 * @param {String} str
	 * String a ser encriptografada para Hash
	 * @returns
	 * String encriptografada
	 */
	async getHash(str) {
		try {
			if (str === undefined) return undefined
			return await bcrypt.hash(str.toString(), 8)
		} catch (e) {
			return undefined
		}
	},

	/**
	 * @function
	 * @param {String} hash
	 * Hash a ser comparado
	 * @param {String} str
	 * String a ser comparada
	 * @returns {Boolean}
	 * Se Hash = String encriptografada
	 */
	async compareHash(hash, str) {
		try {
			if (str === undefined) return false
			return await bcrypt.compare(str.toString(), hash)
		} catch (e) {
			return false
		}
	},

	/**
	 * @function
	 * Cria uma string criptografada que pode ser descriptografada
	 * @param {String} str 
	 * String a ser encriptografada 
	 * @returns 
	 * 
	 */
	createToken(str) {
		try {
			let expires = Config.token.expires
			return jwt.sign({ str }, Config.token.key, { expiresIn: expires })
		} catch (e) {
			return undefined
		}
	},

	/**
	 * @function
	 * Arruma o request do GET unindo o .body com o .query
	 * @param {Object} request 
	 * Request do Express
	 * @returns {Object}
	 * Request do Express arrumado
	 */
	fixGetRequest(request) {
		try {
			request.body = Object.assign(request.body, request.query)
			return request
		} catch (e) {
			return undefined
		}
	},

}
