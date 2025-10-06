const http = require('http');
const express = require('express');

const app = express();

app.use('/info', (req, res, next) => {
    res.send('<h1>We are now at the \"Information\" page.</h1>');
});

app.use('/', (req, res, next) => {
    res.send('<h1>Back-end programming, lab 1, Hello from NODE & Express.js!</h1>');
});

// const server = http.createServer(app);
// server.listen(33333);
app.listen(33333);
