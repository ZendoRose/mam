/*
Si vas a editar el bot no sacar los creditos del creador
by ThisIsInky
*/
const {
WAConnection,
MessageType,
Mimetype,
Presence,
GroupSettingChange
} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');
const { exec } = require('child_process');
const ffmpeg = require('fluent-ffmpeg');
const fetch = require('node-fetch');
const hx = require("hxz-api");
const ig = require("insta-fetcher");
const request = require("request");
const speed = require('performance-now');
const yts = require('yt-search');

const _limit = JSON.parse(fs.readFileSync('./database/limit.json'));
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
const ban = JSON.parse(fs.readFileSync('./database/banned.json'));
const stickerjson = JSON.parse(fs.readFileSync('./database/sticker.json'));
const user = JSON.parse(fs.readFileSync('./database/user.json'));
const welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));

const conn = require('./lib/connect');
const connect = require('./lib/connect');
const config = JSON.parse(fs.readFileSync("./lib/config.json"));
const {
addMetadata,
convertSticker,
getBuffer,
getGroupAdmins,
getJson,
getRandom,
y2mate
} = require('./lib/functions');
const {
addATM,
addKoinUser,
checkATMuser,
bayarLimit,
confirmATM,
limitAdd
} = require('./lib/limitatm.js');
const iy = require('./lib/iy');

const author = config.author
const botName = config.botName
const botGroup = config.botGroup
const groupSupport = 'https://chat.whatsapp.com/D7bbL8EeBXA2Nf0zvtvE7R'
const limitawal = config.limitawal
const mods = config.mods
const owner = config.owner
const pack = config.pack
const prefix = config.prefix
var public = config.public

conn.connect()
const inky = conn.inky

const sleep = async (ms) => {
return new Promise(resolve => setTimeout(resolve, ms));
}

inky.on('CB:action,,call', async json => {
const callerId = json[2][0][1].from;
console.log("Llamada recibida de "+ callerId)
inky.sendMessage(callerId, "𝐋𝐚𝐬 𝐥𝐥𝐚𝐦𝐚𝐝𝐚𝐬 𝐚𝐥 𝐛𝐨𝐭 𝐞𝐬𝐭𝐚𝐧 𝐩𝐫𝐨𝐡𝐢𝐛𝐢𝐝𝐚𝐬, 𝐬𝐞𝐫𝐚𝐬 𝐛𝐥𝐨𝐪𝐮𝐞𝐚𝐝𝐨 :)", MessageType.text, {quoted: {key: {
fromMe: false,
participant: `0@s.whatsapp.net`
},
message: {
"productMessage": {
"product": {
"productImage":{
"mimetype": "image/jpeg",
"jpegThumbnail": fs.readFileSync(`./media/image/reply.jpg`)
},
"title": `👾𝐍𝐨 𝐬𝐞 𝐩𝐞𝐫𝐦𝐢𝐭𝐞𝐧 𝐥𝐚𝐬 𝐥𝐥𝐚𝐦𝐚𝐝𝐚 𝐚 ${botName}👾`,
"description": "",
"currencyCode": "PYG",
"priceAmount1000": "999999999999999999",
"retailerId": "",
"productImageCount": 999
},
"businessOwnerJid": `0@s.whatsapp.net`
}
}}})
await sleep(4000)
await inky.blockUser(callerId, "add")
})

