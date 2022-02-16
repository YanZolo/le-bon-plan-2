const productModel = require('./Models/productModel');


module.exports = {

    registerProduct : async (req, res, next) => {
        
        const product = new productModel(req.body)
        const newproduct = await product.save()

    }





}