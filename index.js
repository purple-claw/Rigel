const fs = require('fs');
const dgram = require('dgram');
const Buffer = require('buffer');
const url = require('url').parse;

let bencode;
try {
    bencode = require('bencode');
} catch (e) {
    console.error('bencode package not found or not properly exported:', e);
    process.exit(1);
}

const torrent = bencode.decode(fs.readFileSync('puppy.torrent'));
const urll = url.parse(torrent.announce.toString('utf8'));
const socket = dgram.createSocket('udp4');
const myMsg = Buffer.from('hello?', 'utf8');
socket.send(myMsg, 0, myMsg.length, urll.port, urll.host, () => {

});

socket.on('message', msg => {
    console.log('Message is', msg);
});