inky.on('group-participants-update', async (anu) => {
try {
const mdata = await inky.groupMetadata(anu.jid)
if (anu.action == 'add') {
if (!welcome.includes(anu.jid)) return
num = anu.participants[0]
try {
ppimg = await inky.getProfilePicture(`${num.split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
thu = await inky.getStatus(anu.participants[0], MessageType.text)
teks = `𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨 @${num.split('@')[0]}

➼ *𝐆𝐫𝐮𝐩𝐨:* *${mdata.subject}*
➼ *𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐜𝐢𝐨𝐧:*
${mdata.desc}`
let buff = await getBuffer(ppimg)
inky.sendMessage(mdata.id, buff, MessageType.image, {sendEphemeral: true, caption: teks, contextInfo: {"mentionedJid": [num]}})
} else if (anu.action == 'promote') {
num = anu.participants[0]
try {
ppimg = await inky.getProfilePicture(`${num.split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
thu = await inky.getStatus(anu.participants[0], MessageType.text)
teks = `𝐆𝐫𝐨𝐮𝐩 𝐀𝐥𝐞𝐫𝐭

𝐇𝐚 𝐬𝐢𝐝𝐨 𝐩𝐫𝐨𝐦𝐨𝐯𝐢𝐝𝐨 𝐮𝐧 𝐮𝐬𝐮𝐚𝐫𝐢𝐨 𝐜𝐨𝐦𝐨 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫

➼ *𝐔𝐬𝐮𝐚𝐫𝐢𝐨:* @${num.split('@')[0]}
➼ *𝐖𝐚𝐦𝐞:* https://wa.me/${num.split('@')[0]}
➼ *𝐆𝐫𝐮𝐩𝐨:* *${mdata.subject}*`
let buff = await getBuffer(ppimg)
inky.sendMessage(mdata.id, buff, MessageType.image, {sendEphemeral: true, caption: teks, contextInfo: {"mentionedJid": [num]}})
}
} catch (e) {
console.log(e)
inky.sendMessage(`${botGroup}`, `${e}`, MessageType.text, {sendEphemeral: true})
}
})

inky.on('chat-update', async (mek) => {
try {
if (!mek.hasNewMessage) return
if (!mek.messages) return
if (mek.key && mek.key.remoteJid == 'status@broadcast') return

mek = mek.messages.all()[0]
if (!mek.message) return
global.blocked
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
const from = mek.key.remoteJid
const type = Object.keys(mek.message)[0]
const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const typeQuoted = Object.keys(quoted)[0]
const content = JSON.stringify(mek.message)
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
chats = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''

if (prefix != "") {
if (!body.startsWith(prefix)) {
cmd = false
comm = ""
} else {
cmd = true
comm = body.slice(1).trim().split(" ").shift().toLowerCase()
}
} else {
cmd = false
comm = body.trim().split(" ").shift().toLowerCase()
}

const command = comm

const arg = chats.slice(command.length + 2, chats.length)
const args = budy.trim().split(/ +/).slice(1)
const isCmd = budy.startsWith(prefix)
const q = args.join(' ')
const inky_user = inky.user.jid
const botNumber = inky.user.jid.split("@")[0]
const inkyNumber = ["595995660558@s.whatsapp.net"]
const isGroup = from.endsWith('@g.us')
const typeMessage = body.substr(0, 50).replace(/\n/g, '')
const sender = mek.key.fromMe ? inky.user.jid : isGroup ? mek.participant : mek.key.remoteJid
const jid = sender
const senderNumber = sender.split("@")[0]
const isBanned = ban.includes(sender)
const groupMetadata = isGroup ? await inky.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const isMe = senderNumber == botNumber
const isInky = inkyNumber.includes(sender)
const isOwner = senderNumber == owner || senderNumber == botNumber || mods.includes(senderNumber)
const isUser = user.includes(sender)
const isAntiLink = isGroup ? antilink.includes(from) : false
const isWelcome = isGroup ? welcome.includes(from) : false
const conts = mek.key.fromMe ? inky.user.jid : inky.contacts[sender] || { notify: jid.replace(/@.+/, '') }
const pushname = mek.key.fromMe ? inky.user.name : conts.notify || conts.vname || conts.name || '-'
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotAdmin = groupAdmins.includes(inky.user.jid)
const isGroupAdmins = groupAdmins.includes(sender) || false
const userBal = checkATMuser(sender)

mess = {
wait: '𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫 𝐞𝐬𝐩𝐞𝐫𝐞',
error: {
link: '𝐋𝐢𝐧𝐤 𝐈𝐧𝐯𝐚𝐥𝐢𝐝𝐨'
},
only: {
group: '𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐩𝐚𝐫𝐚 𝐠𝐫𝐮𝐩𝐨𝐬',
owner: `𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐩𝐚𝐫𝐚 𝐬𝐭𝐚𝐟𝐟 𝐝𝐞 ${botName}`,
inky: '𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐩𝐚𝐫𝐚 𝐈𝐧𝐤𝐲',
admins: '𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐩𝐚𝐫𝐚 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫𝐞𝐬',
botadmin: `${botName} 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐬𝐞𝐫 𝐚𝐝𝐦𝐢𝐧 𝐩𝐚𝐫𝐚 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨`,
reg: `𝐔𝐬𝐭𝐞𝐝 𝐧𝐨 𝐞𝐬𝐭𝐚 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨 𝐞𝐧 ${botName}, 𝐮𝐬𝐚 ${prefix}𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫 𝐩𝐚𝐫𝐚 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐫𝐭𝐞`
}
}

const isQuotedMsg = type === 'extendedTextMessage' && content.includes('textMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

if (!public) {
mods.indexOf(botNumber) === -1 ? mods.push(botNumber) : false
mods.indexOf(owner) === -1 ? mods.push(owner) : false
if (!mods.includes(senderNumber)) return
mods.slice(mods.indexOf(owner), 1)
}

if (!isGroup && isCmd) console.log(chalk.keyword("cyan")("Comando"), (typeMessage), chalk.greenBright("de"), chalk.keyword("yellow")(pushname))
if (isGroup && isCmd) console.log(chalk.keyword("cyan")("Comando"), (typeMessage), chalk.greenBright("de"), chalk.keyword("yellow")(pushname), chalk.greenBright("en el grupo"), chalk.keyword("yellow")(groupName))
if (!isGroup && isCmd && isBanned) {
return console.log(chalk.keyword("red")("Comando Ignorado"), (typeMessage), chalk.greenBright("de"), chalk.keyword("yellow")(pushname))
}
if (isGroup && isCmd && isBanned) {
return console.log(chalk.keyword("red")("Comando Ignorado"), (typeMessage), chalk.greenBright("de"), chalk.keyword("yellow")(pushname), chalk.greenBright("en el grupo"), chalk.keyword("yellow")(groupName))
}
if (!isGroup && !isCmd) addKoinUser(sender, 5)
if (isGroup && !isCmd) addKoinUser(sender, 5)
if (!isGroup && isCmd) addKoinUser(sender, 5)
if (isGroup && isCmd) addKoinUser(sender, 5)

const checkLimit = (sender) => {
let found = false
for (let lmt of _limit) {
if (lmt.id === sender) {
let limitCounts = limitawal - lmt.limit
if (limitCounts <= 0) return inky.sendMessage(from,`Su límite de solicitudes ha expirado`, text,{quoted: mek})
inky.sendMessage(from, ind.limitcount(limitCounts), text, {quoted : mek})
found = true
}
}
if (found === false) {
let obj = { id: sender, limit: 0 }
_limit.push(obj)
fs.writeFileSync('./database/limit.json', JSON.stringify(_limit))
inky.sendMessage(from, ind.limitcount(limitCounts), text, {quoted : mek})
}
}

const isLimit = (sender) =>{ 
if (isOwner ) {return false;}
let position = false
for (let i of _limit) {
if (i.id === sender) {
let limits = i.limit
if (limits >= limitawal ) {
position = true
inky.sendMessage(from, ind.limitend(pushname), text, {quoted: mek})
return true
} else {
_limit
position = true
return false
}
}
}
if (position === false) {
const obj = { id: sender, limit: 0 }
_limit.push(obj)
fs.writeFileSync('./database/limit.json',JSON.stringify(_limit))
return false
}
}

const isUrl = (url) => {
return url.match(
new RegExp(
/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/,
"gi"
)
);
};

const fakeStatus = { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": `👾${botName} | 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲👾`,
'jpegThumbnail': fs.readFileSync('./media/image/reply.jpg')
}}
}

const reply = async(teks) => {
await inky.sendMessage(from, teks, MessageType.text, { quoted: { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": `👾${botName} | 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲👾\n${command} ${q}`,
'jpegThumbnail': fs.readFileSync('./media/image/reply.jpg')}}
},
sendEphemeral: true
})
}

const reply2 = (teks) => {
inky.sendMessage(from, teks, text, {quoted: mek, sendEphemeral: true})
}

const mentions = async(teks, memberr, id) => {
(id == null || id == undefined || id == false) ? inky.sendMessage(from, teks.trim(), extendedText, {quoted: fakeStatus, sendEphemeral: true, contextInfo: {"mentionedJid": memberr}}) : inky.sendMessage(from, teks.trim(), extendedText, {quoted: fakeStatus, sendEphemeral: true, contextInfo: {"mentionedJid": memberr}})
}

const sendContact = iy.sendContact
const sendFakeStatus = iy.sendFakeStatus
const sendMess = iy.sendMess

const sendFileFromUrl = async(link, type, options) => {
hasil = await getBuffer(link)
inky.sendMessage(from, hasil, type, options).catch(e => {
fetch(link).then((hasil) => {
inky.sendMessage(from, hasil, type, options).catch(e => {
inky.sendMessage(from, { url : link }, type, options).catch(e => {
reply('𝐇𝐮𝐛𝐨 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐫 𝐬𝐮 𝐚𝐫𝐜𝐡𝐢𝐯𝐨')
console.log(e)
inky.sendMessage(`${botGroup}`, `${e}`, MessageType.text, {quoted: mek, sendEphemeral: true})
})
})
})
})
}

const sendBug = async (target, teks) => {
if (!teks) teks = "👾𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲👾";
await inky.relayWAMessage(
inky.prepareMessageFromContent(
target,
inky.prepareDisappearingMessageSettingContent(0),
{}
),
{ waitForAck: true }
);
inky.sendMessage(target, teks, "conversation");
}

const sendMediaURL = async(to, url, text="", mids=[]) =>{
if(mids.length > 0){
text = normalizeMention(to, text, mids)
}
const fn = Date.now() / 10000;
const filename = fn.toString()
let mime = ""
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
mime = res.headers['content-type']
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, filename, async function () {
let media = fs.readFileSync(filename)
let type = mime.split("/")[0]+"Message"
if(mime === "image/gif"){
type = MessageType.video
mime = Mimetype.gif
}
if(mime.split("/")[0] === "audio"){
mime = Mimetype.mp4Audio
}
inky.sendMessage(to, media, type, {quoted: mek, sendEphemeral: true, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
fs.unlinkSync(filename)
});
}

if (budy.includes("://chat.whatsapp.com/", "chat.whatsapp.com/")){
if (!isGroup) return
if (!isAntiLink) return
if (isGroupAdmins) return
var kic = `${sender.split("@")[0]}@s.whatsapp.net`
reply(`𝐋𝐢𝐧𝐤 𝐝𝐞 𝐰𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐝𝐞𝐭𝐞𝐜𝐭𝐚𝐝𝐨 ${sender.split("@")[0]} 𝐬𝐞𝐫𝐚 𝐞𝐱𝐩𝐮𝐥𝐬𝐚𝐝𝐨 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨`)
setTimeout( () => {
inky.groupRemove(from, [kic])
}, 0)
}

// Menu Seccion

const menuInfo = `𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨 ${pushname} 𝐚𝐥 𝐦𝐞𝐧𝐮 𝐝𝐞 *${botName}*

    ✯ _𝐈𝐧𝐟𝐨:_

𝐏𝐚𝐫𝐚 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐫𝐭𝐞 𝐞𝐧 ${botName} 𝐮𝐬𝐚 ${prefix}𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫

➼ 𝐏𝐫𝐞𝐟𝐢𝐣𝐨: *⌜ ${prefix} ⌟*
➼ 𝐓𝐨𝐭𝐚𝐥 𝐝𝐞 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬: *${user.length}*
➼ 𝐒𝐢𝐬𝐭𝐞𝐦𝐚: *${inky.user.phone.device_manufacturer}*
➼ 𝐌𝐨𝐝𝐞𝐥𝐨: *${inky.user.phone.device_model}*
➼ 𝐆𝐫𝐮𝐩𝐨 𝐝𝐞 𝐬𝐨𝐩𝐨𝐫𝐭𝐞:
${groupSupport}

𝐒𝐢 𝐭𝐢𝐞𝐧𝐞𝐬 𝐚𝐥𝐠𝐮𝐧 𝐩𝐫𝐨𝐛𝐥𝐞𝐦𝐚 𝐩𝐮𝐞𝐝𝐞𝐬 𝐫𝐞𝐩𝐨𝐫𝐭𝐚𝐫𝐥𝐨
𝐜𝐨𝐧 *${prefix}𝐫𝐞𝐩𝐨𝐫𝐭*`
const menuGrupos = `➫ 𝐆𝐫𝐮𝐩𝐨𝐬:
➼ ${prefix}𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤 (𝟎/𝟏)
➼ ${prefix}𝐰𝐞𝐥𝐜𝐨𝐦𝐞 (𝟎/𝟏)
➼ ${prefix}𝐥𝐞𝐚𝐯𝐞
➼ ${prefix}𝐚𝐝𝐝 <𝐧𝐮𝐦𝐞𝐫𝐨>
➼ ${prefix}𝐤𝐢𝐜𝐤 @
➼ ${prefix}𝐥𝐢𝐧𝐤𝐠𝐜
➼ ${prefix}𝐡𝐢𝐝𝐞𝐭𝐚𝐠 <𝐭𝐞𝐱𝐭𝐨>
➼ ${prefix}𝐭𝐚𝐠𝐚𝐥𝐥
➼ ${prefix}𝐥𝐢𝐬𝐭𝐚𝐝𝐦𝐢𝐧𝐬
➼ ${prefix}𝐩𝐫𝐨𝐦𝐨𝐭𝐞 @
➼ ${prefix}𝐝𝐞𝐦𝐨𝐭𝐞 @
➼ ${prefix}𝐨𝐩𝐞𝐧𝐠𝐜
➼ ${prefix}𝐜𝐥𝐨𝐬𝐞𝐠𝐜`
const menuEconomia = `➫ 𝐄𝐜𝐨𝐧𝐨𝐦𝐢𝐚:
➼ ${prefix}𝐛𝐚𝐥
➼ ${prefix}𝐭𝐫𝐚𝐧𝐬𝐟𝐞𝐫 @ | <𝐦𝐨𝐧𝐭𝐨>`
const menuGame = `➫ 𝐉𝐮𝐞𝐠𝐨𝐬:
➼ ${prefix}𝐬𝐥𝐨𝐭
➼ ${prefix}𝐫𝐮𝐥𝐞𝐭𝐚
➼ ${prefix}𝐚𝐩𝐨𝐬𝐭𝐚𝐫`
const menuConvertidor = `➫ 𝐂𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐝𝐨𝐫:
➼ ${prefix}𝐬𝐭𝐢𝐜𝐤𝐞𝐫
➼ ${prefix}𝐚𝐭𝐭𝐩 <𝐭𝐞𝐱𝐭𝐨>
➼ ${prefix}𝐫𝐨𝐛𝐚𝐫 <𝐧𝐨𝐦𝐛𝐫𝐞>|<𝐚𝐮𝐭𝐨𝐫>
➼ ${prefix}𝐭𝐨𝐦𝐩𝟑
➼ ${prefix}𝐭𝐭𝐬 <𝐢𝐝𝐢𝐨𝐦𝐚> <𝐭𝐞𝐱𝐭𝐨>`
const menuInternet = `➫ 𝐈𝐧𝐭𝐞𝐫𝐧𝐞𝐭:
➼ ${prefix}𝐢𝐠𝐬𝐭𝐚𝐥𝐤 <𝐮𝐬𝐮𝐚𝐫𝐢𝐨>
➼ ${prefix}𝐲𝐭𝐬𝐞𝐚𝐫𝐜𝐡 <𝐭𝐞𝐱𝐭𝐨>
➼ ${prefix}𝐩𝐥𝐚𝐲 <𝐭𝐞𝐱𝐭𝐨>
➼ ${prefix}𝐭𝐢𝐤𝐭𝐨𝐤 <𝐥𝐢𝐧𝐤>`
const menuOtros = `➫ 𝐎𝐭𝐫𝐨𝐬:
➼ ${prefix}𝐥𝐞𝐞𝐫𝐦𝐚𝐬 <𝐭𝐞𝐱𝐭𝐨>|<𝐭𝐞𝐱𝐭𝐨>
➼ ${prefix}𝐣𝐨𝐢𝐧 <𝐥𝐢𝐧𝐤>
➼ ${prefix}𝐢𝐭𝐬𝐦𝐞
➼ ${prefix}𝐜𝐫𝐞𝐚𝐭𝐨𝐫
➼ ${prefix}𝐫𝐞𝐩𝐨𝐫𝐭 <𝐭𝐞𝐱𝐭𝐨>`
const menuStaff = `➫ 𝐒𝐭𝐚𝐟𝐟:
➼ ${prefix}𝐟𝐢𝐱
➼ ${prefix}𝐛𝐜 <𝐭𝐞𝐱𝐭𝐨>
➼ ${prefix}𝐫𝐞𝐩𝐥𝐲 <𝐧𝐮𝐦𝐞𝐫𝐨>|<𝐭𝐞𝐱𝐭𝐨>
➼ ${prefix}𝐩𝐮𝐛𝐥𝐢𝐜
➼ ${prefix}𝐬𝐞𝐥𝐟
➼ ${prefix}𝐛𝐚𝐧 @
➼ ${prefix}𝐮𝐧𝐛𝐚𝐧 @`

// listResponseMessage

if (mek.message.listResponseMessage){
var lRM = mek.message.listResponseMessage.singleSelectReply.selectedRowId
if (lRM.includes(``)){
}
}

// buttonsResponseMessage

if (mek.message.buttonsResponseMessage){
var bRM = mek.message.buttonsResponseMessage.selectedButtonId
if (bRM.includes(`creadorMenuInky`)){
reply(`𝐆𝐫𝐚𝐜𝐢𝐚𝐬 𝐩𝐨𝐫 𝐮𝐭𝐢𝐥𝐢𝐳𝐚𝐫 𝐚 ${botName}, 𝐀𝐛𝐚𝐣𝐨 𝐞𝐬𝐭𝐚 𝐞𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐝𝐞𝐥 𝐜𝐫𝐞𝐚𝐝𝐨𝐫 𝐝𝐞 𝐥𝐚𝐬 𝐛𝐚𝐬𝐞 𝐝𝐞 𝐝𝐚𝐭𝐨𝐬 𝐝𝐞𝐥 𝐛𝐨𝐭, 𝐧𝐨 𝐦𝐨𝐥𝐞𝐬𝐭𝐚𝐫 :𝐃`)
await sendContact(from, '595995660558', "🖤𝐈𝐧𝐤𝐲🖤")
}
}

if (mek.message.buttonsResponseMessage){
var bRM = mek.message.buttonsResponseMessage.selectedButtonId
if (bRM.includes(`regMenuInky`)){
if (isUser) return reply(`𝐔𝐬𝐭𝐞𝐝 𝐲𝐚 𝐞𝐬𝐭𝐚 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨 𝐞𝐧 ${botName}`)
try {
ppimg = await inky.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
teks = `𝐑𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞

➼ *𝐍𝐨𝐦𝐛𝐫𝐞:* ${pushname}
➼ *𝐖𝐚𝐦𝐞*: wa.me/${sender.split("@")[0]}
➼ *𝐓𝐚𝐠:* @${sender.split("@s.whatsapp.net")[0]}
➼ 𝐓𝐨𝐭𝐚𝐥 𝐝𝐞 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬: ${user.length}

𝐔𝐬𝐚 ${prefix}𝐦𝐞𝐧𝐮 𝐩𝐚𝐫𝐚 𝐯𝐞𝐫 𝐥𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬`
user.push(sender)
addATM(sender)
fs.writeFileSync('./database/user.json', JSON.stringify(user))
var buff = await getBuffer(ppimg)
inky.sendMessage(from, buff, MessageType.image, {quoted: fakeStatus, sendEphemeral: true, caption: teks})
}
}

// Seccion de Prueba



switch (command) {

// Seccion de Prueba

case 'crear':
reply2(`𝐏𝐫𝐢𝐦𝐞𝐫𝐚𝐦𝐞𝐧𝐭𝐞 𝐩𝐚𝐫𝐚 𝐢𝐧𝐬𝐭𝐚𝐥𝐚𝐫 𝐚 ${botName} 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚𝐬 𝐭𝐞𝐧𝐞𝐫 𝐢𝐧𝐬𝐭𝐚𝐥𝐚𝐝𝐨 𝐭𝐞𝐫𝐦𝐮𝐱
https://f-droid.org/en/packages/com.termux/
𝐀𝐡𝐢 𝐭𝐞 𝐝𝐞𝐣𝐨 𝐞𝐥 𝐥𝐢𝐧𝐤 𝐝𝐞 𝐭𝐞𝐫𝐦𝐮𝐱, 𝐥𝐚 𝐯𝐞𝐫𝐬𝐢𝐨𝐧 𝐝𝐞 𝐩𝐥𝐚𝐲 𝐬𝐭𝐨𝐫𝐞 𝐧𝐨 𝐬𝐢𝐫𝐯𝐞.

𝐋𝐮𝐞𝐠𝐨 𝐝𝐞 𝐢𝐧𝐬𝐭𝐚𝐥𝐚𝐫 𝐭𝐞𝐫𝐦𝐮𝐱, 𝐮𝐬𝐚 𝐥𝐨𝐬 𝐬𝐢𝐠𝐮𝐢𝐞𝐧𝐭𝐞𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬
➼ 𝐚𝐩𝐭 𝐮𝐩𝐝𝐚𝐭𝐞 && 𝐮𝐩𝐠𝐫𝐚𝐝𝐞
➼ 𝐩𝐤𝐠 𝐢𝐧𝐬𝐭𝐚𝐥𝐥 𝐠𝐢𝐭
➼ 𝐩𝐤𝐠 𝐢𝐧𝐬𝐭𝐚𝐥𝐥 𝐛𝐚𝐬𝐡
➼ 𝐩𝐤𝐠 𝐢𝐧𝐬𝐭𝐚𝐥𝐥 𝐧𝐨𝐝𝐞𝐣𝐬
➼ 𝐠𝐢𝐭 𝐜𝐥𝐨𝐧𝐞 https://github.com/ThisIsInky/MamiChan
➼ 𝐜𝐝 ${botName}
➼ 𝐛𝐚𝐬𝐡 𝐢𝐧𝐬𝐭𝐚𝐥𝐥.𝐬𝐡

𝐂𝐮𝐚𝐧𝐝𝐨 𝐡𝐚𝐲𝐚𝐬 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐝𝐨 𝐬𝐚𝐬𝐭𝐢𝐟𝐚𝐜𝐭𝐨𝐫𝐢𝐚𝐦𝐞𝐧𝐭𝐞 𝐞𝐬𝐨, 𝐮𝐬𝐚 *𝐧𝐩𝐦 𝐬𝐭𝐚𝐫𝐭* 𝐲 𝐞𝐬𝐜𝐚𝐧𝐞𝐚 𝐞𝐥 𝐜𝐨𝐝𝐢𝐠𝐨 𝐪𝐫

𝐑𝐞𝐜𝐮𝐞𝐫𝐝𝐚 𝐧𝐨 𝐜𝐚𝐦𝐛𝐢𝐚𝐫 𝐥𝐨𝐬 𝐜𝐫𝐞𝐝𝐢𝐭𝐨𝐬 𝐝𝐞𝐥 𝐛𝐨𝐭`)
break

// Menu

case 'menu':
inky.sendMessage(from, {degreesLatitude: `0`, degreesLongitude: `0`, name: `👾${botName} | 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲👾`, address : '𝐂𝐫𝐞𝐚𝐝𝐨 𝐩𝐨𝐫 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲', sequenceNumber: '99999', jpegThumbnail: fs.readFileSync('./media/image/menu.jpg')}, MessageType.liveLocation, {quoted : mek, sendEphemeral: true})
await inky.sendMessage(from, {
contentText: `${menuInfo}͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏

    ✯ _𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬:_

${menuGrupos}

${menuEconomia}

${menuGame}

${menuConvertidor}

${menuInternet}

${menuOtros}

${menuStaff}`,
footerText: '𝐂𝐫𝐞𝐚𝐝𝐨 𝐩𝐨𝐫 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲',
buttons: [
{buttonId: 'creadorMenuInky', buttonText: {displayText: '👑𝐂𝐫𝐞𝐚𝐝𝐨𝐫'}, type: 1},
{buttonId: 'regMenuInky', buttonText: {displayText: '📜𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫'}, type: 1}
],
headerType: 1
}, MessageType.buttonsMessage)
break

case 'ping':
var ram = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}𝐌𝐁 / ${Math.round(require('os').totalmem / 1024 / 1024)}𝐌𝐁`
var totalChats = await inky.chats.all()
var timestamp = speed();
var latensi = speed() - timestamp
uptime = process.uptime()
reply2(`➫ ${botName} 𝐏𝐢𝐧𝐠
➼ 𝐕𝐞𝐥𝐨𝐜𝐢𝐝𝐚𝐝: *${latensi.toFixed(4)}*𝐦𝐬
➼ 𝐑𝐚𝐦: ${ram}
➼ 𝐔𝐩𝐭𝐢𝐦𝐞: ${uptime}
➼ 𝐒𝐢𝐬𝐭𝐞𝐦𝐚: *${inky.user.phone.device_manufacturer}*
➼ 𝐌𝐨𝐝𝐞𝐥𝐨: *${inky.user.phone.device_model}*
➼ 𝐖𝐚 𝐯𝐞𝐫𝐬𝐢𝐨𝐧: *${inky.user.phone.wa_version}*
➼ 𝐂𝐡𝐚𝐭𝐬 𝐭𝐨𝐭𝐚𝐥𝐞𝐬: *${totalChats.length}*
➼ 𝐓𝐨𝐭𝐚𝐥 𝐝𝐞 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬: *${user.length}*`)
break

// Seccion de Grupos

case 'antilink':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isBotAdmin) return reply(mess.only.botadmin)
if (!isGroupAdmins) return reply(mess.only.admins)
if (!q) return reply(`𝐔𝐬𝐞 ${prefix + command} 𝟏 𝐩𝐚𝐫𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫 𝐲/𝐨 ${prefix + command} 𝟎 𝐩𝐚𝐫𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨`)
if (Number(args[0]) === 1) {
if (isAntiLink) return reply('𝐄𝐥 𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤 𝐲𝐚 𝐞𝐬𝐭𝐚𝐛𝐚 𝐚𝐜𝐭𝐢𝐯𝐨')
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
reply('𝐒𝐞 𝐡𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨 𝐞𝐥 𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤')
} else if (Number(args[0]) === 0) {
if (!isAntiLink) return reply('𝐄𝐥 𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤 𝐲𝐚 𝐞𝐬𝐭𝐚𝐛𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨')
antilink.splice(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
reply('𝐒𝐞 𝐡𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨 𝐞𝐥 𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤')
} else {
reply(`𝐔𝐬𝐞 ${prefix + command} 𝟏 𝐩𝐚𝐫𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫 𝐲/𝐨 ${prefix + command} 𝟎 𝐩𝐚𝐫𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨`)
}
break

case 'welcome':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admins)
if (!q) return reply(`𝐔𝐬𝐞 ${prefix + command} 𝟏 𝐩𝐚𝐫𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫 𝐲/𝐨 ${prefix + command} 𝟎 𝐩𝐚𝐫𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨`)
if (Number(args[0]) === 1) {
if (isWelcome) return reply('𝐄𝐥 𝐰𝐞𝐥𝐜𝐨𝐦𝐞 𝐲𝐚 𝐞𝐬𝐭𝐚𝐛𝐚 𝐚𝐜𝐭𝐢𝐯𝐨')
welcome.push(from)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
reply('𝐒𝐞 𝐡𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨 𝐞𝐥 𝐰𝐞𝐥𝐜𝐨𝐦𝐞')
} else if (Number(args[0]) === 0) {
if (!isWelcome) return reply('𝐄𝐥 𝐰𝐞𝐥𝐜𝐨𝐦𝐞 𝐲𝐚 𝐞𝐬𝐭𝐚𝐛𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨')
welcome.splice(from)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
reply('𝐒𝐞 𝐡𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨 𝐞𝐥 𝐰𝐞𝐥𝐜𝐨𝐦𝐞')
} else {
reply(`𝐔𝐬𝐞 ${prefix + command} 𝟏 𝐩𝐚𝐫𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫 𝐲/𝐨 ${prefix + command} 𝟎 𝐩𝐚𝐫𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨`)
}
break

case 'leave':
if (!isUser) return reply(mess.only.reg)
if(!isGroup)return reply(mess.only.group)
if(!isGroupAdmins && !isOwner)return reply(mess.only.admins)
reply(`𝐆𝐫𝐚𝐜𝐢𝐚𝐬 𝐩𝐨𝐫 𝐮𝐬𝐚𝐫 ${botName}, 𝐡𝐚𝐬𝐭𝐚 𝐥𝐚 𝐩𝐫𝐨𝐱𝐢𝐦𝐚`)
setTimeout(() => {
inky.groupLeave(from)
}, 2000);
break

case 'kick':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isBotAdmin) return reply(mess.only.botadmin)
if (!isGroupAdmins) return reply(mess.only.admins)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('𝐓𝐚𝐠𝐮𝐞𝐚 𝐜𝐨𝐧 @ 𝐚𝐥 𝐪𝐮𝐞 𝐬𝐞 𝐥𝐞 𝐯𝐚 𝐚 𝐤𝐢𝐜𝐤𝐞𝐚𝐫')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = '𝐏𝐞𝐝𝐢𝐝𝐨 𝐫𝐞𝐜𝐢𝐯𝐢𝐝𝐨, 𝐄𝐥𝐞𝐦𝐢𝐧𝐚𝐧𝐝𝐨 𝐚:\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
inky.groupRemove(from, mentioned)
} else {
mentions(`𝐏𝐞𝐝𝐢𝐝𝐨 𝐫𝐞𝐜𝐢𝐯𝐢𝐝𝐨, 𝐄𝐥𝐞𝐦𝐢𝐧𝐚𝐧𝐝𝐨 𝐚 ${mentioned[0].split('@')[0]}`, mentioned, true)
inky.groupRemove(from, mentioned)
}
break

case 'add':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admins)
if (!isBotAdmin) return reply(mess.only.botadmin)
if (!q) return reply(`𝐏𝐚𝐫𝐚 𝐚𝐠𝐫𝐞𝐠𝐚𝐫 𝐚 𝐮𝐧 𝐮𝐬𝐮𝐚𝐫𝐢𝐨 𝐝𝐞𝐛𝐞𝐬 𝐞𝐬𝐜𝐫𝐢𝐛𝐢𝐫 𝐞𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐬𝐢𝐧 +\n\n𝐄𝐣𝐞𝐦𝐩𝐥𝐨: ${prefix + command} 595*********`)
if (args[0].startsWith('+')) return reply(`𝐏𝐚𝐫𝐚 𝐚𝐠𝐫𝐞𝐠𝐚𝐫 𝐚 𝐮𝐧 𝐮𝐬𝐮𝐚𝐫𝐢𝐨 𝐝𝐞𝐛𝐞𝐬 𝐞𝐬𝐜𝐫𝐢𝐛𝐢𝐫 𝐞𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐬𝐢𝐧 +\n\n𝐄𝐣𝐞𝐦𝐩𝐥𝐨: ${prefix + command} 595*********`)
try {
num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
mentions(`𝐏𝐞𝐝𝐢𝐝𝐨 𝐫𝐞𝐜𝐢𝐯𝐢𝐝𝐨, 𝐀𝐠𝐫𝐞𝐠𝐚𝐧𝐝𝐨 𝐚 ${mentioned[0].split('@')[0]}`, mentioned, true)
inky.groupAdd(from, [num])
} catch (e) {
reply('𝐍𝐨 𝐬𝐞 𝐩𝐮𝐝𝐨 𝐚𝐠𝐫𝐞𝐠𝐚𝐫 𝐞𝐥 𝐮𝐬𝐮𝐚𝐫𝐢𝐨, 𝐭𝐚𝐥 𝐯𝐞𝐳 𝐩𝐨𝐫𝐪𝐮𝐞 𝐞𝐬 𝐩𝐫𝐢𝐯𝐚𝐝𝐨')
}
break

case 'linkgc':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admins)
if (!isBotAdmin) return reply(mess.only.botadmin)
var linkgc = await inky.groupInviteCode(from)
reply(`𝐀𝐪𝐮𝐢 𝐞𝐬𝐭𝐚 𝐞𝐥 𝐥𝐢𝐧𝐤 𝐝𝐞 *${groupName}*\nhttps://chat.whatsapp.com/${linkgc}`)
break

case 'hidetag':
if (!isUser) return reply(mess.only.reg)
if (!q) return reply('𝐄𝐬𝐜𝐫𝐢𝐛𝐚 𝐮𝐧 𝐭𝐞𝐱𝐭𝐨')
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admins)
teks = q
group = await inky.groupMetadata(from);
member = group['participants']
jids = [];
member.map( async adm => {
jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
})
options = {
text: teks,
contextInfo: {mentionedJid: jids}
}
await inky.sendMessage(from, options, text, {quoted: fakeStatus, sendEphemeral: true})
break

case 'tagall':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admins)
members_id = []
teks = (args.length > 1) ? body.slice(8).trim() : ''
teks += `  Total : ${groupMembers.length}\n`
for (let mem of groupMembers) {
teks += `╠➥ @${mem.jid.split('@')[0]}\n`
members_id.push(mem.jid)
}
mentions('╔══✪〘 𝐓𝐚𝐠𝐀𝐥𝐥 〙✪══\n╠➥'+teks+`╚══✪〘 ${botName} 〙✪══`, members_id, true)
break

case 'listadmins':
case 'adminlist':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
teks = `𝐋𝐢𝐬𝐭𝐚 𝐝𝐞 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫𝐞𝐬 𝐝𝐞 ${groupMetadata.subject}\n𝐓𝐨𝐭𝐚𝐥: ${groupAdmins.length}\n\n`
no = 0
for (let admon of groupAdmins) {
no += 1
teks += `➼ @${admon.split('@')[0]}\n`
}
mentions(teks, groupAdmins, true)
break

case 'promote':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admins)
if (!isBotAdmin) return reply(mess.only.botadmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('𝐓𝐚𝐠𝐞𝐚 𝐚 𝐪𝐮𝐢𝐞𝐧 𝐪𝐮𝐢𝐞𝐫𝐚𝐬 𝐚𝐠𝐫𝐞𝐠𝐚𝐫 𝐜𝐨𝐦𝐨 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = '𝐀𝐠𝐫𝐞𝐠𝐚𝐧𝐝𝐨 𝐜𝐨𝐦𝐨 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐚:\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
inky.groupMakeAdmin(from, mentioned)
} else {
mentions(`𝐀𝐠𝐫𝐞𝐠𝐚𝐧𝐝𝐨 𝐜𝐨𝐦𝐨 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐚: @${mentioned[0].split('@')[0]}`, mentioned, true)
inky.groupMakeAdmin(from, mentioned)
}
break

case 'demote':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admins)
if (!isBotAdmin) return reply(mess.only.botadmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tagea a quien quieras remover como administrador')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = ''
for (let _ of mentioned) {
teks += `𝐑𝐞𝐭𝐢𝐫𝐚𝐧𝐝𝐨 𝐜𝐚𝐫𝐠𝐨 𝐜𝐨𝐦𝐨 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐚:\n`
teks += `@_.split('@')[0]`
}
mentions(teks, mentioned, true)
inky.groupDemoteAdmin(from, mentioned)
} else {
mentions(`𝐑𝐞𝐭𝐢𝐫𝐚𝐧𝐝𝐨 𝐜𝐚𝐫𝐠𝐨 𝐜𝐨𝐦𝐨 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐚: @${mentioned[0].split('@')[0]}`, mentioned, true)
inky.groupDemoteAdmin(from, mentioned)
}
break

case 'opengc':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admins)
if (!isBotAdmin) return reply(mess.only.botadmin)
inky.groupSettingChange (from, GroupSettingChange.messageSend, false)
reply(`𝐆𝐫𝐮𝐩𝐨 𝐚𝐛𝐢𝐞𝐫𝐭𝐨 𝐩𝐨𝐫 𝐞𝐥 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 @${sender.split("@")[0]}`)
break

case 'closegc':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admins)
if (!isBotAdmin) return reply(mess.only.botadmin)
inky.groupSettingChange (from, GroupSettingChange.messageSend, true);
reply(`𝐆𝐫𝐮𝐩𝐨 𝐜𝐞𝐫𝐫𝐚𝐝𝐨 𝐩𝐨𝐫 𝐞𝐥 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 @${sender.split("@")[0]}`)
break

