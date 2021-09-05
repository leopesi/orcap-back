/**
 * @module Middlewares
 */

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
                    authHeader = req.headers.authorization
                } else if (req.headers.Authorization) {
                    authHeader = req.headers.Authorization
                }
            }
            if (!authHeader) {
                return res.status(401).send({ error: 'TOKEN_NOT_FOUND' })
            }

            const aut = authHeader.split(' ')
            const token = aut.length === 2 ? aut[1] : ''
            try {
                req.token = token
                req.logistToken = req.headers.logisttoken
                return true
            } catch (err) {

                return res.status(401).send({ error: 'INVALID_TOKEN' })
            }
        } catch (e) {
            return res.status(401).send({ error: 'AUTH_CATCH_ERROR' + e.message })
        }
    },
}