
const NodeMailer = require('nodemailer')

module.exports = {

    init(type, options) {
        this.DataEmail = {}
        this.type = type
        this.options = options
    },

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // 
    //    CONFIGURAÇÃO DE ENVIO DE EMAIL
    // 
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    setUser(user) { this.user = user; },
    setPass(pass) { this.pass = pass; },
    setTo(to) { this.DataEmail.to = to },

    configGmail(options) {
        this.DataEmail.from = this.user
        this.Remetente = NodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,

            // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
            // Se travar os emails deve liberar o acesso em https://myaccount.google.com/lesssecureapps
            // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
            // Dados do Gmail criado apenas para essa funcionalidade
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        
            auth: {
                user: this.user,
                pass: this.pass
            }
        })
    },

    configHotmail(options) {

        this.Remetente = NodeMailer.createTransport({
            host: 'smtp.live.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: this.user,
                pass: this.pass
            }
        })
    },

    config() {
        if (this.type == 'gmail') this.configGmail(this.options)
        if (this.type == 'hotmail') this.configGmail(this.options)
    },

    sendMail(callback) {
        this.config()
        this.Remetente.sendMail(this.DataEmail, function (error) {
            if (error) {
                callback({ status: 'error', message: 'Nao enviou: ', error: error.stack })
            } else {
                callback({ status: 'success', message: 'Enviado!' })
            }
        })
    },
}