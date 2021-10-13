const { WAConnection } = require('@adiwajshing/baileys');
const fs = require('fs');
const cfonts = require('cfonts');

const auth = './lib/session/session.json'

const banner = cfonts.render(('ThisIsInky'), {
font: 'block',
color: 'candy',
align: 'center',
gradient: ["red","white"],
lineHeight: 3
});

const inky = new WAConnection()
exports.inky = inky

exports.connect = async() => {
inky.logger.level = 'warn'
console.log(banner.string)

inky.on('qr', () => {
console.log('Escanee el Qr Code')
})

fs.existsSync(auth) && inky.loadAuthInfo(auth)
inky.on('connecting', () => {
console.log('Conectando')
})

inky.on('open', () => {
console.log('Conectado exitosamente')
const authInfo = inky.base64EncodedAuthInfo()
fs.writeFileSync(auth, JSON.stringify(authInfo, null, '\t'))
})

await inky.connect({timeoutMs: 30 * 1000})
return
}
