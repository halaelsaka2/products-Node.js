const {validationResult} = require('express-validator');
require('express-async-errors');
const CustomError = require('../helpers/cutomError')
module.exports = (...validationChecks)=> async (req, re, next) => {
    console.log(req+"bbbb")
    await Promise.all(
        validationChecks.map(
            check => check.run(req)
        )
    );
    const {errors} = validationResult(req);
    if (!errors.length) {
        return next();
    }
    throw CustomError('ValidationError', 422, errors)

}