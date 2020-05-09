const CustomError = require('../helpers/cutomError')
const Product = require('../model/product')
require('express-async-errors');

module.exports = async (req, res, next) => {
    const id = req.params.id;
    const {user: {id: userId}} = req;
    const product = await Product.findById(id)
    if (!product.userId.equals(userId)) throw CustomError('Not Authrized', 403, 'you are not Authrized to do this')
    next();
}