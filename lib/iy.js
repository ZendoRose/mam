const { MessageType, Mimetype } = require("@adiwajshing/baileys");
const fs = require('fs');

const connect = require('./connect');
const config = JSON.parse(fs.readFileSync("./lib/config.json"));

const botName = config.botName
const inky = connect.inky

exports.sendFakeStatus = async(from, text, mentioned = []) => {
var options = {
contextInfo: {
participant: '0@s.whatsapp.net',
remoteJid: 'status@broadcast',
quotedMessage: {
imageMessage: {
caption: `👾${botName} | 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲👾`,
jpegThumbnail: fs.readFileSync('./media/image/reply.jpg')
}
},
mentionedJid: mentioned
}
}
await inky.sendMessage(from, text, MessageType.text, options, {sendEphemeral: true})
}

exports.sendContact = async(from, numero, nombre, fakeStatus) => {
const vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + nombre + '\n' + `ORG:Creador de ${botName}\n` + 'TEL;type=CELL;type=VOICE;waid=' + numero + ':+' + numero + '\n' + 'END:VCARD'
await inky.sendMessage(from, { displayname: nombre, vcard: vcard }, MessageType.contact, {quoted: fakeStatus, sendEphemeral: true})
}

exports.sendMess = (from, teks) => {
inky.sendMessage(from, teks, MessageType.text)
}