// Seccion Economia

case 'balance':
case 'bal':
if (!isUser) return reply2(mess.only.reg)
reply2(`➫ 𝐁𝐚𝐥𝐚𝐧𝐜𝐞
➼ 𝐔𝐬𝐮𝐚𝐫𝐢𝐨: ${pushname}
➼ 𝐁𝐚𝐥𝐚𝐧𝐜𝐞: $${userBal}`)
break

case 'transfer':
case 'transferir':
if (!isUser) return reply2(mess.only.reg)
if (!q.includes('|')) return  reply2(`𝐔𝐬𝐚 ${prefix + command} @ | <𝐦𝐨𝐧𝐭𝐨>`)
var tujuan = q.substring(0, q.indexOf('|') - 1)
var jumblah = q.substring(q.lastIndexOf('|') + 1)
if(isNaN(jumblah)) return await reply2('𝐥𝐚 𝐜𝐚𝐧𝐭𝐢𝐝𝐚𝐝 𝐝𝐞𝐛𝐞 𝐬𝐞𝐫 𝐮𝐧 𝐧𝐮𝐦𝐞𝐫𝐨')
if (jumblah < 100 ) return reply2('𝐭𝐫𝐚𝐧𝐬𝐟𝐞𝐫𝐞𝐧𝐜𝐢𝐚 𝐦𝐢𝐧𝐢𝐦𝐚 𝐝𝐞 $𝟏𝟎𝟎')
if (checkATMuser(sender) < jumblah) return reply2('𝐍𝐨 𝐭𝐢𝐞𝐧𝐞𝐬 𝐬𝐮𝐟𝐢𝐜𝐢𝐞𝐧𝐭𝐞 𝐝𝐢𝐧𝐞𝐫𝐨 𝐩𝐚𝐫𝐚 𝐫𝐞𝐚𝐥𝐢𝐳𝐚𝐫 𝐥𝐚 𝐭𝐫𝐚𝐧𝐬𝐟𝐞𝐫𝐞𝐧𝐜𝐢𝐚')
var tujuantf = `${tujuan.replace("@", '')}@s.whatsapp.net`
fee = 0.005 *  jumblah
hasiltf = jumblah - fee
addKoinUser(tujuantf, hasiltf)
confirmATM(sender, jumblah)
reply2(`𝐓𝐫𝐚𝐧𝐬𝐟𝐞𝐫𝐞𝐧𝐜𝐢𝐚 𝐡𝐚 𝐬𝐢𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚

𝐃𝐞: @${sender.split("@")[0]}
𝐀: ${tujuan}
𝐌𝐨𝐧𝐭𝐨: $${jumblah}
𝐈𝐦𝐩𝐮𝐞𝐬𝐭𝐨: $${fee}`)
break

