const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const authorizationMiddleWare = require('../middleWares/authorization')
const authenticationmiddleWare = require('../middlewares/authentecation');
require('express-async-errors');
const _ = require('lodash')


router.get("/", async (req, res, next) => {
    let {search,categoryId,sortBy,page=1,limit=8}=req.query
    let products;
    let count;
    
    let category = categoryId ? {categoryId}:{}
    let searchValue = search ? { name: {$regex: new RegExp(".*"+ search.toLowerCase() +".*")}}:{}
    products = await Product.find({...searchValue,...category});
    

    //******** Sorting *********/
    const strSort = sortBy? sortBy.split(":") : "";
    if(sortBy){
        if(strSort[0]==='name') products= _.orderBy(products,`${strSort[0]}`,'asc')
        else products = _.orderBy(products,`${strSort[0]}`,`${strSort[1]}`)
    }
    
    /******** Pagination *******/ 
    count= products.length;
    let start=(page-1)*limit;
    if (count>limit){
        products=products.slice(start,start+limit);
    }
    res.status(200).json({
        products,
        numOfPages: Math.ceil(count/limit),
        currentPage:page
    });
});

router.post('/addProduct', authenticationmiddleWare,async (req, res, next) => {
    const {name,price,discount,description,categoryId,tags,image,paymentType} = req.body;
    const userId = req.user.id;
    const product = new Product({userId,name,price,discount,userId,description,categoryId,tags,image,paymentType});
    await product.save();
    res.json(product)
})

router.patch('/:id',authenticationmiddleWare,authorizationMiddleWare,
    async (req, res, next) => {
        const {id} = req.params;
        const { name,
            price, discount,userId,description,categoryId,tags,image,paymentType} = req.body;
        const product = await Product.findByIdAndUpdate(id, {name,price,discount,userId,description,categoryId,tags,image,paymentType},
        {
            new: true,
            runValidators: true,
            omitUndefined: true
        });
        res.status(200).json({
            message: "product Edit Succssfully",
            product
        })
})

router.delete('/:id',authenticationmiddleWare,authorizationMiddleWare, async (req, res, next) => {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json(product)
})

router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    const product = await Product.findById(id).populate("categoryId");
    res.status(200).json(product)
})

module.exports = router;