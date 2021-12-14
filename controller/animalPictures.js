const AnimalsCollection = require('../models/animals')
var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/
exports.animalPicture = (req,res,next) =>{
    function isValidUSZip(sZip) {
        return /^\d{5}(-\d{4})?$/.test(sZip);
     }
     if(isValidUSZip(req.body.zipcode)){
        return req.body.zipcode
     }
}