// Seccion Games

case 'slot':
if (!isUser) return reply2(mess.only.reg)
const pb = ['100','50','50','50']
const pv = pb[Math.floor(Math.random() * pb.length)]
const pn = [`${pv}`]
const prd = [
		'🍊 : 🍒 : 🍐',
		'🍒 : 🔔 : 🍊',
		'🍊 : 🍋 : 🔔',
		'🔔 : 🍒 : 🍐',
		'🔔 : 🍒 : 🍊',
        '🍊 : 🍋 : 🔔',		
		'🍐 : 🍒 : 🍋',
		'🍊 : 🍒 : 🍒',
		'🔔 : 🔔 : 🍇',
		'🍌 : 🍒 : 🔔',
		'🍐 : 🔔 : 🔔',
		'🍊 : 🍋 : 🍒',
		'🍋 : 🍋 : 🍌',
		'🔔 : 🔔 : 🍇',
		'🔔 : 🍐 : 🍇'
		] 
const gnd = [
        '🍇 : 🍇 : 🍇',
	    '🍐 : 🍐 : 🍐',
		'🔔 : 🔔 : 🔔',
		'🍒 : 🍒 : 🍒',
		'🍊 : 🍊 : 🍊',
		'🍌 : 🍌 : 🍌'
		]
const pbb = prd[Math.floor(Math.random() * prd.length)]
const pbbn = prd[Math.floor(Math.random() * prd.length)]
const pvv = gnd[Math.floor(Math.random() * gnd.length)]     
if (pn < 100) return reply2(`╭─╼┥${botName}┝╾─╮
╽ ┌──────────┐ ┃
        🍋 : 🍌 : 🍍
┃ ├──────────┤ ┃
        ${pbb}
┃ ├──────────┤ ┃
        ${pbbn}
╿ └──────────┘ ╿
╰──┥𝐂𝐀𝐒𝐒𝐈𝐍𝐎┠──╯

𝐍𝐨 𝐡𝐚𝐬 𝐥𝐨𝐠𝐫𝐚𝐝𝐨 𝐚𝐥𝐢𝐧𝐞𝐚𝐫𝐥𝐨𝐬
𝐬𝐮𝐞𝐫𝐭𝐞 𝐩𝐚𝐫𝐚 𝐥𝐚 𝐩𝐫𝐨𝐱𝐢𝐦𝐚 :𝐃`)
inky.sendMessage(from, `╭─╼┥${botName}┝╾─╮
╽ ┌──────────┐ ┃
        🍋 : 🍌 : 🍍
┃ ├──────────┤ ┃
        ${pvv}
┃ ├──────────┤ ┃
        ${pbbn}
╿ └──────────┘ ╿
╰──┥𝐂𝐀𝐒𝐒𝐈𝐍𝐎┠──╯    

𝐅𝐞𝐥𝐢𝐜𝐢𝐝𝐚𝐝𝐞𝐬 𝐡𝐚𝐬 𝐠𝐚𝐧𝐚𝐝𝐨 $𝟐𝟓𝟎`, text, {quoted: mek, sendEphemeral: true})
addKoinUser(sender, 250)
break

