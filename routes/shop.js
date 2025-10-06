const express = require('express');
const router = express.Router();


router.get('/info', (req, res, next) => {
    res.send('<h1>We are now at the \"Information\" page.</h1>');
});

router.get('/', (req, res, next) => {
    res.send('<h1>Back-end programming, lab 1, Hello from NODE & Express.js!</h1>');
})


module.exports = router;
