const express = require('express');
const { check, body } = require('express-validator');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/products', 
    adminController.checkIsLogged, adminController.getProducts);

router.get('/add-product', 
    adminController.checkIsLogged, adminController.getAddProduct);

router.post('/add-product',
    [body('title')
        .isString()
        .isLength({ min: 3 })
        .trim()
        .withMessage('Title lenght min. 3 character.'),
    body('price').isFloat()
        .withMessage('Price value incorrect.'),
    body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
        .withMessage('Decription between 5 and 400 characters.')
    ],
    adminController.checkIsLogged, adminController.postAddProduct);

router.get('/edit-product/:productId', 
    adminController.checkIsLogged, adminController.getEditProduct);

router.post('/edit-product', 
    [body('title')
        .isString()
        .isLength({ min: 3 })
        .trim()
        .withMessage('Title lenght min. 3 character.'),
    body('price').isFloat()
        .withMessage('Price value incorrect.'),
    body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
        .withMessage('Decription between 5 and 400 characters.')
    ],
    adminController.checkIsLogged, adminController.postEditProduct);

router.delete('/product/:productId', 
    adminController.checkIsLogged, adminController.deleteProduct);

module.exports = router;