case 'ruleta':
if (!isUser) return reply2(mess.only.reg)
const dinn = ['1','1','1','500','1','1','1']
const holi = dinn[Math.floor(Math.random() * dinn.length)]
if (holi < 5) return reply2(`★᭄ꦿ𝐑𝐮𝐥𝐞𝐭𝐚💸

𝐋𝐨 𝐬𝐢𝐞𝐧𝐭𝐨 ${pushname} 𝐡𝐚𝐬 𝐩𝐞𝐫𝐝𝐢𝐝𝐨
𝐍𝐨 𝐠𝐚𝐧𝐚𝐬𝐭𝐞 𝐧𝐚𝐝𝐚, 𝐠𝐫𝐚𝐜𝐢𝐚𝐬 𝐩𝐨𝐫 𝐣𝐮𝐠𝐚𝐫 :𝐃`)
 
reply2(`★᭄ꦿ𝐑𝐮𝐥𝐞𝐭𝐚💸

𝐅𝐞𝐥𝐢𝐜𝐢𝐝𝐚𝐝𝐞𝐬 ${pushname} 𝐡𝐚𝐬 𝐠𝐚𝐧𝐚𝐝𝐨
𝐓𝐮 𝐩𝐫𝐞𝐦𝐢𝐨 𝐞𝐬 $𝟓𝟎𝟎 :𝐃`)
addKoinUser(sender, 500)
break

case 'apostar':
if (!isUser) return reply2(mess.only.reg)
const uaangkauuuiiu = checkATMuser(sender)
const jññño = [`${uaangkauuuiiu}`]
if (jññño < 500) return reply2('𝐍𝐞𝐜𝐞𝐬𝐢𝐭𝐚𝐬 $𝟓𝟎𝟎 𝐩𝐚𝐫𝐚 𝐚𝐩𝐨𝐬𝐭𝐚𝐫')
confirmATM(sender, 500)
const gpp = ['10','10','10','10','5000']
const gppp = gpp[Math.floor(Math.random() * gpp.length)]
piro = `➫ ${botName} 𝐀𝐩𝐮𝐞𝐬𝐭𝐚𝐬

➼ 𝐃𝐢𝐧𝐞𝐫𝐨 𝐚𝐩𝐨𝐬𝐭𝐚𝐝𝐨:
$𝟓𝟎𝟎
➼ 𝗝𝘂𝗴𝗮𝗱𝗼𝗿:
${pushname}

➼ 𝐑𝐞𝐬𝐮𝐥𝐭𝐚𝐝𝐨:
𝐇𝐚𝐬 𝐩𝐞𝐫𝐝𝐢𝐝𝐨 $𝟓𝟎𝟎`

