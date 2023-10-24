const express = require('express');
const bodyParser = require('body-parser');
const net = require('net');
const dgram = require('dgram');
const moment = require('moment');

const app = express();
app.use(bodyParser.text());

// HTTP (Express) server
app.post('/send', (req, res) => {
    const receivedText = req.body;
    const clientIP = req.ip;
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

    console.log(`Received HTTP text from client at ${clientIP} (${timestamp}): ${receivedText}`);
    res.send(receivedText);
});

const httpServer = app.listen(3000, () => {
    console.log('HTTP Server is running on port 3000');
});

httpServer.on('connection', (socket) => {
    console.log('HTTP client connected:', socket.remoteAddress);

    socket.on('close', () => {
        console.log('HTTP client disconnected:', socket.remoteAddress);
    });
});

// TCP server
const tcpServer = net.createServer((socket) => {
    console.log('TCP Client connected:', socket.remoteAddress);

    socket.on('data', (data) => {
        console.log('Received TCP data from client:', data.toString());
        // Відправте відповідь клієнту
        socket.write('Hello, client! I received your message.');
    });

    socket.on('end', () => {
        console.log('TCP Client disconnected:', socket.remoteAddress);
    });
});

tcpServer.listen(4000, () => {
    console.log('TCP Server is running on port 4000');
});

// UDP server
const udpServer = dgram.createSocket('udp4');

udpServer.on('message', (msg, rinfo) => {
    console.log(`Received UDP message from ${rinfo.address}:${rinfo.port}: ${msg}`);
    udpServer.send(msg, 0, msg.length, rinfo.port, rinfo.address, (err) => {
        if (err) {
            console.error('Error sending UDP response:', err);
        } else {
            console.log('UDP Response sent successfully.');
        }
    });
});

udpServer.on('listening', () => {
    const address = udpServer.address();
    console.log(`UDP Server listening on ${address.address}:${address.port}`);
});

udpServer.bind(5000); // UDP server listens on port 5000