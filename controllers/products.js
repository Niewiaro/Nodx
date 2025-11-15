const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
    });
};

exports.postAddProduct = async (req, res, next) => {
    const title = req.body.title;
    const image = req.file;
    const price = parseFloat(req.body.price);
    const description = req.body.description;

    if (!image) {
        return res.status(422).render("add-product", {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true,
            errorMessage: "Attached file is not an image.",
        });
    }
    if (!title || isNaN(price)) {
        return res.status(422).render("add-product", {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true,
            errorMessage: "Please provide a title and a valid price.",
        });
    }
    const imageUrl = image.path;
    const product = new Product(title, imageUrl, price, description);
    await product.save();
    res.redirect("/");
};

exports.getProducts = async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
};
