const express = require('express');
const router = express.Router();
const Category = require('../model/cat');
const validationMiddleWare = require('../middlewares/validation')
const authorizationMiddleWare = require('../middleWares/authorization')
const authenticationmiddleWare = require('../middlewares/authentecation');
require('express-async-errors');

module.exports = router;

router.get("/",async(req,res,next)=>{
    const categories = await Category.find()
    res.status(200).json(categories);
})

router.post('/addCategory',async (req, res, next) => {

    const {
        name
    } = req.body;
    const category = new Category({
        name
        
    });
    await category.save();
    res.json(category)

})