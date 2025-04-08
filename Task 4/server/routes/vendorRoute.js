const express =require('express');
const router=express.Router();
const {getProductsByVendor,registerVendor,getAllVendors} = require('../controllers/vendorController');
// const {}=require('../controllers/productController');

router.get('/:vendorId/products',getProductsByVendor);
router.post('/register', registerVendor);
router.get('/', getAllVendors); 

module.exports = router;