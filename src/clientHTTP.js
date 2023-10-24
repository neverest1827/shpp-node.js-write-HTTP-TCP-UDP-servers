const axios = require('axios');
const moment = require('moment');

const textToSend = 'Hello, server!';
const startTime = moment();

axios.post('http://localhost:3000/send', textToSend, {
    headers: {
        'Content-Type': 'text/plain'
    }
})
    .then(response => {
        const endTime = moment();
        const elapsedTime = endTime.diff(startTime, 'milliseconds');

        console.log('Received response from server:', response.data);
        console.log('Time taken:', elapsedTime, 'ms');
    })
    .catch(error => {
        console.error('Error:', error);
    });