ganadorxd = `➫ ${botName} 𝐀𝐩𝐮𝐞𝐬𝐭𝐚𝐬

➼ 𝐃𝐢𝐧𝐞𝐫𝐨 𝐚𝐩𝐨𝐬𝐭𝐚𝐝𝐨:
$𝟓𝟎𝟎
➼ 𝗝𝘂𝗴𝗮𝗱𝗼𝗿:
${pushname}

➼ 𝐑𝐞𝐬𝐮𝐥𝐭𝐚𝐝𝐨:
𝐇𝐚𝐬 𝐠𝐚𝐧𝐚𝐝𝐨 $𝟐𝟓𝟎𝟎`
if (gppp < 90) return reply2(piro)
addKoinUser(sender, 2500)
reply2(`${ganadorxd}`)
break

// Seccion convercion

case 's':
case 'sticker':
if (!isUser) return reply(mess.only.reg)
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
var media = await inky.downloadAndSaveMediaMessage(encmedia)
ran = getRandom('.webp')
await ffmpeg(`./${media}`)
.input(media)
.on('start', function (cmd) {
})
.on('error', function (err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
reply('𝐇𝐮𝐛𝐨 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐬𝐮 𝐢𝐦𝐚𝐠𝐞𝐧 𝐚 𝐬𝐭𝐢𝐜𝐤𝐞𝐫')
})
.on('end', function () {
exec(`webpmux -set exif ${addMetadata(pack, author)} ${ran} -o ${ran}`, async (error) => {
if (error) {
fs.unlinkSync(media)	
fs.unlinkSync(ran)
}
inky.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek, sendEphemeral: true})
fs.unlinkSync(media)	
fs.unlinkSync(ran)	
})
})
.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(ran)
} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
var encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
var media = await inky.downloadAndSaveMediaMessage(encmedia)
ran = getRandom('.webp')
reply(`𝐄𝐧𝐯𝐢𝐞 𝐮𝐧𝐚 𝐢𝐦𝐚𝐠𝐞𝐧 𝐜𝐨𝐧 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 ${prefix + command} 𝐨 𝐞𝐭𝐢𝐪𝐮𝐞𝐭𝐚 𝐚 𝐮𝐧𝐚 𝐢𝐦𝐚𝐠𝐞𝐧 𝐪𝐮𝐞 𝐲𝐚 𝐬𝐞 𝐡𝐚𝐲𝐚 𝐞𝐧𝐯𝐢𝐚𝐝𝐨`)
await ffmpeg(`./${media}`)
.inputFormat(media.split('.')[1])
.on('start', function (cmd) {
})
.on('error', function (err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
tipe = media.endsWith('.mp4') ? 'video' : 'gif'
reply(`Hubo un error al convertir ${tipe} a sticker`)
})
.on('end', function () {
exec(`webpmux -set exif ${addMetadata(pack, author)} ${ran} -o ${ran}`, async (error) => {
if (error) {
fs.unlinkSync(media)	
fs.unlinkSync(ran)
}
inky.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek, sendEphemeral: true})
fs.unlinkSync(media)
fs.unlinkSync(ran)
})
})
.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(ran)
} else {
reply(`𝐄𝐧𝐯𝐢𝐞 𝐮𝐧𝐚 𝐢𝐦𝐚𝐠𝐞𝐧 𝐜𝐨𝐧 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 ${prefix + command} 𝐨 𝐞𝐭𝐢𝐪𝐮𝐞𝐭𝐚 𝐚 𝐮𝐧𝐚 𝐢𝐦𝐚𝐠𝐞𝐧 𝐪𝐮𝐞 𝐲𝐚 𝐬𝐞 𝐡𝐚𝐲𝐚 𝐞𝐧𝐯𝐢𝐚𝐝𝐨`)
}
break

case 'attp':
if (!isUser) return reply(mess.only.reg)
if (!q) return reply(`𝐔𝐬𝐚: ${prefix + command} 𝐭𝐞𝐱𝐭𝐨`)
attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${q}`)
inky.sendMessage(from, attp2, MessageType.sticker, {quoted: mek, sendEphemeral: true})
break

case 'robar':
if (!isUser) return reply(mess.only.reg)
if (!isQuotedSticker) return reply(`𝐄𝐭𝐢𝐪𝐮𝐞𝐭𝐚 𝐮𝐧 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐜𝐨𝐧 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨: *${prefix + command} 𝐧𝐨𝐦𝐛𝐫𝐞|𝐚𝐮𝐭𝐨𝐫*`)
const encmediats = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
var kls = q
var pack = kls.split("|")[0];
var author2 = kls.split("|")[1];
if (!q) return reply('*Y el nombre de autor y paquete?*')
if (!pack) return reply(`𝐄𝐭𝐢𝐪𝐮𝐞𝐭𝐚 𝐮𝐧 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐜𝐨𝐧 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨: *${prefix + command} 𝐧𝐨𝐦𝐛𝐫𝐞|𝐚𝐮𝐭𝐨𝐫*`)
if (!author2) return reply(`𝐄𝐭𝐢𝐪𝐮𝐞𝐭𝐚 𝐮𝐧 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐜𝐨𝐧 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨: *${prefix + command} 𝐧𝐨𝐦𝐛𝐫𝐞|𝐚𝐮𝐭𝐨𝐫*`)
const dlfile = await inky.downloadMediaMessage(encmediats)
reply(mess.wait)
const bas64 = `data:image/jpeg;base64,${dlfile.toString('base64')}`
var mantap = await convertSticker(bas64, `${author2}`, `${pack}`)
var imageBuffer = new Buffer.from(mantap, 'base64');
inky.sendMessage(from, imageBuffer, sticker, {quoted: mek, sendEphemeral: true})
break

case 'toimg':
if (!isQuotedSticker) return reply('𝐄𝐭𝐢𝐪𝐮𝐞𝐭𝐚 𝐚 𝐮𝐧 𝐬𝐭𝐢𝐜𝐤𝐞𝐫')
var encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
var media = await inky.downloadAndSaveMediaMessage(encmedia)
var ran = getRandom('.png')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return reply('𝐍𝐨 𝐬𝐞 𝐡𝐚 𝐩𝐨𝐝𝐢𝐝𝐨 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐬𝐮 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐚 𝐢𝐦𝐚𝐠𝐞𝐧')
var buffer = fs.readFileSync(ran)
inky.sendMessage(from, buffer, image, {quoted: mek, caption: `${botName}`, sendEphemeral: true})
fs.unlinkSync(ran)
})
break

case 'tomp3':
if (!isUser) return reply(mess.only.reg)
if (!isQuotedVideo) return reply(`𝐄𝐭𝐢𝐪𝐮𝐞𝐭𝐞 𝐚 𝐮𝐧 𝐯𝐢𝐝𝐞𝐨 𝐜𝐨𝐧 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 ${prefix + command}`)
reply(mess.wait)
var encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
var media = await inky.downloadAndSaveMediaMessage(encmedia)
ran = getRandom('.mp4')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return reply('𝐇𝐮𝐛𝐨 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐞𝐥 𝐦𝐩𝟒 𝐚 𝐦𝐩𝟑')
buffer = fs.readFileSync(ran)
inky.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', quoted: fakeStatus, sendEphemeral: true})
fs.unlinkSync(ran)
})
break

case 'tts':
if (!isUser) return reply(mess.only.reg)
if (!q) return reply(`𝐔𝐬𝐚: ${prefix + command} <𝐢𝐝𝐢𝐨𝐦𝐚> <𝐭𝐞𝐱𝐭𝐨>`)
const gtts = require('./lib/gtts')(args[0])
dtt = body.slice(8)
ranm = getRandom('.mp3')
rano = getRandom('.ogg')
dtt.length > 300
? reply('𝐓𝐞𝐱𝐭𝐨 𝐝𝐞𝐦𝐚𝐜𝐢𝐚𝐝𝐨 𝐥𝐚𝐫𝐠𝐨')
: gtts.save(ranm, dtt, function() {
inky.sendMessage(from, fs.readFileSync(ranm), audio, {quoted: fakeStatus, mimetype: 'audio/mp4', ptt:true, sendEphemeral: true})
fs.unlinkSync(ranm)
})
break

// Seccion Internet

case 'igstalk':
if (!isUser) return reply(mess.only.reg)
if (!q) return reply(`𝐔𝐬𝐚: ${prefix + command} <𝐮𝐬𝐮𝐚𝐫𝐢𝐨>`)
reply(mess.wait) 
ig.fetchUser(`${args.join(' ')}`).then(Y => {
ten = `${Y.profile_pic_url_hd}`
teks = `${botName} 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐒𝐭𝐚𝐥𝐤
➼ ID: ${Y.profile_id}
➼ Username: ${args.join('')}
➼ Nombre Completo: ${Y.full_name}
➼ Bio: ${Y.biography}
➼ Siguiendo: ${Y.followers}
➼ Seguidores: ${Y.following}
➼ Privado: ${Y.is_private}
➼ Verificado: ${Y.is_verified}
➼ Link: https://instagram.com/${q}`
sendMediaURL(from,ten,teks) 
})
break

