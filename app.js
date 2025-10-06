const http = require('http');
const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));

app.use('/info', (req, res, next) => {
    res.send('<h1>We are now at the \"Information\" page.</h1>');
});

app.use('/add-product', (req, res, next) => {
    res.send('<h1>Insert product name</h1>' + 
        '<form action="/product" method="POST"' + 
        '<input type="text" name="title" />' + 
        '<button type="submit">Send product name</button>' + 
        '</form>');
});

app.post('/product', (req, res, next)=>{
    console.log('Received data:', req.body);
    res.redirect('/');
})

app.use('/', (req, res, next) => {
    res.send('<h1>Back-end programming, lab 1, Hello from NODE & Express.js!</h1>');
});

// const server = http.createServer(app);
// server.listen(33333);
app.listen(33333);
