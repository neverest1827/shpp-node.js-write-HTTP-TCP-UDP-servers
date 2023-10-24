const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const message = Buffer.from('Hello, server!');

client.send(message, 0, message.length, 5000, 'localhost', (err) => {
    if (err) {
        console.error('Error sending message:', err);
    } else {
        console.log('Message sent successfully.');
    }
});

client.on('message', (msg, rinfo) => {
    console.log(`Received response from ${rinfo.address}:${rinfo.port}: ${msg}`);
});

client.on('error', (err) => {
    console.error('Error:', err);
});