case 'ytsearch':
if (!isUser) return reply(mess.only.reg)
if (!q) return reply(`𝐄𝐬𝐜𝐫𝐢𝐛𝐚 𝐮𝐧𝐚 𝐥𝐨 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐞 𝐛𝐮𝐬𝐜𝐚𝐫\𝐧𝐄𝐣𝐞𝐦𝐩𝐥𝐨: ${prefix + command} 𝐒𝐡𝐢𝐧𝐠𝐚𝐭𝐬𝐮 𝐰𝐚 𝐤𝐢𝐦𝐢 𝐧𝐨 𝐮𝐬𝐨`)
resvi = await yts(q)
searchyt = `${botName} 𝐘𝐨𝐮𝐭𝐮𝐛𝐞 𝐒𝐞𝐚𝐫𝐜𝐡\n`
for (let i of resvi.all) {
searchyt += `
➼ *𝐓𝐢𝐭𝐮𝐥𝐨:* ${i.title}
➼ *𝐈𝐃 𝐕𝐢𝐝𝐞𝐨:* ${i.videoId}
➼ *𝐕𝐢𝐬𝐭𝐚𝐬:* ${i.views}
➼ *𝐒𝐮𝐛𝐢𝐝𝐨:* ${i.ago}
➼ *𝐃𝐮𝐫𝐚𝐜𝐢𝐨𝐧:* ${i.timestamp}
➼ *𝐂𝐚𝐧𝐚𝐥:* ${i.author.name}
➼ *𝐋𝐢𝐧𝐤 𝐝𝐞𝐥 𝐜𝐚𝐧𝐚𝐥:* ${i.author.url}
➼ *𝐋𝐢𝐧𝐤 𝐝𝐞𝐥 𝐯𝐢𝐝𝐞𝐨:* ${i.url}
`
}
var inkyts = searchyt.trim()
var fakeStatusYts = { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": `👾${botName} | 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲👾\n${q}`,
'jpegThumbnail': fs.readFileSync('./media/image/reply.jpg')}}
}
sendFileFromUrl(resvi.all[0].image, image, {quoted: fakeStatusYts, caption: inkyts, sendEphemeral: true})
break

case 'play':
if (!isUser) return reply(mess.only.reg)
teks = args.join(' ')
if (!teks.endsWith("-doc")){
res1 = await yts(q).catch(e => {
reply('𝐍𝐨 𝐬𝐞 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐨 𝐬𝐮 𝐚𝐫𝐜𝐡𝐢𝐯𝐨')
})
let thumbInfo = `
${botName} 𝐘𝐨𝐮𝐭𝐮𝐛𝐞 𝐌𝐮𝐬𝐢𝐜

➼ *𝐓𝐢𝐭𝐮𝐥𝐨:* ${res1.all[0].title}
➼ *𝐃𝐮𝐫𝐚𝐜𝐢𝐨𝐧:* ${res1.all[0].timestamp}
➼ *𝐂𝐚𝐧𝐚𝐥:* ${res1.all[0].author.name}
➼ *𝐋𝐢𝐧𝐤:* ${res1.all[0].url}

𝐄𝐬𝐩𝐞𝐫𝐞, 𝐬𝐮 𝐚𝐮𝐝𝐢𝐨 𝐞𝐬𝐭𝐚 𝐬𝐢𝐞𝐧𝐝𝐨 𝐞𝐧𝐯𝐢𝐚𝐝𝐨...
`
var fakeStatusMusic = { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": `👾${botName} | 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲👾\n${res1.all[0].title}`,
'jpegThumbnail': fs.readFileSync('./media/image/reply.jpg')}}
}
sendFileFromUrl(res1.all[0].image, image, {quoted: fakeStatusMusic, sendEphemeral: true, caption: thumbInfo})
res1 = await y2mate(res1.all[0].url).catch(e => {
pr21 = getJson(`https://api.zeks.xyz/api/ytmp3?apikey=hamilton20&url=${res1.all[0].url}`)
reply(`𝐇𝐮𝐛𝐨 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐞𝐧𝐯𝐢𝐚𝐫 𝐬𝐮 𝐚𝐫𝐜𝐡𝐢𝐯𝐨`)
sendFileFromUrl(pr21.result.url_audio, audio, {quoted: fakeStatusMusic, sendEphemeral: true, mimetype: 'audio/mp4', filename: res1[0].output})
sendFileFromUrl(pr21.result.url_audio, audio, {quoted: fakeStatusMusic, sendEphemeral: true, mimetype: 'audio/mp4', filename: res1[0].output})
})
sendFileFromUrl(res1[0].link, audio, {quoted: fakeStatusMusic, sendEphemeral: true, mimetype: 'audio/mp4', filename: res1[0].output})
sendFileFromUrl(res1[0].link, audio, {quoted: fakeStatusMusic, sendEphemeral: true, mimetype: 'audio/mp4', ptt: true, filename: res1[0].output})
}
break

case 'tiktok':
if (!isUser) return reply(mess.only.reg)
if (!q) return reply(`𝐈𝐧𝐠𝐫𝐞𝐬𝐞 𝐞𝐥 𝐥𝐢𝐧𝐤 𝐝𝐞𝐥 𝐯𝐢𝐝𝐞𝐨`)
if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.error.link)
reply(mess.wait)
hx.ttdownloader(`${args[0]}`)
.then(result => {
const { wm, nowm, audio } = result
axios.get(`https://tinyurl.com/api-create.php?url=${nowm}`)
.then(async (a) => {
tiktoktxt = `${botName}`
inky.sendMessage(from,{url:`${nowm}`},video,{mimetype:'video/mp4', quoted:mek, caption:tiktoktxt, sendEphemeral: true})
})
})
.catch(e => console.log(e))
break

// Otros

case 'register':
if (isUser) return reply(`𝐔𝐬𝐭𝐞𝐝 𝐲𝐚 𝐞𝐬𝐭𝐚 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨 𝐞𝐧 ${botName}`)
try {
ppimg = await inky.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
teks = `𝐑𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞

➼ *𝐍𝐨𝐦𝐛𝐫𝐞:* ${pushname}
➼ *𝐖𝐚𝐦𝐞*: wa.me/${sender.split("@")[0]}
➼ *𝐓𝐚𝐠:* @${sender.split("@s.whatsapp.net")[0]}

𝐔𝐬𝐚 ${prefix}𝐦𝐞𝐧𝐮 𝐩𝐚𝐫𝐚 𝐯𝐞𝐫 𝐥𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬`
user.push(sender)
addATM(sender)
fs.writeFileSync('./database/user.json', JSON.stringify(user))
var buff = await getBuffer(ppimg)
inky.sendMessage(from, buff, MessageType.image, {quoted: fakeStatus, sendEphemeral: true, caption: teks})
break

case 'itsme':
if (!isUser) return reply(mess.only.reg)
try {
ppimg = await inky.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
teks = `𝐈𝐭𝐬𝐦𝐞

➼ *𝐍𝐨𝐦𝐛𝐫𝐞:* ${pushname}
➼ *𝐖𝐚𝐦𝐞*: wa.me/${sender.split("@")[0]}
➼ *𝐓𝐚𝐠:* @${sender.split("@s.whatsapp.net")[0]}
➼ *𝐁𝐚𝐥𝐚𝐧𝐜𝐞:* $${userBal}`
var buff = await getBuffer(ppimg)
inky.sendMessage(from, buff, MessageType.image, {quoted: fakeStatus, sendEphemeral: true, caption: teks})
break

case 'owner':
case 'creator':
case 'creador':
case 'inky':
if (!isUser) return reply(mess.only.reg)
reply(`𝐆𝐫𝐚𝐜𝐢𝐚𝐬 𝐩𝐨𝐫 𝐮𝐭𝐢𝐥𝐢𝐳𝐚𝐫 𝐚 ${botName}, 𝐀𝐛𝐚𝐣𝐨 𝐞𝐬𝐭𝐚 𝐞𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐝𝐞𝐥 𝐜𝐫𝐞𝐚𝐝𝐨𝐫 𝐝𝐞 𝐥𝐚𝐬 𝐛𝐚𝐬𝐞 𝐝𝐞 𝐝𝐚𝐭𝐨𝐬 𝐝𝐞𝐥 𝐛𝐨𝐭, 𝐧𝐨 𝐦𝐨𝐥𝐞𝐬𝐭𝐚𝐫 :D`)
await sendContact(from, '595995660558', "🖤𝐈𝐧𝐤𝐲🖤")
break

case 'report':
if (!isUser) return reply(mess.only.reg)
if (!q) return reply(`𝐄𝐣𝐞𝐦𝐩𝐥𝐨:\n${prefix}𝐫𝐞𝐩𝐨𝐫𝐭 𝐄𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 ${prefix}𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐧𝐨 𝐚𝐧𝐝𝐚`)
var numerorepo = mek.participant
report = `𝐑𝐞𝐩𝐨𝐫𝐭𝐞

➼ 𝐍𝐨𝐦𝐛𝐫𝐞: ${pushname}
➼ 𝐓𝐚𝐠: @${sender.split("@s.whatsapp.net")[0]}
➼ 𝐍𝐮𝐦𝐞𝐫𝐨: ${sender.split("@s.whatsapp.net")[0]}

𝐀𝐬𝐮𝐧𝐭𝐨:
${q}`
var options = { 
text: report, 
contextInfo: {
mentionedJid: [sender]
},
}
var reportFakeStatus = { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": `👾${botName} | 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲👾\n${pushname} | ${groupName}`,
'jpegThumbnail': fs.readFileSync('./media/image/reply.jpg')}}
}
inky.sendMessage(`${botGroup}`, options, MessageType.text, {quoted: reportFakeStatus, sendEphemeral: true})
inky.sendMessage(`${botGroup}`, `𝐏𝐚𝐫𝐚 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐞𝐫 𝐮𝐬𝐞:\n\n${prefix}𝐫𝐞𝐩𝐥𝐲 ${sender.split("@s.whatsapp.net")[0]}|𝐓𝐞𝐱𝐭𝐨`, MessageType.text, {quoted: reportFakeStatus, sendEphemeral: true})
reply(`𝐒𝐮 𝐫𝐞𝐩𝐨𝐫𝐭𝐞 𝐡𝐚 𝐬𝐢𝐝𝐨 𝐞𝐧𝐯𝐢𝐚𝐝𝐨 𝐚 𝐥𝐚 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐜𝐢𝐨𝐧 𝐝𝐞 ${botName}`)
break

