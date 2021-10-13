const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

function addMetadata(packname, author) {	
if (!packname) packname = ''; if (!author) author = '';	
author = author.replace(/[^a-zA-Z0-9]/g, '');	
let name = `${author}_${packname}`
if (fs.existsSync(`./${name}.exif`)) return `./${name}.exif`
const json = {
"sticker-pack-name": packname,
"sticker-pack-publisher": author,
}
const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]
let len = JSON.stringify(json).length
let last
if (len > 256) {
len = len - 256
bytes.unshift(0x01)
} else {
bytes.unshift(0x00)
}
if (len < 16) {
last = len.toString(16)
last = "0" + len
} else {
last = len.toString(16)
}
const buf2 = Buffer.from(last, "hex")
const buf3 = Buffer.from(bytes)
const buf4 = Buffer.from(JSON.stringify(json))
const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])
fs.writeFile(`./${name}.exif`, buffer, (err) => {
return `./${name}.exif`
})
}

function convertSticker(base64, author, pack){
return new Promise((resolve, reject) =>{
axios('https://sticker-api-tpe3wet7da-uc.a.run.app/prepareWebp', {
method: 'POST',
headers: {
Accept: 'application/json, text/plain, */*',
'Content-Type': 'application/json;charset=utf-8',
'User-Agent': 'axios/0.21.1',
'Content-Length': 151330
},
data: `{"image": "${base64}","stickerMetadata":{"author":"${author}","pack":"${pack}","keepScale":true,"removebg":"HQ"},"sessionInfo":{"WA_VERSION":"2.2106.5","PAGE_UA":"WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36","WA_AUTOMATE_VERSION":"3.6.10 UPDATE AVAILABLE: 3.6.11","BROWSER_VERSION":"HeadlessChrome/88.0.4324.190","OS":"Windows Server 2016","START_TS":1614310326309,"NUM":"6247","LAUNCH_TIME_MS":7934,"PHONE_VERSION":"2.20.205.16"},"config":{"sessionId":"session","headless":true,"qrTimeout":20,"authTimeout":0,"cacheEnabled":false,"useChrome":true,"killProcessOnBrowserClose":true,"throwErrorOnTosBlock":false,"chromiumArgs":["--no-sandbox","--disable-setuid-sandbox","--aggressive-cache-discard","--disable-cache","--disable-application-cache","--disable-offline-load-stale-cache","--disk-cache-size=0"],"executablePath":"C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe","skipBrokenMethodsCheck":true,"stickerServerEndpoint":true}}`
}).then(({data}) =>{
resolve(data.webpBase64)
}).catch(reject)
}) 
}

const getBuffer = async (url, options) => {
try {
options ? options : {}
var res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (e) {
console.log(e)
}
}

const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
i.isAdmin ? admins.push(i.jid) : ''
}
return admins
}

const getJson = async(url) => {
try {
var res = await fetch(url, {
headers: {
'User-Agent': 'okhttp/4.5.0'
},
method: 'GET'
})
return res.json()
} catch (e) {
throw e
}
}

const getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`
}

const y2mate = async (yutub) => {
function post(url, formdata) {
return fetch(url, {
method: 'POST',
headers: {
accept: "*/*",
'accept-language': "en-US,en;q=0.9",
'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
},
body: new URLSearchParams(Object.entries(formdata))
})
}
var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
let ytId = ytIdRegex.exec(yutub)
url = 'https://youtu.be/' + ytId[1]
let res = await post(`https://www.y2mate.com/mates/en68/analyze/ajax`, {
url,
q_auto: 0,
ajax: 1
})
var mela = await res.json()
var $ = cheerio.load(mela.result)
var hasil = []
let thumb = $('div').find('.thumbnail.cover > a > img').attr('src')
let judul = $('div').find('.thumbnail.cover > div > b').text()
let size = $('div').find('#mp3 > table > tbody > tr > td:nth-child(2)').text()
let tipe = $('div').find('#mp3 > table > tbody > tr > td:nth-child(3) > a').attr('data-ftype')
let output = `${judul}.` + tipe
let quality = $('div').find('#mp3 > table > tbody > tr > td:nth-child(3) > a').attr('data-fquality')
let id = /var k__id = "(.*?)"/.exec(mela.result)[1]
let res2 = await post(`https://www.y2mate.com/mates/en68/convert`, {
type: 'youtube',
_id: id,
v_id: ytId[1],
ajax: '1',
token: '',
ftype: tipe,
fquality: quality
})
var meme = await res2.json()
var supp = cheerio.load(meme.result)
let link = supp('div').find('a').attr('href')
hasil.push({ thumb, judul, quality, tipe, size, output, link})
return hasil
}

module.exports = { addMetadata, convertSticker, getBuffer, getGroupAdmins, getJson, getRandom, y2mate }
