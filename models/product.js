const fs = require('fs').promises;
const path = require('path');

const fullName = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
);

const getProductsFromFile = async () => {
    try {
        const contents = await fs.readFile(fullName, 'utf-8');
        if (contents.length === 0) {
            return [];
        }
        return JSON.parse(contents);
    } catch (err) {
        return [];
    }
};

module.exports = class Product {
    constructor(title, image, price = 0, desc = '') {
        this.title = title;
        this.image = image;
        this.price = Number(price) || 0;
        this.desc = desc || '';
    }
    async save() {
        try {
            const products = await getProductsFromFile();
            products.push(this);
            await fs.writeFile(fullName, JSON.stringify(products));
        } catch (err) {
            console.log(err);
        }
    }
    static async fetchAll() {
        const products = await getProductsFromFile();
        return products;
    }
};