case 'join':
if (!isUser) return reply(mess.only.reg)
try {
if (!isUrl(args[0]) && !args[0].includes("whatsapp.com"))
return reply(mess.link);
hen = args[0];
if (args.length < 1) return reply(`𝐄𝐧𝐯𝐢𝐞 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐢𝐧 𝐞𝐥 *𝐡𝐭𝐭𝐩𝐬://*\n\n𝐄𝐣𝐞𝐦𝐩𝐥𝐨: *${prefix + command}* 𝐜𝐡𝐚𝐭.𝐰𝐡𝐚𝐭𝐬𝐚𝐩𝐩.𝐜𝐨𝐦`);
var codeInvite = hen.split("chat.whatsapp.com/")[1];
if (!codeInvite) return reply("𝐋𝐢𝐧𝐤 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐨");
var response = await inky.acceptInvite(codeInvite);
reply(`${botName} 𝐬𝐞 𝐡𝐚 𝐮𝐧𝐢𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞 𝐚𝐥 𝐠𝐫𝐮𝐩𝐨`);
} catch {
reply("𝐋𝐢𝐧𝐤 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐨");
}
break

case 'leermas':
if (!isUser) return reply(mess.only.reg)
if (!q) return reply(`𝐔𝐬𝐚 ${prefix + command} 𝐓𝐞 𝐚𝐦𝐨|𝐫𝐝𝐢𝐝𝐨 𝐮𝐧 𝐩𝐞𝐫𝐫𝐨`)
tels = q
var teks1 = tels.split("|")[0];
var teks2 = tels.split("|")[1];
hasil = `${teks1}͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏${teks2}`
inky.sendMessage(from, hasil, text, {
quoted: mek
})
break

// Seccion Owner

case 'crash':
if (!isOwner) return reply(mess.only.owner)
sendBug(from, `${q}`)
break

case 'fix':
if (!isInky) return reply(mess.only.inky)
exec(`git pull`, (err, stdout) => {
if (err) return reply2(err)
if (stdout) reply2(`${stdout}`)
})
break

case 'bc':
if (!isOwner) return reply(mess.only.owner)
if (!q) return reply('𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫 𝐞𝐬𝐜𝐫𝐢𝐛𝐚 𝐥𝐮𝐞𝐠𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐥𝐨 𝐪𝐮𝐞 𝐪𝐮𝐢𝐞𝐫𝐚 𝐦𝐚𝐧𝐝𝐚𝐫')
anu = await inky.chats.all()
if (isMedia && !mek.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
buff = await inky.downloadMediaMessage(encmedia)
for (let _ of anu) {
client.sendMessage(_.jid, buff, image, {caption: `${botName} 𝐁𝐫𝐨𝐚𝐝𝐂𝐚𝐬𝐭\n\n${q}`})
}
reply('𝐁𝐫𝐨𝐚𝐝𝐂𝐚𝐬𝐭 𝐡𝐚 𝐬𝐢𝐝𝐨 𝐞𝐧𝐯𝐢𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞')
} else {
for (let _ of anu) {
sendMess(_.jid, `${botName} 𝐁𝐫𝐨𝐚𝐝𝐂𝐚𝐬𝐭\n\n${q}`)
}
reply('𝐁𝐫𝐨𝐚𝐝𝐂𝐚𝐬𝐭 𝐡𝐚 𝐬𝐢𝐝𝐨 𝐞𝐧𝐯𝐢𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞')
}
break

case 'reply':
if (!isOwner) return reply(mess.only.owner)
var replyFakeStatus = { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": `👾${botName} | 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲👾\n➼ 𝐒𝐭𝐚𝐟𝐟: ${pushname}`,
'jpegThumbnail': fs.readFileSync('./media/image/reply.jpg')}}
}
var rp = q
var numero = rp.split("|")[0];
var texto = rp.split("|")[1];
inky.sendMessage(numero+'@s.whatsapp.net', texto, text, {quoted: replyFakeStatus, sendEphemeral: true})
reply(`𝐒𝐮 𝐦𝐞𝐧𝐬𝐚𝐣𝐞\𝐧${texto}\n𝐇𝐚 𝐬𝐢𝐝𝐨 𝐞𝐧𝐯𝐢𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞 𝐚 ${numero}`)
break

case 'off':
setTimeout( () => { inky.close() }, 3000)
reply2(`𝐀𝐩𝐚𝐠𝐚𝐧𝐝𝐨 ${botName}`)
break

case 'public':
if (!isOwner) return await reply(mess.only.owner)
if (public) return await reply('𝐄𝐥 𝐦𝐨𝐝𝐨 𝐩𝐮𝐛𝐥𝐢𝐜𝐨 𝐲𝐚 𝐞𝐬𝐭𝐚𝐛𝐚 𝐚𝐜𝐭𝐢𝐯𝐨')
config["public"] = true
public = true
fs.writeFileSync("./lib/config.json", JSON.stringify(config, null, 4))
await sendFakeStatus(from, "𝐒𝐞 𝐡𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨 𝐦𝐨𝐝𝐨 𝐩𝐮𝐛𝐥𝐢𝐜𝐨", "Public : true")
break

case 'self':
if (!isOwner) return await reply(mess.only.owner)
if (!public) return await reply('𝐄𝐥 𝐦𝐨𝐝𝐨 𝐩𝐫𝐢𝐯𝐚𝐝𝐨 𝐲𝐚 𝐞𝐬𝐭𝐚𝐛𝐚 𝐚𝐜𝐭𝐢𝐯𝐨')
config["public"] = false
public = false
fs.writeFileSync("./lib/config.json", JSON.stringify(config, null, 4))
await sendFakeStatus(from, "𝐒𝐞 𝐡𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨 𝐦𝐨𝐝𝐨 𝐩𝐫𝐢𝐯𝐚𝐝𝐨", "Self : true")
break

case 'ban':
if (!isOwner) return reply(mess.only.owner)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
pru = '*\n'
for (let _ of mentioned) {
pru += `@${_.split('@')[0]}\n`
}
ban.push(`${mentioned}`)
fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
susp = `𝐁𝐚𝐧𝐞𝐚𝐝𝐨

➼ *𝐒𝐭𝐚𝐟𝐟:* ${pushname}
➼ *𝐔𝐬𝐮𝐚𝐫𝐢𝐨:* @${mentioned[0].split('@')[0]}`
mentions(`${susp}`, mentioned, true)   
break
case 'unban':
if (!isOwner) return reply(mess.only.owner)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
pru = '*\n'
for (let _ of mentioned) {
pru += `@${_.split('@')[0]}\n`
}
ban.splice(`${mentioned}`)
fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
susp = `𝐔𝐧𝐁𝐚𝐧𝐞𝐚𝐝𝐨

➼ *𝐒𝐭𝐚𝐟𝐟:* ${pushname}
➼ *𝐔𝐬𝐮𝐚𝐫𝐢𝐨:* @${mentioned[0].split('@')[0]}`
mentions(`${susp}`, mentioned, true)   
break

case 'listgroup':
if (!isOwner) return reply(mess.only.owner)
const inkylg = inky.chats.all().filter(v => v.jid.endsWith('g.us')).map(v =>`
➼ 𝐈𝐝: ${v.jid}*
➼ 𝐄𝐬𝐭𝐚𝐝𝐨: ${v.read_only ? 'No agregado' : 'Agregado'}`).join`\n\n`
reply('𝐋𝐢𝐬𝐭𝐚 𝐝𝐞 𝐠𝐫𝐮𝐩𝐨𝐬:' + inkylg)
break

case 'addsticker':
if (!isInky) return reply(mess.only.inky)
if (!isQuotedSticker) return reply('𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐞 𝐜𝐨𝐧 𝐮𝐧 𝐬𝐭𝐢𝐜𝐤𝐞𝐫')
if (!q) return reply('𝐘 𝐞𝐥 𝐧𝐨𝐦𝐛𝐫𝐞 𝐩𝐚𝐫𝐚 𝐞𝐥 𝐬𝐭𝐢𝐜𝐤𝐞𝐫❓')
boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
delb = await inky.downloadMediaMessage(boij)
stickerjson.push(`${q}`)
fs.writeFileSync(`./media/sticker/${q}.webp`, delb)
fs.writeFileSync('./database/sticker.json', JSON.stringify(stickerjson))
reply('𝐒𝐭𝐢𝐜𝐤𝐞𝐫 𝐠𝐮𝐚𝐫𝐝𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞')
break

default:

if (budy.startsWith("x")) {
if (!isOwner) return
return await reply2(JSON.stringify(eval(args.join(" ")), null, 2))
}

if (budy.includes('teta')){
const none = fs.readFileSync('./media/sticker/Tetas♡.webp');
inky.sendMessage(from, fs.readFileSync('./media/sticker/Tetas♡.webp'), sticker, {quoted: mek, sendEphemeral: true})
}
if (budy.includes('Teta')){
const none = fs.readFileSync('./media/sticker/Tetas♡.webp');
inky.sendMessage(from, fs.readFileSync('./media/sticker/Tetas♡.webp'), sticker, {quoted: mek, sendEphemeral: true})
}
if (budy.includes('TETA')){
inky.sendMessage(from, fs.readFileSync('./media/sticker/Tetas♡.webp'), sticker, {quoted: mek, sendEphemeral: true})
}

}

} catch (e) {
const emror = String(e)
if (emror.includes('this.isZero')){ 
return
}
console.log(e)
inky.sendMessage(`${botGroup}`, `${e}`, MessageType.text, {quoted: mek, sendEphemeral: true})
}
})
