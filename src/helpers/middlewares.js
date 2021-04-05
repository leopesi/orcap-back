/**
 * @module Middlewares
 */
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = {
    
	/**
	 * @function
	 * Confirma se o request contêm o token e se confere a autenticacao
	 * @param {Object} req
	 * Request do Express
	 * @param {Object} res
	 * Response do Express
	 * @param {Object} self
	 * Modulo do router que chamou a autenticacao
	 * @returns
	 * Se nao autenticado retorna erro 401
	 * Se autenticado retorna true
	 */
	async autenticacao(req, res, self) {
        try {
            let authHeader = undefined
            if (req.headers) {
                if (req.headers.authorization) {
                    authHeader = req.headers.authorization;
                } else if (req.headers.Authorization) {
                    authHeader = req.headers.Authorization
                }
            }
            
            if (!authHeader) {
                return res.status(401).send({ error: 'Token não informado' });
            }

            const aut = authHeader.split(' ');
            const token = aut.length === 2 ? aut[1] : aut[0];

            const { key } = self.config.token;
            try {
                const decoded = await promisify(jwt.verify)(token, key);

                req.tokenID = decoded.id;

                return true; //next();
            } catch (err) {

                return res.status(401).send({ error: 'Token inválido' });
            }
        } catch (e) {
            return res.status(401).send({ error: 'Middlewares Autenticação Error: ' + e.message });
        }
    },
}