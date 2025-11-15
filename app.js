const path = require('path');
const express = require('express');
const multer = require('multer');
const file_utils = require('./utils/file_utils');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ storage: file_utils.fileStorage, fileFilter: file_utils.fileFilter }).single('image'));

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use("/images", express.static(path.join(__dirname, 'images')));
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);


app.listen(33333);
