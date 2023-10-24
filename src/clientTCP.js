const net = require('net');

const client = new net.Socket();

const serverAddress = 'localhost'; // IP-адреса або ім'я хоста сервера
const serverPort = 4000; // TCP порт сервера

client.connect(serverPort, serverAddress, () => {
    console.log('Connected to server');
    const message = 'Hello, server!';
    client.write(message);
});

client.on('data', (data) => {
    console.log('Received from server: ' + data);
    client.destroy(); // закрити з'єднання після отримання даних від сервера
});

client.on('close', () => {
    console.log('Connection closed');
});